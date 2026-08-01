import { ParsingContext, Refiner } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { findYearClosestToRef } from "../../../calculation/years";

const PREFIX_PATTERN = /\b(?:last\s+day|end)\s+of\s+(?:the\s+)?$/i;

export default class ENEndOfMonthRefiner implements Refiner {
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        results.forEach((result) => {
            if (!result.start.isCertain("month") || result.start.isCertain("day")) {
                return;
            }

            const prefix = context.text.substring(0, result.index).match(PREFIX_PATTERN);
            if (!prefix) {
                return;
            }

            let year = result.start.get("year");
            const month = result.start.get("month");
            let lastDay = new Date(year, month, 0).getDate();

            if (!result.start.isCertain("year")) {
                year = findYearClosestToRef(context.reference.getDateWithAdjustedTimezone(), lastDay, month);
                result.start.imply("year", year);
                lastDay = new Date(year, month, 0).getDate();
            }

            result.start.assign("day", lastDay);
            result.index -= prefix[0].length;
            result.text = prefix[0] + result.text;
            result.addTag("refiner/ENEndOfMonthRefiner");
        });

        return results;
    }
}
