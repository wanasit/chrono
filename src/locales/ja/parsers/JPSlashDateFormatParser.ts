import { Parser, ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { findMostLikelyADYear, findYearClosestToRef } from "../../../calculation/years";
import { toHankaku } from "../constants";

/**
 * Date format with slash "/" between numbers. YYYY/MM/DD or MM/DD
 * Big-endian slash format is used in Japan.
 * For examples:
 * - 7/31
 * - 2020/7/12
 */
const PATTERN = new RegExp(
    "([0-9０-９]{4}[\\/|\\／])?" + "([0-1０-１]{0,1}[0-9０-９]{1})(?:[\\/|\\／]([0-3０-３]{0,1}[0-9０-９]{1}))",
    "i"
);

const YEAR_GROUP = 1;
const MONTH_GROUP = 2;
const DAY_GROUP = 3;

export default class JPSlashDateFormatParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const result = context.createParsingComponents();
        const month = parseInt(toHankaku(match[MONTH_GROUP]));
        const day = parseInt(toHankaku(match[DAY_GROUP]));
        if (month < 1 || month > 12) {
            return null;
        }

        if (day < 1 || day > 31) {
            return null;
        }

        result.assign("day", day);
        result.assign("month", month);

        if (match[YEAR_GROUP]) {
            const rawYearNumber = parseInt(toHankaku(match[YEAR_GROUP]));
            const year = findMostLikelyADYear(rawYearNumber);
            result.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.reference.instant, day, month);
            result.imply("year", year);
        }

        return result;
    }
}
