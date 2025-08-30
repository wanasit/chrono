/*
    Enforce 'forwardDate' option to on the results. When there are missing component,
    e.g. "March 12-13 (without year)" or "Thursday", the refiner will try to adjust the result
    into the future instead of the past.
*/

import { ParsingContext, Refiner } from "../../chrono";
import { ParsingResult } from "../../results";
import * as dates from "../../utils/dates";
import { implySimilarDate } from "../../utils/dates";
import { addDuration } from "../../calculation/duration";

export default class ForwardDateRefiner implements Refiner {
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        if (!context.option.forwardDate) {
            return results;
        }

        results.forEach((result) => {
            let refDate = context.reference.getDateWithAdjustedTimezone();

            if (result.start.isOnlyTime() && context.reference.instant > result.start.date()) {
                const refDate = context.reference.getDateWithAdjustedTimezone();
                const refFollowingDay = new Date(refDate);
                refFollowingDay.setDate(refFollowingDay.getDate() + 1);

                dates.implySimilarDate(result.start, refFollowingDay);
                context.debug(() => {
                    console.log(
                        `${this.constructor.name} adjusted ${result} time from the ref date (${refDate}) to the following day (${refFollowingDay})`
                    );
                });
                if (result.end && result.end.isOnlyTime()) {
                    dates.implySimilarDate(result.end, refFollowingDay);
                    if (result.start.date() > result.end.date()) {
                        refFollowingDay.setDate(refFollowingDay.getDate() + 1);
                        dates.implySimilarDate(result.end, refFollowingDay);
                    }
                }
            }

            if (result.start.isOnlyWeekdayComponent() && refDate > result.start.date()) {
                let daysToAdd = result.start.get("weekday") - refDate.getDay();
                if (daysToAdd <= 0) {
                    daysToAdd += 7;
                }
                refDate = addDuration(refDate, { day: daysToAdd });
                implySimilarDate(result.start, refDate);
                context.debug(() => {
                    console.log(`${this.constructor.name} adjusted ${result} weekday (${result.start})`);
                });

                if (result.end && result.end.isOnlyWeekdayComponent()) {
                    // Adjust date to the coming week
                    let daysToAdd = result.end.get("weekday") - refDate.getDay();
                    if (daysToAdd <= 0) {
                        daysToAdd += 7;
                    }
                    refDate = addDuration(refDate, { day: daysToAdd });
                    implySimilarDate(result.end, refDate);
                    context.debug(() => {
                        console.log(`${this.constructor.name} adjusted ${result} weekday (${result.end})`);
                    });
                }
            }

            // In case where we know the month, but not which year (e.g. "in December", "25th December"),
            // try move to another year (up-to 3 times)
            if (result.start.isDateWithUnknownYear() && refDate > result.start.date()) {
                for (let i = 0; i < 3 && refDate > result.start.date(); i++) {
                    result.start.imply("year", result.start.get("year") + 1);
                    context.debug(() => {
                        console.log(`${this.constructor.name} adjusted ${result} year (${result.start})`);
                    });

                    if (result.end && !result.end.isCertain("year")) {
                        result.end.imply("year", result.end.get("year") + 1);
                        context.debug(() => {
                            console.log(`${this.constructor.name} adjusted ${result} month (${result.start})`);
                        });
                    }
                }
            }
        });

        return results;
    }
}
