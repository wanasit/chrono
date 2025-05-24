import { ParsingContext } from "../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { Meridiem } from "../../../types";
import { NUMBER, jaStringToNumber, toHankaku } from "../constants";

const FIRST_REG_PATTERN = new RegExp(
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
        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && context.text[match.index - 1].match(/\w/)) {
            return null;
        }

        const result = context.createParsingResult(match.index, match[0]);

        let hour = 0;
        let minute = 0;
        let meridiem = -1;

        // ----- Second
        if (match[SECOND_GROUP]) {
            let second = parseInt(toHankaku(match[SECOND_GROUP]));
            if (isNaN(second)) {
                second = jaStringToNumber(match[SECOND_GROUP]);
            }
            if (second >= 60) return null;
            result.start.assign("second", second);
        }

        hour = parseInt(toHankaku(match[HOUR_GROUP]));
        if (isNaN(hour)) {
            hour = jaStringToNumber(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if (match[MINUTE_GROUP]) {
            if (match[MINUTE_GROUP] === "半") {
                minute = 30;
            } else {
                minute = parseInt(toHankaku(match[MINUTE_GROUP]));
                if (isNaN(minute)) {
                    minute = jaStringToNumber(match[MINUTE_GROUP]);
                }
            }
        } else if (hour > 100) {
            minute = hour % 100;
            hour = Math.floor(hour / 100);
        }

        if (minute >= 60) {
            return null;
        }

        if (hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = Meridiem.PM;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP_1]) {
            if (hour > 12) return null;
            const AMPMString = match[AM_PM_HOUR_GROUP_1];
            const FirstAMPMString = AMPMString[0].toLowerCase();
            if (AMPMString === "午前" || FirstAMPMString === "a") {
                meridiem = Meridiem.AM;
                if (hour === 12) hour = 0;
            } else if (AMPMString === "午後" || FirstAMPMString === "p") {
                meridiem = Meridiem.PM;
                if (hour != 12) hour += 12;
            }
        } else if (match[AM_PM_HOUR_GROUP_2]) {
            if (hour > 12) return null;
            const ampm = match[AM_PM_HOUR_GROUP_2][0].toLowerCase();
            if (ampm === "a") {
                meridiem = Meridiem.AM;
                if (hour === 12) hour = 0;
            }

            if (ampm === "p") {
                meridiem = Meridiem.PM;
                if (hour != 12) hour += 12;
            }
        }

        result.start.assign("hour", hour);
        result.start.assign("minute", minute);

        if (meridiem >= 0) {
            result.start.assign("meridiem", meridiem);
        } else {
            if (hour < 12) {
                result.start.imply("meridiem", 0);
            } else {
                result.start.imply("meridiem", 1);
            }
        }

        // =============================================================================================
        //                  Extracting the 'to' chunk
        // =============================================================================================

        match = SECOND_REG_PATTERN.exec(context.text.substring(result.index + result.text.length));
        if (!match) {
            // Not accept number only result
            if (result.text.match(/^\d+$/)) {
                return null;
            }
            return result;
        }

        result.end = context.createParsingComponents();

        hour = 0;
        minute = 0;
        meridiem = -1;

        // ----- Second
        if (match[SECOND_GROUP]) {
            let second = parseInt(toHankaku(match[SECOND_GROUP]));
            if (isNaN(second)) {
                second = jaStringToNumber(match[SECOND_GROUP]);
            }

            if (second >= 60) return null;
            result.end.assign("second", second);
        }

        hour = parseInt(toHankaku(match[HOUR_GROUP]));
        if (isNaN(hour)) {
            hour = jaStringToNumber(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if (match[MINUTE_GROUP]) {
            if (match[MINUTE_GROUP] === "半") {
                minute = 30;
            } else {
                minute = parseInt(toHankaku(match[MINUTE_GROUP]));
                if (isNaN(minute)) {
                    minute = jaStringToNumber(match[MINUTE_GROUP]);
                }
            }
        } else if (hour > 100) {
            minute = hour % 100;
            hour = Math.floor(hour / 100);
        }

        if (minute >= 60) {
            return null;
        }

        if (hour > 24) {
            return null;
        }
        if (hour >= 12) {
            meridiem = Meridiem.PM;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP_1]) {
            if (hour > 12) return null;
            const AMPMString = match[AM_PM_HOUR_GROUP_1];
            const FirstAMPMString = AMPMString[0].toLowerCase();
            if (AMPMString === "午前" || FirstAMPMString === "a") {
                meridiem = Meridiem.AM;
                if (hour === 12) hour = 0;
            } else if (AMPMString === "午後" || FirstAMPMString === "p") {
                meridiem = Meridiem.PM;
                if (hour != 12) hour += 12;
            }

            if (!result.start.isCertain("meridiem")) {
                if (meridiem === Meridiem.AM) {
                    result.start.imply("meridiem", Meridiem.AM);

                    if (result.start.get("hour") === 12) {
                        result.start.assign("hour", 0);
                    }
                } else {
                    result.start.imply("meridiem", 1);

                    if (result.start.get("hour") != 12) {
                        result.start.assign("hour", result.start.get("hour") + 12);
                    }
                }
            }
        } else if (match[AM_PM_HOUR_GROUP_2]) {
            if (hour > 12) return null;
            const ampm = match[AM_PM_HOUR_GROUP_2][0].toLowerCase();
            if (ampm === "a") {
                meridiem = Meridiem.AM;
                if (hour === 12) hour = 0;
            }

            if (ampm === "p") {
                meridiem = Meridiem.PM;
                if (hour != 12) hour += 12;
            }
        }

        result.text = result.text + match[0];
        result.end.assign("hour", hour);
        result.end.assign("minute", minute);
        if (meridiem >= 0) {
            result.end.assign("meridiem", meridiem);
        } else {
            const startAtPM = result.start.isCertain("meridiem") && result.start.get("hour") > 12;
            if (startAtPM) {
                if (result.start.get("hour") - 12 > hour) {
                    // 10pm - 1 (am)
                    result.end.imply("meridiem", Meridiem.AM);
                } else if (hour <= 12) {
                    result.end.assign("hour", hour + 12);
                    result.end.assign("meridiem", Meridiem.PM);
                }
            } else if (hour > 12) {
                result.end.imply("meridiem", Meridiem.PM);
            } else if (hour <= 12) {
                result.end.imply("meridiem", Meridiem.AM);
            }
        }

        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply("day", result.end.get("day") + 1);
        }

        return result;
    }
}
