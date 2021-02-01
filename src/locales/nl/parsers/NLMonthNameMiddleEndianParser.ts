import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { MONTH_DICTIONARY } from "../constants";
import { ORDINAL_NUMBER_PATTERN, parseOrdinalNumberPattern } from "../constants";
import { YEAR_PATTERN, parseYear } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    "(?:on\\s*?)?" +
        `(${ORDINAL_NUMBER_PATTERN})` +
        "(?:\\s*" +
        "(?:tot|\\-|\\–|until|through|till|\\s)\\s*" +
        `(${ORDINAL_NUMBER_PATTERN})` +
        ")?" +
        "(?:-|/|\\s*(?:of)?\\s*)" +
        "(" +
        matchAnyPattern(MONTH_DICTIONARY) +
        ")" +
        "(?:" +
        "(?:-|/|,?\\s*)" +
        `(${YEAR_PATTERN}(?![^\\s]\\d))` +
        ")?" +
        "(?=\\W|$)",
    "i"
);

const MONTH_NAME_GROUP = 3;
const DATE_GROUP = 1;
const DATE_TO_GROUP = 2;
const YEAR_GROUP = 4;

/**
 * The parser for parsing BE/NL date format with month's name in full writing
 *  - 1 januari 2019
 *  - 01 januari 2019
 *  - 10 januari 2019
 *  - 13 januari
 *  - 10 - 25 maart
 *  - 10 - 25 maart 2019
 *  - 1 aug 2019
 *  - 1 september 200 voor Christus
 *  - 1 september 2002 na Christus
 *  - 19 januari 87
 *  - 12de juli 2013
 *  - 1ste november 2013
 */
export default class NLMonthNameMiddleEndianParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31) {
            // e.g. "[96 Aug]" => "9[6 Aug]", we need to shift away from the next number
            match.index = match.index + match[DATE_GROUP].length;
            return null;
        }

        const components = context.createParsingComponents({
            day: day,
            month: month,
        });

        if (match[YEAR_GROUP]) {
            const year = parseYear(match[YEAR_GROUP]);
            components.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.refDate, day, month);
            components.imply("year", year);
        }

        if (!match[DATE_TO_GROUP]) {
            return components;
        }

        // Text can be 'range' value. Such as 'January 12 - 13, 2012'
        const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
        const result = context.createParsingResult(match.index, match[0]);
        result.start = components;
        result.end = components.clone();
        result.end.assign("day", endDate);

        return result;
    }
}
