import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { findYearClosestToRef } from "../../../calculation/years";
import { MONTH_DICTIONARY } from "../constants";
import { YEAR_PATTERN, parseYear } from "../constants";
import { ORDINAL_NUMBER_PATTERN, parseOrdinalNumberPattern } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    "(?:il\\s{0,3}|dal\\s{0,3}|dall'\\s{0,3})?" +
        `(${ORDINAL_NUMBER_PATTERN})` +
        "(?:" +
            "\\s{0,3}?(?:al\\s{0,3}|\\-\\s{0,3}|/|\\w*ino\\s*al\\s{0,3}|\\w*ino\\s*all'\\s{0,3}|all'\\s{0,3})" +
            `(${ORDINAL_NUMBER_PATTERN})` +
        ")?" +
        "(?:\\s{0,3}\\-\\s{0,3}|/|\\s{0,3}(?:di)?\\s{0,3})" +
        "(" + matchAnyPattern(MONTH_DICTIONARY) + ")" +
        "(?:" +
            "(?:\\s{0,3}\\-\\s{0,3}|/|\\s{0,3}(?:del)?\\s{0,3}|,?\\s{0,3})" +
            `(${YEAR_PATTERN}(?![^\\s]\\d))` +
        ")?" +
        "(?=\\W|$)",
    "i"
);

const DATE_GROUP = 1;
const DATE_TO_GROUP = 2;
const MONTH_NAME_GROUP = 3;
const YEAR_GROUP = 4;

/**
 * The parser for parsing IT date format with month's name in full writing
 *  - 1° gennaio 2019
 *  - 01 gennaio 2019
 *  - 10 gennaio 2019
 *  - 13 gennaio
 *  - 10-25 marzo
 *  - 10-25 marzo 2019
 *  - 1° ago 2019
 *  - 1° settembre 200 a.C.
 *  - 1° settembre 2002 d.C.
 *  - 19 gennaio 87
 *  - 12 giugno 2013
 *  - 1° novembre 2013
 */

export default class ITMonthNameLittleEndianParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const result = context.createParsingResult(match.index, match[0]);

        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31) {
            match.index = match.index + match[DATE_GROUP].length;
            return null;
        }

        result.start.assign("month", month);
        result.start.assign("day", day);

        if (match[YEAR_GROUP]) {
            const yearNumber = parseYear(match[YEAR_GROUP]);
            result.start.assign("year", yearNumber);
        } else {
            const year = findYearClosestToRef(context.refDate, day, month);
            result.start.imply("year", year);
        }

        if (match[DATE_TO_GROUP]) {
            const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP]);

            result.end = result.start.clone();
            result.end.assign("day", endDate);
        }

        return result;
    }
}
