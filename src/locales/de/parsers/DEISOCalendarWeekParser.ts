import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { getISOWeekParts, isoWeekMondaySunday } from "../../../calculation/isoWeek";

/**
 * German ISO calendar weeks: "KW 40", "KW40/2026", "Kalenderwoche 12", "Woche 12/2026".
 * Bare week numbers without year use the reference date's ISO week-year
 * (does not roll elapsed weeks into the next year).
 *
 * Result is a date range Monday 00:00–Sunday (end day implied).
 */
const PATTERN = new RegExp(
    "(?:" +
        "(?:kw|kalenderwoche)\\s*([0-9]{1,2})(?:\\s*[/.]\\s*|\\s+)?([0-9]{4})?" +
        "|" +
        "woche\\s+([0-9]{1,2})(?:\\s*[/.]\\s*|\\s+)([0-9]{4})" +
        "|" +
        // Bare "Woche N" only with explicit year elsewhere avoided — digit-only week needs KW/Kalenderwoche
        // or "Woche N/YYYY" (above). Optional: "Woche N" when followed by EOL/punct and not "diese Woche".
        "woche\\s+([0-9]{1,2})(?=\\W|$)" +
        ")" +
        "(?=\\W|$)",
    "i"
);

export default class DEISOCalendarWeekParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult | null {
        let week: number;
        let year: number | null = null;

        if (match[1]) {
            week = parseInt(match[1], 10);
            year = match[2] ? parseInt(match[2], 10) : null;
        } else if (match[3]) {
            week = parseInt(match[3], 10);
            year = parseInt(match[4], 10);
        } else if (match[5]) {
            week = parseInt(match[5], 10);
            year = null;
        } else {
            return null;
        }

        if (week < 1 || week > 53) return null;

        const ref = context.reference.getDateWithAdjustedTimezone();
        if (year == null) {
            year = getISOWeekParts(ref).year;
        }

        const window = isoWeekMondaySunday(year, week);
        if (!window) return null;

        const result = context.createParsingResult(match.index, match[0]);
        result.start.assign("year", window.monday.year);
        result.start.assign("month", window.monday.month);
        result.start.assign("day", window.monday.day);
        result.start.imply("hour", 0);
        result.start.imply("minute", 0);
        result.start.imply("second", 0);

        result.end = result.start.clone();
        result.end.assign("year", window.sunday.year);
        result.end.assign("month", window.sunday.month);
        result.end.assign("day", window.sunday.day);
        result.end.imply("hour", 23);
        result.end.imply("minute", 59);
        result.end.imply("second", 59);

        return result;
    }
}
