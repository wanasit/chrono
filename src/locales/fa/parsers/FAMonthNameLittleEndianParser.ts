import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { findYearClosestToRef } from "../../../calculation/years";
import {
    MONTH_DICTIONARY,
    ORDINAL_NUMBER_PATTERN,
    parseOrdinalNumberPattern,
    YEAR_PATTERN,
    parseYear,
} from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

/**
 * Persian month name parser (little-endian format: day-month-year)
 * Handles expressions like: ۱۵ فروردین (15 Farvardin), ۲۰ مهر ۱۴۰۰ (20 Mehr 1400)
 */
const PATTERN = new RegExp(
    `(${ORDINAL_NUMBER_PATTERN})` +
        `(?:\\s{0,3}(?:تا|الی|[-–])\\s{0,3}(${ORDINAL_NUMBER_PATTERN}))?` +
        `(?:\\s{0,3}(?:ام)?\\s{0,3})` +
        `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        `(?:` +
        `(?:\\s{0,3}(?:سال)?\\s{0,3})` +
        `(${YEAR_PATTERN})` +
        ")?" +
        "(?=\\W|$)",
    "i"
);

const DATE_GROUP = 1;
const DATE_TO_GROUP = 2;
const MONTH_NAME_GROUP = 3;
const YEAR_GROUP = 4;

export default class FAMonthNameLittleEndianParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult | null {
        const result = context.createParsingResult(match.index, match[0]);

        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseOrdinalNumberPattern(match[DATE_GROUP]);

        if (day > 31) {
            // Invalid day
            match.index = match.index + match[DATE_GROUP].length;
            return null;
        }

        result.start.assign("month", month);
        result.start.assign("day", day);

        if (match[YEAR_GROUP]) {
            const yearNumber = parseYear(match[YEAR_GROUP]);
            result.start.assign("year", yearNumber);
        } else {
            const year = findYearClosestToRef(context.reference.getDateWithAdjustedTimezone(), day, month);
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
