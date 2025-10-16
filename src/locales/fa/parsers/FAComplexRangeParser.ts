import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { MONTH_DICTIONARY, ORDINAL_NUMBER_PATTERN, parseOrdinalNumberPattern } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { Meridiem } from "../../../types";

/**
 * Persian complex date-time range parser
 * Handles expressions like: "10 مهر ساعت 9 صبح تا 15 مهر ساعت 5 عصر"
 */
const COMPLEX_RANGE_PATTERN = new RegExp(
    `(${ORDINAL_NUMBER_PATTERN})\\s+` +
        `(${matchAnyPattern(MONTH_DICTIONARY)})\\s+` +
        `ساعت\\s+(\\d{1,2})\\s+(صبح|ظهر|بعدازظهر|عصر|شب)\\s+` +
        `تا\\s+` +
        `(${ORDINAL_NUMBER_PATTERN})\\s+` +
        `(${matchAnyPattern(MONTH_DICTIONARY)})\\s+` +
        `ساعت\\s+(\\d{1,2})\\s+(صبح|ظهر|بعدازظهر|عصر|شب)`,
    "i"
);

export default class FAComplexRangeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return COMPLEX_RANGE_PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult | null {
        const result = context.createParsingResult(match.index, match[0]);
        const targetDate = context.reference.getDateWithAdjustedTimezone();

        // Parse start date and time
        const startDay = parseOrdinalNumberPattern(match[1]);
        const startMonthName = match[2].toLowerCase();
        const startMonth = MONTH_DICTIONARY[startMonthName];
        const startHour = parseInt(match[3]);
        const startMeridiem = match[4].toLowerCase();

        result.start.assign("day", startDay);
        result.start.assign("month", startMonth);
        result.start.imply("year", targetDate.getFullYear());

        // Set start hour based on the Persian time period
        const adjustedStartHour = this.adjustHour(startHour, startMeridiem);
        result.start.assign("hour", adjustedStartHour);
        result.start.assign("minute", 0);
        result.start.assign("meridiem", adjustedStartHour >= 12 ? Meridiem.PM : Meridiem.AM);

        // Parse end date and time
        const endDay = parseOrdinalNumberPattern(match[5]);
        const endMonthName = match[6].toLowerCase();
        const endMonth = MONTH_DICTIONARY[endMonthName];
        const endHour = parseInt(match[7]);
        const endMeridiem = match[8].toLowerCase();

        result.end = result.start.clone();
        result.end.assign("day", endDay);
        result.end.assign("month", endMonth);

        // Set end hour based on the Persian time period
        const adjustedEndHour = this.adjustHour(endHour, endMeridiem);
        result.end.assign("hour", adjustedEndHour);
        result.end.assign("minute", 0);
        result.end.assign("meridiem", adjustedEndHour >= 12 ? Meridiem.PM : Meridiem.AM);

        return result;
    }

    private adjustHour(hour: number, meridiem: string): number {
        switch (meridiem) {
            case "صبح": // Morning
                return hour; // Already AM
            case "ظهر": // Noon
                return 12;
            case "بعدازظهر": // Afternoon
                return hour === 12 ? 12 : hour + 12;
            case "عصر": // Evening
                return hour === 5 ? 17 : hour < 12 ? hour + 12 : hour;
            case "شب": // Night
                return hour < 12 ? hour + 12 : hour;
            default:
                return hour;
        }
    }
}
