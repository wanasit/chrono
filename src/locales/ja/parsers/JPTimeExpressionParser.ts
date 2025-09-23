import { ParsingContext } from "../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { Meridiem, ParsedComponents } from "../../../types";
import { NUMBER, jaStringToNumber, toHankaku } from "../constants";
import { ParsingComponents } from "../../../results";

const FIRST_REG_PATTERN = new RegExp(
    "(?:" +
        "(午前|午後|A.M.|P.M.|AM|PM)" +
        ")?" +
        "(?:[\\s,，、]*)" +
        "(?:([0-9０-９]+|[" +
        Object.keys(NUMBER).join("") +
        "]+)(?:\\s*)(?:時(?!間)|:|：)" +
        "(?:\\s*)" +
        "([0-9０-９]+|半|[" +
        Object.keys(NUMBER).join("") +
        "]+)?(?:\\s*)(?:分|:|：)?" +
        "(?:\\s*)" +
        "([0-9０-９]+|[" +
        Object.keys(NUMBER).join("") +
        "]+)?(?:\\s*)(?:秒)?)" +
        "(?:\\s*(A.M.|P.M.|AM?|PM?))?",
    "i"
);

const SECOND_REG_PATTERN = new RegExp(
    "(?:^\\s*(?:から|\\-|\\–|\\－|\\~|\\〜)\\s*)" +
        "(?:" +
        "(午前|午後|A.M.|P.M.|AM|PM)" +
        ")?" +
        "(?:[\\s,，、]*)" +
        "(?:([0-9０-９]+|[" +
        Object.keys(NUMBER).join("") +
        "]+)(?:\\s*)(?:時|:|：)" +
        "(?:\\s*)" +
        "([0-9０-９]+|半|[" +
        Object.keys(NUMBER).join("") +
        "]+)?(?:\\s*)(?:分|:|：)?" +
        "(?:\\s*)" +
        "([0-9０-９]+|[" +
        Object.keys(NUMBER).join("") +
        "]+)?(?:\\s*)(?:秒)?)" +
        "(?:\\s*(A.M.|P.M.|AM?|PM?))?",
    "i"
);

const AM_PM_HOUR_GROUP_1 = 1;
const HOUR_GROUP = 2;
const MINUTE_GROUP = 3;
const SECOND_GROUP = 4;
const AM_PM_HOUR_GROUP_2 = 5;

export default class JPTimeExpressionParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return FIRST_REG_PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        // This pattern can be overlapped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && context.text[match.index - 1].match(/\w/)) {
            return null;
        }

        const result = context.createParsingResult(match.index, match[0]);
        result.start = createTimeComponents(
            context,
            match[HOUR_GROUP],
            match[MINUTE_GROUP],
            match[SECOND_GROUP],
            match[AM_PM_HOUR_GROUP_1] ?? match[AM_PM_HOUR_GROUP_2]
        );
        if (!result.start) {
            match.index += match[0].length; // Skip over potential overlapping pattern
            return null;
        }

        // =============================================================================================
        //                  Extracting the 'to' chunk
        // =============================================================================================

        match = SECOND_REG_PATTERN.exec(context.text.substring(result.index + result.text.length));
        if (!match) {
            return result;
        }

        result.text = result.text + match[0];
        result.end = createTimeComponents(
            context,
            match[HOUR_GROUP],
            match[MINUTE_GROUP],
            match[SECOND_GROUP],
            match[AM_PM_HOUR_GROUP_1] ?? match[AM_PM_HOUR_GROUP_2]
        );
        if (!result.end) {
            return null;
        }
        if (!result.end.isCertain("meridiem") && result.start.isCertain("meridiem")) {
            result.end.imply("meridiem", result.start.get("meridiem"));
            if (result.start.get("meridiem") === Meridiem.PM) {
                if (result.start.get("hour") - 12 > result.end.get("hour")) {
                    // 10pm - 1 (am)
                    result.end.imply("meridiem", Meridiem.AM);
                } else if (result.end.get("hour") < 12) {
                    result.end.assign("hour", result.end.get("hour") + 12);
                }
            }
        }
        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply("day", result.end.get("day") + 1);
        }
        return result;
    }
}

function createTimeComponents(
    context: ParsingContext,
    matchHour: string | null,
    matchMinute: string | null,
    matchSecond: string | null,
    matchAmPm: string | null
): ParsingComponents | null {
    let hour = 0;
    let meridiem = -1;
    let targetComponents = context.createParsingComponents();
    hour = parseInt(toHankaku(matchHour));
    if (isNaN(hour)) {
        hour = jaStringToNumber(matchHour);
    }
    if (hour > 24) {
        return null;
    }

    if (matchMinute) {
        let minute: number;
        if (matchMinute === "半") {
            minute = 30;
        } else {
            minute = parseInt(toHankaku(matchMinute));
            if (isNaN(minute)) {
                minute = jaStringToNumber(matchMinute);
            }
        }
        if (minute >= 60) return null;
        targetComponents.assign("minute", minute);
    }
    if (matchSecond) {
        let second = parseInt(toHankaku(matchSecond));
        if (isNaN(second)) {
            second = jaStringToNumber(matchSecond);
        }
        if (second >= 60) return null;
        targetComponents.assign("second", second);
    }

    if (matchAmPm) {
        if (hour > 12) {
            return null;
        }
        const AMPMString = matchAmPm;
        if (AMPMString === "午前" || AMPMString[0].toLowerCase() === "a") {
            meridiem = Meridiem.AM;
            if (hour === 12) hour = 0;
        } else if (AMPMString === "午後" || AMPMString[0].toLowerCase() === "p") {
            meridiem = Meridiem.PM;
            if (hour != 12) hour += 12;
        }
    }

    targetComponents.assign("hour", hour);

    if (meridiem >= 0) {
        targetComponents.assign("meridiem", meridiem);
    } else {
        if (hour < 12) {
            targetComponents.imply("meridiem", Meridiem.AM);
        } else {
            targetComponents.imply("meridiem", Meridiem.PM);
        }
    }
    return targetComponents;
}
