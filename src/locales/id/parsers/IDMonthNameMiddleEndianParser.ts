import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { MONTH_DICTIONARY, YEAR_PATTERN, parseYear } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// prettier-ignore
const PATTERN = new RegExp(
    `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        "(?:-|/|\\s*,?\\s*)" +
        "([0-9]{1,2})" +
        "(?:" +
            "\\s*(?:-|–|s\\.d\\.?|s/d|sampai(?:\\s+dengan)?|hingga)\\s*" +
            "([0-9]{1,2})" +
        ")?" +
        "(?:" +
            "(?:-|/|\\s*,\\s*|\\s+)" +
            `(?:tahun\\s+)?(${YEAR_PATTERN})` +
        ")?" +
        "(?=\\W|$)(?![.:]\\d)",
    "i"
);

const MONTH_NAME_GROUP = 1;
const DATE_GROUP = 2;
const DATE_TO_GROUP = 3;
const YEAR_GROUP = 4;

/**
 * The parser for parsing dates that begin with the month name (month before day)
 * - September 23
 * - September 23, 2026
 * - Januari 5 - 7, 2024
 * Note: Watch out for:
 * - Januari 12:00
 * - Januari 12.30
 */
export default class IDMonthNameMiddleEndianParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseInt(match[DATE_GROUP]);
        if (day > 31) {
            return null;
        }

        const components = context.createParsingComponents({ day: day, month: month });
        if (match[YEAR_GROUP]) {
            components.assign("year", parseYear(match[YEAR_GROUP]));
        } else {
            components.imply("year", findYearClosestToRef(context.refDate, day, month));
        }

        if (!match[DATE_TO_GROUP]) {
            return components;
        }

        const endDate = parseInt(match[DATE_TO_GROUP]);
        if (endDate > 31) {
            return null;
        }

        const result = context.createParsingResult(match.index, match[0]);
        result.start = components;
        result.end = components.clone();
        result.end.assign("day", endDate);

        return result;
    }
}
