import { ParsingContext } from "../../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../../common/parsers/AbstractParserWithWordBoundary";
import { NUMBER, zhStringToNumber } from "../constants";

const FIRST_REG_PATTERN = new RegExp(
    "(?:由|從|自)?" +
        "(?:" +
        "(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|" +
        "(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|" +
        "(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)" +
        "(?:[\\s,，]*)" +
        "(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?" +
        ")?" +
        "(?:[\\s,，]*)" +
        "(?:(\\d+|[" +
        Object.keys(NUMBER).join("") +
        "]+)(?:\\s*)(?:點|時|:|：)" +
        "(?:\\s*)" +
        "(\\d+|半|正|整|[" +
        Object.keys(NUMBER).join("") +
        "]+)?(?:\\s*)(?:分|:|：)?" +
        "(?:\\s*)" +
        "(\\d+|[" +
        Object.keys(NUMBER).join("") +
        "]+)?(?:\\s*)(?:秒)?)" +
        "(?:\\s*(A.M.|P.M.|AM?|PM?))?",
    "i"
);

const SECOND_REG_PATTERN = new RegExp(
    "(?:^\\s*(?:到|至|\\-|\\–|\\~|\\〜)\\s*)" +
        "(?:" +
        "(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|" +
        "(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|" +
        "(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)" +
        "(?:[\\s,，]*)" +
        "(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?" +
        ")?" +
        "(?:[\\s,，]*)" +
        "(?:(\\d+|[" +
        Object.keys(NUMBER).join("") +
        "]+)(?:\\s*)(?:點|時|:|：)" +
        "(?:\\s*)" +
        "(\\d+|半|正|整|[" +
        Object.keys(NUMBER).join("") +
        "]+)?(?:\\s*)(?:分|:|：)?" +
        "(?:\\s*)" +
        "(\\d+|[" +
        Object.keys(NUMBER).join("") +
        "]+)?(?:\\s*)(?:秒)?)" +
        "(?:\\s*(A.M.|P.M.|AM?|PM?))?",
    "i"
);

const DAY_GROUP_1 = 1;
const ZH_AM_PM_HOUR_GROUP_1 = 2;
const ZH_AM_PM_HOUR_GROUP_2 = 3;
const DAY_GROUP_3 = 4;
const ZH_AM_PM_HOUR_GROUP_3 = 5;
const HOUR_GROUP = 6;
const MINUTE_GROUP = 7;
const SECOND_GROUP = 8;
const AM_PM_HOUR_GROUP = 9;

export default class ZHHantTimeExpressionParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return FIRST_REG_PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && context.text[match.index - 1].match(/\w/)) {
            return null;
        }

        const result = context.createParsingResult(match.index, match[0]);
        const startMoment = new Date(context.refDate.getTime());

        // ----- Day
        if (match[DAY_GROUP_1]) {
            const day1 = match[DAY_GROUP_1];
            if (day1 == "明" || day1 == "聽") {
                // Check not "Tomorrow" on late night
                if (context.refDate.getHours() > 1) {
                    startMoment.setDate(startMoment.getDate() + 1);
                }
            } else if (day1 == "昨" || day1 == "尋" || day1 == "琴") {
                startMoment.setDate(startMoment.getDate() - 1);
            } else if (day1 == "前") {
                startMoment.setDate(startMoment.getDate() - 2);
            } else if (day1 == "大前") {
                startMoment.setDate(startMoment.getDate() - 3);
            } else if (day1 == "後") {
                startMoment.setDate(startMoment.getDate() + 2);
            } else if (day1 == "大後") {
                startMoment.setDate(startMoment.getDate() + 3);
            }
            result.start.assign("day", startMoment.getDate());
            result.start.assign("month", startMoment.getMonth() + 1);
            result.start.assign("year", startMoment.getFullYear());
        } else if (match[DAY_GROUP_3]) {
            const day3 = match[DAY_GROUP_3];
            if (day3 == "明" || day3 == "聽") {
                startMoment.setDate(startMoment.getDate() + 1);
            } else if (day3 == "昨" || day3 == "尋" || day3 == "琴") {
                startMoment.setDate(startMoment.getDate() - 1);
            } else if (day3 == "前") {
                startMoment.setDate(startMoment.getDate() - 2);
            } else if (day3 == "大前") {
                startMoment.setDate(startMoment.getDate() - 3);
            } else if (day3 == "後") {
                startMoment.setDate(startMoment.getDate() + 2);
            } else if (day3 == "大後") {
                startMoment.setDate(startMoment.getDate() + 3);
            }
            result.start.assign("day", startMoment.getDate());
            result.start.assign("month", startMoment.getMonth() + 1);
            result.start.assign("year", startMoment.getFullYear());
        } else {
            result.start.imply("day", startMoment.getDate());
            result.start.imply("month", startMoment.getMonth() + 1);
            result.start.imply("year", startMoment.getFullYear());
        }

        let hour = 0;
        let minute = 0;
        let meridiem = -1;

        // ----- Second
        if (match[SECOND_GROUP]) {
            var second = parseInt(match[SECOND_GROUP]);
            if (isNaN(second)) {
                second = zhStringToNumber(match[SECOND_GROUP]);
            }
            if (second >= 60) return null;
            result.start.assign("second", second);
        }

        hour = parseInt(match[HOUR_GROUP]);
        if (isNaN(hour)) {
            hour = zhStringToNumber(match[HOUR_GROUP]);
        }

        // ----- Minutes
        if (match[MINUTE_GROUP]) {
            if (match[MINUTE_GROUP] == "半") {
                minute = 30;
            } else if (match[MINUTE_GROUP] == "正" || match[MINUTE_GROUP] == "整") {
                minute = 0;
            } else {
                minute = parseInt(match[MINUTE_GROUP]);
                if (isNaN(minute)) {
                    minute = zhStringToNumber(match[MINUTE_GROUP]);
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
            meridiem = 1;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP]) {
            if (hour > 12) return null;
            var ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            }

            if (ampm == "p") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_1]) {
            var zhAMPMString1 = match[ZH_AM_PM_HOUR_GROUP_1];
            var zhAMPM1 = zhAMPMString1[0];
            if (zhAMPM1 == "朝" || zhAMPM1 == "早") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM1 == "晚") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_2]) {
            var zhAMPMString2 = match[ZH_AM_PM_HOUR_GROUP_2];
            var zhAMPM2 = zhAMPMString2[0];
            if (zhAMPM2 == "上" || zhAMPM2 == "朝" || zhAMPM2 == "早" || zhAMPM2 == "凌") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM2 == "下" || zhAMPM2 == "晏" || zhAMPM2 == "晚") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (match[ZH_AM_PM_HOUR_GROUP_3]) {
            var zhAMPMString3 = match[ZH_AM_PM_HOUR_GROUP_3];
            var zhAMPM3 = zhAMPMString3[0];
            if (zhAMPM3 == "上" || zhAMPM3 == "朝" || zhAMPM3 == "早" || zhAMPM3 == "凌") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM3 == "下" || zhAMPM3 == "晏" || zhAMPM3 == "晚") {
                meridiem = 1;
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

        // ==============================================================
        //                  Extracting the 'to' chunk
        // ==============================================================

        const secondMatch = SECOND_REG_PATTERN.exec(context.text.substring(result.index + result.text.length));
        if (!secondMatch) {
            // Not accept number only result
            if (result.text.match(/^\d+$/)) {
                return null;
            }
            return result;
        }

        const endMoment = new Date(startMoment.getTime());
        result.end = context.createParsingComponents();

        // ----- Day
        if (secondMatch[DAY_GROUP_1]) {
            const day1 = secondMatch[DAY_GROUP_1];
            if (day1 == "明" || day1 == "聽") {
                // Check not "Tomorrow" on late night
                if (context.refDate.getHours() > 1) {
                    endMoment.setDate(endMoment.getDate() + 1);
                }
            } else if (day1 == "昨" || day1 == "尋" || day1 == "琴") {
                endMoment.setDate(endMoment.getDate() - 1);
            } else if (day1 == "前") {
                endMoment.setDate(endMoment.getDate() - 2);
            } else if (day1 == "大前") {
                endMoment.setDate(endMoment.getDate() - 3);
            } else if (day1 == "後") {
                endMoment.setDate(endMoment.getDate() + 2);
            } else if (day1 == "大後") {
                endMoment.setDate(endMoment.getDate() + 3);
            }
            result.end.assign("day", endMoment.getDate());
            result.end.assign("month", endMoment.getMonth() + 1);
            result.end.assign("year", endMoment.getFullYear());
        } else if (secondMatch[DAY_GROUP_3]) {
            const day3 = secondMatch[DAY_GROUP_3];
            if (day3 == "明" || day3 == "聽") {
                endMoment.setDate(endMoment.getDate() + 1);
            } else if (day3 == "昨" || day3 == "尋" || day3 == "琴") {
                endMoment.setDate(endMoment.getDate() - 1);
            } else if (day3 == "前") {
                endMoment.setDate(endMoment.getDate() - 2);
            } else if (day3 == "大前") {
                endMoment.setDate(endMoment.getDate() - 3);
            } else if (day3 == "後") {
                endMoment.setDate(endMoment.getDate() + 2);
            } else if (day3 == "大後") {
                endMoment.setDate(endMoment.getDate() + 3);
            }
            result.end.assign("day", endMoment.getDate());
            result.end.assign("month", endMoment.getMonth() + 1);
            result.end.assign("year", endMoment.getFullYear());
        } else {
            result.end.imply("day", endMoment.getDate());
            result.end.imply("month", endMoment.getMonth() + 1);
            result.end.imply("year", endMoment.getFullYear());
        }

        hour = 0;
        minute = 0;
        meridiem = -1;

        // ----- Second
        if (secondMatch[SECOND_GROUP]) {
            let second = parseInt(secondMatch[SECOND_GROUP]);
            if (isNaN(second)) {
                second = zhStringToNumber(secondMatch[SECOND_GROUP]);
            }

            if (second >= 60) return null;
            result.end.assign("second", second);
        }

        hour = parseInt(secondMatch[HOUR_GROUP]);
        if (isNaN(hour)) {
            hour = zhStringToNumber(secondMatch[HOUR_GROUP]);
        }

        // ----- Minutes
        if (secondMatch[MINUTE_GROUP]) {
            if (secondMatch[MINUTE_GROUP] == "半") {
                minute = 30;
            } else if (secondMatch[MINUTE_GROUP] == "正" || secondMatch[MINUTE_GROUP] == "整") {
                minute = 0;
            } else {
                minute = parseInt(secondMatch[MINUTE_GROUP]);
                if (isNaN(minute)) {
                    minute = zhStringToNumber(secondMatch[MINUTE_GROUP]);
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
            meridiem = 1;
        }

        // ----- AM & PM
        if (secondMatch[AM_PM_HOUR_GROUP]) {
            if (hour > 12) return null;
            var ampm = secondMatch[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            }

            if (ampm == "p") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }

            if (!result.start.isCertain("meridiem")) {
                if (meridiem == 0) {
                    result.start.imply("meridiem", 0);

                    if (result.start.get("hour") == 12) {
                        result.start.assign("hour", 0);
                    }
                } else {
                    result.start.imply("meridiem", 1);

                    if (result.start.get("hour") != 12) {
                        result.start.assign("hour", result.start.get("hour") + 12);
                    }
                }
            }
        } else if (secondMatch[ZH_AM_PM_HOUR_GROUP_1]) {
            const zhAMPMString1 = secondMatch[ZH_AM_PM_HOUR_GROUP_1];
            var zhAMPM1 = zhAMPMString1[0];
            if (zhAMPM1 == "朝" || zhAMPM1 == "早") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM1 == "晚") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (secondMatch[ZH_AM_PM_HOUR_GROUP_2]) {
            const zhAMPMString2 = secondMatch[ZH_AM_PM_HOUR_GROUP_2];
            var zhAMPM2 = zhAMPMString2[0];
            if (zhAMPM2 == "上" || zhAMPM2 == "朝" || zhAMPM2 == "早" || zhAMPM2 == "凌") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM2 == "下" || zhAMPM2 == "晏" || zhAMPM2 == "晚") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        } else if (secondMatch[ZH_AM_PM_HOUR_GROUP_3]) {
            const zhAMPMString3 = secondMatch[ZH_AM_PM_HOUR_GROUP_3];
            var zhAMPM3 = zhAMPMString3[0];
            if (zhAMPM3 == "上" || zhAMPM3 == "朝" || zhAMPM3 == "早" || zhAMPM3 == "凌") {
                meridiem = 0;
                if (hour == 12) hour = 0;
            } else if (zhAMPM3 == "下" || zhAMPM3 == "晏" || zhAMPM3 == "晚") {
                meridiem = 1;
                if (hour != 12) hour += 12;
            }
        }

        result.text = result.text + secondMatch[0];
        result.end.assign("hour", hour);
        result.end.assign("minute", minute);
        if (meridiem >= 0) {
            result.end.assign("meridiem", meridiem);
        } else {
            const startAtPM = result.start.isCertain("meridiem") && result.start.get("meridiem") == 1;
            if (startAtPM && result.start.get("hour") > hour) {
                // 10pm - 1 (am)
                result.end.imply("meridiem", 0);
            } else if (hour > 12) {
                result.end.imply("meridiem", 1);
            }
        }

        if (result.end.date().getTime() < result.start.date().getTime()) {
            result.end.imply("day", result.end.get("day") + 1);
        }

        return result;
    }
}
