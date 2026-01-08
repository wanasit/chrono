import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { MONTH_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";

/**
 * Persian date range parser
 * Handles:
 * - Slash date ranges: 1399/07/01 تا 1399/07/15
 * - Month name ranges: از فروردین تا خرداد
 * - Mixed date ranges
 */
const SLASH_DATE_RANGE_PATTERN = new RegExp(
    `(\\d{4})/(\\d{1,2})/(\\d{1,2})` + `\\s*(?:تا|الی|[-–])\\s*` + `(\\d{4})/(\\d{1,2})/(\\d{1,2})`,
    "i"
);

const MONTH_RANGE_PATTERN = new RegExp(
    `(?:از\\s+)?(${matchAnyPattern(MONTH_DICTIONARY)})` +
        `\\s+(?:تا|الی)\\s+` +
        `(${matchAnyPattern(MONTH_DICTIONARY)})`,
    "i"
);

export default class FADateRangeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return new RegExp(`(?:${SLASH_DATE_RANGE_PATTERN.source})|(?:${MONTH_RANGE_PATTERN.source})`, "i");
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult | null {
        const text = match[0];

        // Try slash date range first
        const slashMatch = text.match(SLASH_DATE_RANGE_PATTERN);
        if (slashMatch) {
            return this.parseSlashDateRange(context, match.index, text, slashMatch);
        }

        // Try a month range
        const monthMatch = text.match(MONTH_RANGE_PATTERN);
        if (monthMatch) {
            return this.parseMonthRange(context, match.index, text, monthMatch);
        }

        return null;
    }

    private parseSlashDateRange(
        context: ParsingContext,
        index: number,
        text: string,
        match: RegExpMatchArray
    ): ParsingResult {
        const result = context.createParsingResult(index, text);

        // Start date
        const startYear = parseInt(match[1]);
        const startMonth = parseInt(match[2]);
        const startDay = parseInt(match[3]);

        result.start.assign("year", startYear);
        result.start.assign("month", startMonth);
        result.start.assign("day", startDay);

        // End date
        const endYear = parseInt(match[4]);
        const endMonth = parseInt(match[5]);
        const endDay = parseInt(match[6]);

        result.end = result.start.clone();
        result.end.assign("year", endYear);
        result.end.assign("month", endMonth);
        result.end.assign("day", endDay);

        return result;
    }

    private parseMonthRange(
        context: ParsingContext,
        index: number,
        text: string,
        match: RegExpMatchArray
    ): ParsingResult {
        const result = context.createParsingResult(index, text);
        const targetDate = context.reference.getDateWithAdjustedTimezone();

        // Start month
        const startMonthName = match[1].toLowerCase();
        const startMonth = MONTH_DICTIONARY[startMonthName];

        result.start.assign("month", startMonth);
        result.start.imply("day", 1);
        result.start.imply("year", targetDate.getFullYear());

        // End month
        const endMonthName = match[2].toLowerCase();
        const endMonth = MONTH_DICTIONARY[endMonthName];

        result.end = result.start.clone();
        result.end.assign("month", endMonth);

        // Set end day to the last day of the month
        const lastDay = new Date(targetDate.getFullYear(), endMonth, 0).getDate();
        result.end.assign("day", lastDay);

        return result;
    }
}
