import { FULL_MONTH_NAME_DICTIONARY, MONTH_DICTIONARY, REGEX_PARTS } from "../constants";
import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { matchAnyPattern } from "../../../utils/pattern";
import { YEAR_PATTERN, parseYear } from "../constants";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    `((?:в)\\s*)?` +
        `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        `\\s*` +
        `(?:` +
        `[,-]?\\s*(${YEAR_PATTERN})?` +
        `)?` +
        `(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`,
    REGEX_PARTS.flags
);

const MONTH_NAME_GROUP = 2;
const YEAR_GROUP = 3;

/**
 * The parser for parsing month name and year.
 * - Январь, 2012
 * - Январь 2012
 * - Январь
 */
export default class RUMonthNameParser extends AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary(): string {
        return REGEX_PARTS.leftBoundary;
    }

    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();

        // skip some unlikely words "янв", "фер", ..
        if (match[0].length <= 3 && !FULL_MONTH_NAME_DICTIONARY[monthName]) {
            return null;
        }

        const result = context.createParsingResult(match.index, match.index + match[0].length);
        result.start.imply("day", 1);

        const month = MONTH_DICTIONARY[monthName];
        result.start.assign("month", month);

        if (match[YEAR_GROUP]) {
            const year = parseYear(match[YEAR_GROUP]);
            result.start.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.refDate, 1, month);
            result.start.imply("year", year);
        }

        return result;
    }
}
