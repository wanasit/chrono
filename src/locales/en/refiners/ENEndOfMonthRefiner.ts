import { ParsingContext, Refiner } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { findYearClosestToRef } from "../../../calculation/years";

const PREFIX_PATTERN = /\b(?:last\s+day|end)\s+of\s+(?:the\s+)?$/i;
const RELATIVE_YEAR_SUFFIX_PATTERN = /^\s+(this|last|past|next)\s+year(?=\W|$)/i;

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
            const suffix = context.text
                .substring(result.index + result.text.length)
                .match(RELATIVE_YEAR_SUFFIX_PATTERN);

            if (suffix) {
                const modifier = suffix[1].toLowerCase();
                const referenceYear = context.reference.getDateWithAdjustedTimezone().getFullYear();
                year = referenceYear + (modifier === "next" ? 1 : modifier === "last" || modifier === "past" ? -1 : 0);
                result.start.assign("year", year);
                result.text += suffix[0];
            }

            if (!result.start.isCertain("year")) {
                const lastDayInReferenceYear = new Date(year, month, 0).getDate();
                year = findYearClosestToRef(
                    context.reference.getDateWithAdjustedTimezone(),
                    lastDayInReferenceYear,
                    month
                );
                result.start.imply("year", year);
            }

            const lastDay = new Date(year, month, 0).getDate();
            result.start.assign("day", lastDay);
            result.index -= prefix[0].length;
            result.text = prefix[0] + result.text;
            result.addTag("refiner/ENEndOfMonthRefiner");
        });

        return results;
    }
}
