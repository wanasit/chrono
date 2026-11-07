import { Parser, ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../types";
import { HOUR_WORD, parseHour } from "../constants";

/**
 * "오후 3시" (3 PM), "오전 10시 30분" (10:30 AM), "3시 반" (half past 3), "세 시" (3 o'clock).
 *
 * - 시 = hour, 분 = minute, 반 = half (30 minutes)
 * - 오전 = AM, 오후 = PM
 * - Time-of-day words: 새벽 (early morning) and 아침 (morning) are AM; 점심 (lunchtime), 낮 (daytime),
 *   저녁 (evening) and 밤 (night) are PM. "밤 12시" (12 at night) is midnight.
 * - Without any of these, the hour is kept as written and the meridiem is only implied ("3시" = 3:00 AM, implied).
 */
const PATTERN = new RegExp(
    "(?:(?<period>오전|오후|새벽|아침|점심|낮|저녁|밤)\\s*)?" +
        "(?<hour>\\d{1,2}|" +
        Object.keys(HOUR_WORD)
            .sort((a, b) => b.length - a.length)
            .join("|") +
        ")\\s*시(?!간)" +
        "(?:\\s*(?:(?<half>반)|(?<minute>\\d{1,2})\\s*분))?",
    "i"
);

const AM_PERIODS = ["오전", "새벽", "아침"];

export default class KOTimeExpressionParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        let hour = parseHour(match.groups.hour);
        const minute = match.groups.half ? 30 : match.groups.minute ? parseInt(match.groups.minute) : 0;
        if (hour === undefined || hour > 24 || minute > 59) {
            return null;
        }

        const components = context.createParsingComponents();
        const period = match.groups.period;
        if (period) {
            const isAM = AM_PERIODS.includes(period);
            if (period === "밤" && hour === 12) {
                hour = 0;
            } else if (isAM && hour === 12) {
                hour = 0;
            } else if (!isAM && hour < 12) {
                hour += 12;
            }
            components.assign("meridiem", hour >= 12 ? Meridiem.PM : Meridiem.AM);
        } else if (hour > 12) {
            // 15시 = 15:00 (24-hour notation): PM is certain
            components.assign("meridiem", Meridiem.PM);
        } else {
            // 3시, 12시: no AM/PM word. Imply one, as the other locales do, so a refiner can still override it
            components.imply("meridiem", hour === 12 ? Meridiem.PM : Meridiem.AM);
        }

        components.assign("hour", hour === 24 ? 0 : hour);
        components.assign("minute", minute);
        return components;
    }
}
