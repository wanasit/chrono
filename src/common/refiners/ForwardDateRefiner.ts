/*
    Enforce 'forwardDate' option to on the results. When there are missing component,
    e.g. "March 12-13 (without year)" or "Thursday", the refiner will try to adjust the result
    into the future instead of the past.
*/

import {ParsingContext, Refiner} from "../../chrono";
import {ParsingResult} from "../../results";
import dayjs = require("dayjs");

export default class ForwardDateRefiner implements Refiner {

    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {

        if (!context.option.forwardDate) {
            return results;
        }

        results.forEach(function(result) {
            let refMoment = dayjs(context.refDate);

            if (result.start.isOnlyDayMonthComponent() && refMoment.isAfter(result.start.dayjs())) {
                // Adjust year into the future
                for (let i=0; i < 3 && refMoment.isAfter(result.start.dayjs()); i++) {
                    result.start.imply('year', result.start.get('year') + 1);

                    if (result.end && !result.end.isCertain('year')) {
                        result.end.imply('year', result.end.get('year') + 1);
                    }
                }
            }

            if (result.start.isOnlyWeekdayComponent() && refMoment.isAfter(result.start.dayjs())) {
                // Adjust date to the coming week
                if (refMoment.day() > result.start.get('weekday')) {
                    refMoment = refMoment.day(result.start.get('weekday') + 7);
                } else {
                    refMoment = refMoment.day(<number>result.start.get('weekday'));
                }

                result.start.imply('day', refMoment.date());
                result.start.imply('month', refMoment.month() + 1);
                result.start.imply('year', refMoment.year());
            }
        });

        return results;
    }
}
