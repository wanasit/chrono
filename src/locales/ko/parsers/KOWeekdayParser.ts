import { Parser, ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { Weekday } from "../../../types";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays";
import { WEEK_OFFSET, WEEKDAY_OFFSET } from "../constants";

/**
 * - "금요일" (Friday): the coming Friday, including today.
 * - "다음주 화요일" (next week's Tuesday), "지난주 수요일" (last week's Wednesday), "이번주 일요일" (this week's Sunday).
 *   These refer to a day *in that calendar week* (weeks start on Monday), not to the nearest weekday.
 *   e.g. on Friday, "다음주 월요일" is 3 days later and "지난주 수요일" is 9 days earlier.
 *
 * A weekday must end with "요일" (or the casual "욜"). A single character such as "월" also means "month",
 * so it is only accepted right after a week word ("다음주 월") and only when followed by the end of text,
 * punctuation, a time ("다음주 월 2시", "담주 금 저녁" = Fri evening), another weekday ("수, 목" = Wed, Thu),
 * or a particle ("금에" = on Fri, "월까지" = until Mon).
 * Otherwise the character starts another word: "다음주 일정" (next week's schedule), "다음주 일 많아"
 * (lots of work next week), "이번주 목 아파" (sore throat this week).
 */
const DAY_ALONE =
    "(?=\\s*$|\\s*[,.!?~～)]|\\s*(?:\\d|오전|오후|새벽|아침|점심|낮(?!잠)|저녁|밤(?!새)|[일월화수목금토](?![가-힣]))" +
    "|(?:에|엔|은|는|도|나|이나|쯤)(?![가-힣])|에는|까지|부터)";

const PATTERN = new RegExp(
    "(?:(?<week>지난|저번|이번|다다음|다음|담)\\s*주\\s*)?" +
        "(?<weekday>[일월화수목금토])" +
        "(?:(?<suffix>요일|욜)|" +
        DAY_ALONE +
        ")",
    "i"
);

export default class KOWeekdayParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const weekday = WEEKDAY_OFFSET[match.groups.weekday] as Weekday;
        const week = match.groups.week;
        if (!week && !match.groups.suffix) {
            return null;
        }
        // "일" right before another character is usually not Sunday ("일정" schedule, "일요일" is fine)
        if (!week && match.index > 0 && /[가-힣]/.test(context.text[match.index - 1])) {
            return null;
        }

        if (!week) {
            return createParsingComponentsAtWeekday(context.reference, weekday, "this");
        }

        // Day offset from the reference date to the target weekday in the target calendar week (Monday start)
        const refDate = context.reference.getDateWithAdjustedTimezone();
        const daysFromMonday = (refDate.getDay() + 6) % 7;
        const targetFromMonday = (weekday + 6) % 7;
        const days = WEEK_OFFSET[week] * 7 + targetFromMonday - daysFromMonday;

        let components = new ParsingComponents(context.reference);
        components = components.addDurationAsImplied({ day: days });
        components.assign("weekday", weekday);
        return components;
    }
}
