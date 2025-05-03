import { Parser, ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { findMostLikelyADYear, findYearClosestToRef } from "../../../calculation/years";

/**
 * Date format with slash "/" between numbers. YYYY/MM/DD or MM/DD
 * Big-endian slash format is used in Japan.
 * For examples:
 * - 7/10
 * - 2020/7/12
 */
const PATTERN = new RegExp(
    "([^\\d]|^)" + "([0-9]{4}[\\/])?" + "([0-1]{0,1}[0-9]{1})(?:[\\/]([0-3]{0,1}[0-9]{1}))" + "(\\W|$)",
    "i"
);

const OPENING_GROUP = 1;
const ENDING_GROUP = 5;

const YEAR_GROUP = 2;
const MONTH_GROUP = 3;
const DAY_GROUP = 4;

export default class JPSlashDateFormatParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        // Because of how pattern is executed on remaining text in `chrono.ts`, the character before the match could
        // still be a number (e.g. X[X/YY/ZZ] or XX[/YY/ZZ] or [XX/YY/]ZZ). We want to check and skip them.
        const index = match.index + match[OPENING_GROUP].length;
        const indexEnd = match.index + match[0].length - match[ENDING_GROUP].length;
        if (index > 0) {
            const textBefore = context.text.substring(0, index);
            if (textBefore.match("\\d/?$")) {
                return;
            }
        }
        if (indexEnd < context.text.length) {
            const textAfter = context.text.substring(indexEnd);
            if (textAfter.match("^/?\\d")) {
                return;
            }
        }

        const text = context.text.substring(index, indexEnd);

        const result = context.createParsingResult(index, text);
        const month = parseInt(match[MONTH_GROUP]);
        const day = parseInt(match[DAY_GROUP]);
        if (month < 1 || month > 12) {
            return null;
        }

        if (day < 1 || day > 31) {
            return null;
        }

        result.start.assign("day", day);
        result.start.assign("month", month);

        if (match[YEAR_GROUP]) {
            const rawYearNumber = parseInt(match[YEAR_GROUP]);
            const year = findMostLikelyADYear(rawYearNumber);
            result.start.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.reference.instant, day, month);
            result.start.imply("year", year);
        }

        return result.addTag("parser/JPSlashDateFormatParser");
    }
}
