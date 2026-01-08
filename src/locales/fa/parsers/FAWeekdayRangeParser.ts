import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

/**
 * Persian weekday range parser
 * Handles expressions like: از دوشنبه تا جمعه (from Monday to Friday)
 */
const PATTERN = new RegExp(
    `(?:از\\s+)?(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        `\\s+(?:تا|الی)\\s+` +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})`,
    "i"
);

export default class FAWeekdayRangeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult | null {
        const startWeekdayWord = match[1].toLowerCase();
        const endWeekdayWord = match[2].toLowerCase();

        const startWeekday = WEEKDAY_DICTIONARY[startWeekdayWord];
        const endWeekday = WEEKDAY_DICTIONARY[endWeekdayWord];

        if (startWeekday === undefined || endWeekday === undefined) {
            return null;
        }

        const result = context.createParsingResult(match.index, match[0]);
        const refDate = context.reference.getDateWithAdjustedTimezone();

        // Calculate start date - find the next occurrence of start weekday
        const refWeekday = refDate.getDay();
        let daysToStart = startWeekday - refWeekday;
        if (daysToStart < 0) {
            daysToStart += 7;
        }

        const startDate = new Date(refDate.getTime() + daysToStart * 24 * 60 * 60 * 1000);
        result.start.assign("year", startDate.getFullYear());
        result.start.assign("month", startDate.getMonth() + 1);
        result.start.assign("day", startDate.getDate());
        result.start.assign("weekday", startWeekday);

        // Calculate end date - find the next occurrence of end weekday after start
        let daysToEnd = endWeekday - startWeekday;
        if (daysToEnd <= 0) {
            daysToEnd += 7;
        }

        const endDate = new Date(startDate.getTime() + daysToEnd * 24 * 60 * 60 * 1000);
        result.end = result.start.clone();
        result.end.assign("year", endDate.getFullYear());
        result.end.assign("month", endDate.getMonth() + 1);
        result.end.assign("day", endDate.getDate());
        result.end.assign("weekday", endWeekday);

        return result;
    }
}
