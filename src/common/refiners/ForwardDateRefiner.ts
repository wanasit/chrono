/*
    Enforce 'forwardDate' option to on the results. When there are missing component,
    e.g. "March 12-13 (without year)" or "Thursday", the refiner will try to adjust the result
    into the future instead of the past.
*/

import { ParsingContext, Refiner } from "../../chrono";
import { ParsingResult } from "../../results";
import dayjs from "dayjs";
import { implySimilarDate } from "../../utils/dayjs";

export default class ForwardDateRefiner implements Refiner {
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        if (!context.option.forwardDate) {
            return results;
        }

        results.forEach(function (result) {
            let refMoment = dayjs(context.refDate);

            if (result.start.isOnlyTime() && refMoment.isAfter(result.start.dayjs())) {
                refMoment = refMoment.add(1, "day");
                implySimilarDate(result.start, refMoment);
                if (result.end && result.end.isOnlyTime()) {
                    implySimilarDate(result.end, refMoment);
                    if (result.start.dayjs().isAfter(result.end.dayjs())) {
                        refMoment = refMoment.add(1, "day");
                        implySimilarDate(result.end, refMoment);
                    }
                }
            }

            if (result.start.isOnlyWeekdayComponent() && refMoment.isAfter(result.start.dayjs())) {
                if (refMoment.day() >= result.start.get("weekday")) {
                    refMoment = refMoment.day(result.start.get("weekday") + 7);
                } else {
                    refMoment = refMoment.day(<number>result.start.get("weekday"));
                }

                result.start.imply("day", refMoment.date());
                result.start.imply("month", refMoment.month() + 1);
                result.start.imply("year", refMoment.year());
                context.debug(() => {
                    console.log(`Forward weekly adjusted for ${result} (${result.start})`);
                });

                if (result.end && result.end.isOnlyWeekdayComponent()) {
                    // Adjust date to the coming week
                    if (refMoment.day() > result.end.get("weekday")) {
                        refMoment = refMoment.day(result.end.get("weekday") + 7);
                    } else {
                        refMoment = refMoment.day(<number>result.end.get("weekday"));
                    }

                    result.end.imply("day", refMoment.date());
                    result.end.imply("month", refMoment.month() + 1);
                    result.end.imply("year", refMoment.year());
                    context.debug(() => {
                        console.log(`Forward weekly adjusted for ${result} (${result.end})`);
                    });
                }
            }

            // In case where we know the month, but not which year (e.g. "in December", "25th December"),
            // try move to another year
            if (result.start.isDateWithUnknownYear() && refMoment.isAfter(result.start.dayjs())) {
                for (let i = 0; i < 3 && refMoment.isAfter(result.start.dayjs()); i++) {
                    result.start.imply("year", result.start.get("year") + 1);
                    context.debug(() => {
                        console.log(`Forward yearly adjusted for ${result} (${result.start})`);
                    });

                    if (result.end && !result.end.isCertain("year")) {
                        result.end.imply("year", result.end.get("year") + 1);
                        context.debug(() => {
                            console.log(`Forward yearly adjusted for ${result} (${result.end})`);
                        });
                    }
                }
            }
        });

        return results;
    }
}
