import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { MONTH_DICTIONARY } from "../constants";
import { ORDINAL_NUMBER_PATTERN, parseOrdinalNumberPattern } from "../constants";
import { YEAR_PATTERN, parseYear } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// prettier-ignore
const PATTERN = new RegExp(
    `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        "(?:-|/|\\s*,?\\s*)" +
        `(${ORDINAL_NUMBER_PATTERN})(?!\\s*(?:am|pm))\\s*` +
        "(?:" +
            "(?:al|\\-)\\s*" +
            `(${ORDINAL_NUMBER_PATTERN})\\s*` +
        ")?" +
        "(?:" +
            `(?:-|/|\\s*,\\s*|\\s+)` +
            `(${YEAR_PATTERN})` +
        ")?" +
        "(?=\\W|$)(?!\\:\\d)",
    "i"
);

const MONTH_NAME_GROUP = 1;
const DATE_GROUP = 2;
const DATE_TO_GROUP = 3;
const YEAR_GROUP = 4;

/**
 * The parser for parsing date format that begin with month's name.
 *  - Gennaio 13
 *  - Gennaio 13, 2012
 *  - Gennaio 13 - 15, 2012
 * Note: Watch out for:
 *  - Gennaio 12:00
 *  - Gennaio 12.44
 *  - Gennaio 1222344
 *  - Gennaio 21 (when shouldSkipYearLikeDate=true)
 */
export default class ITMonthNameMiddleEndianParser extends AbstractParserWithWordBoundaryChecking {
    shouldSkipYearLikeDate: boolean;

    constructor(shouldSkipYearLikeDate: boolean) {
        super();
        this.shouldSkipYearLikeDate = shouldSkipYearLikeDate;
    }

    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31) {
            return null;
        }

        // Skip the case where the day looks like a year (ex: Gennaio 21)
        if (this.shouldSkipYearLikeDate) {
            if (!match[DATE_TO_GROUP] && !match[YEAR_GROUP] && match[DATE_GROUP].match(/^2[0-5]$/)) {
                return null;
            }
        }
        const components = context
            .createParsingComponents({
                day: day,
                month: month,
            })
            .addTag("parser/ITMonthNameMiddleEndianParser");

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

        // Text can be 'range' value. Such as 'Gennaio 12 - 13, 2012'
        const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
        const result = context.createParsingResult(match.index, match[0]);
        result.start = components;
        result.end = components.clone();
        result.end.assign("day", endDate);

        return result;
    }
}
