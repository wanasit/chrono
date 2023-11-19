import { FULL_MONTH_NAME_DICTIONARY, MONTH_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { matchAnyPattern } from "../../../utils/pattern";
import { YEAR_PATTERN, parseYearPattern } from "../constants";
import { AbstractParserWithLeftBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

const MONTH_NAME_GROUP = 2;
const YEAR_GROUP = 3;

/**
 * The parser for parsing month name and year.
 * - Cічень, 2012
 * - Січень 2012
 * - Січень
 */
export default class UkMonthNameParser extends AbstractParserWithLeftBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return (
            `((?:в|у)\\s*)?` +
            `(${matchAnyPattern(MONTH_DICTIONARY)})` +
            `\\s*` +
            `(?:` +
            `[,-]?\\s*(${YEAR_PATTERN})?` +
            `)?` +
            `(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();

        // skip some unlikely words "січ", "лют", ..
        if (match[0].length <= 3 && !FULL_MONTH_NAME_DICTIONARY[monthName]) {
            return null;
        }

        const result = context.createParsingResult(match.index, match.index + match[0].length);
        result.start.imply("day", 1);

        const month = MONTH_DICTIONARY[monthName];
        result.start.assign("month", month);

        if (match[YEAR_GROUP]) {
            const year = parseYearPattern(match[YEAR_GROUP]);
            result.start.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.reference.instant, 1, month);
            result.start.imply("year", year);
        }

        return result;
    }
}
