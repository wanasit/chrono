import dayjs from "dayjs";
import { ParsingContext } from "../../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../../common/parsers/AbstractParserWithWordBoundary";
import { ParsingComponents, ParsingResult } from "../../../../results";

const NOW_GROUP = 1;
const DAY_GROUP_1 = 2;
const TIME_GROUP_1 = 3;
const TIME_GROUP_2 = 4;
const DAY_GROUP_3 = 5;
const TIME_GROUP_3 = 6;

export default class ZHHantCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return new RegExp(
            "(而家|立(?:刻|即)|即刻)|" +
                "(今|明|前|大前|後|大後|聽|昨|尋|琴)(早|朝|晚)|" +
                "(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨))|" +
                "(今|明|前|大前|後|大後|聽|昨|尋|琴)(?:日|天)" +
                "(?:[\\s|,|，]*)" +
                "(?:(上(?:午|晝)|朝(?:早)|早(?:上)|下(?:午|晝)|晏(?:晝)|晚(?:上)|夜(?:晚)?|中(?:午)|凌(?:晨)))?",
            "i"
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const index = match.index;
        const result = context.createParsingResult(index, match[0]);

        const refMoment = dayjs(context.refDate);
        let startMoment = refMoment;

        if (match[NOW_GROUP]) {
            result.start.imply("hour", refMoment.hour());
            result.start.imply("minute", refMoment.minute());
            result.start.imply("second", refMoment.second());
            result.start.imply("millisecond", refMoment.millisecond());
        } else if (match[DAY_GROUP_1]) {
            const day1 = match[DAY_GROUP_1];
            const time1 = match[TIME_GROUP_1];

            if (day1 == "明" || day1 == "聽") {
                // Check not "Tomorrow" on late night
                if (refMoment.hour() > 1) {
                    startMoment = startMoment.add(1, "day");
                }
            } else if (day1 == "昨" || day1 == "尋" || day1 == "琴") {
                startMoment = startMoment.add(-1, "day");
            } else if (day1 == "前") {
                startMoment = startMoment.add(-2, "day");
            } else if (day1 == "大前") {
                startMoment = startMoment.add(-3, "day");
            } else if (day1 == "後") {
                startMoment = startMoment.add(2, "day");
            } else if (day1 == "大後") {
                startMoment = startMoment.add(3, "day");
            }

            if (time1 == "早" || time1 == "朝") {
                result.start.imply("hour", 6);
            } else if (time1 == "晚") {
                result.start.imply("hour", 22);
                result.start.imply("meridiem", 1);
            }
        } else if (match[TIME_GROUP_2]) {
            const timeString2 = match[TIME_GROUP_2];
            const time2 = timeString2[0];
            if (time2 == "早" || time2 == "朝" || time2 == "上") {
                result.start.imply("hour", 6);
            } else if (time2 == "下" || time2 == "晏") {
                result.start.imply("hour", 15);
                result.start.imply("meridiem", 1);
            } else if (time2 == "中") {
                result.start.imply("hour", 12);
                result.start.imply("meridiem", 1);
            } else if (time2 == "夜" || time2 == "晚") {
                result.start.imply("hour", 22);
                result.start.imply("meridiem", 1);
            } else if (time2 == "凌") {
                result.start.imply("hour", 0);
            }
        } else if (match[DAY_GROUP_3]) {
            const day3 = match[DAY_GROUP_3];

            if (day3 == "明" || day3 == "聽") {
                // Check not "Tomorrow" on late night
                if (refMoment.hour() > 1) {
                    startMoment = startMoment.add(1, "day");
                }
            } else if (day3 == "昨" || day3 == "尋" || day3 == "琴") {
                startMoment = startMoment.add(-1, "day");
            } else if (day3 == "前") {
                startMoment = startMoment.add(-2, "day");
            } else if (day3 == "大前") {
                startMoment = startMoment.add(-3, "day");
            } else if (day3 == "後") {
                startMoment = startMoment.add(2, "day");
            } else if (day3 == "大後") {
                startMoment = startMoment.add(3, "day");
            }

            const timeString3 = match[TIME_GROUP_3];
            if (timeString3) {
                const time3 = timeString3[0];
                if (time3 == "早" || time3 == "朝" || time3 == "上") {
                    result.start.imply("hour", 6);
                } else if (time3 == "下" || time3 == "晏") {
                    result.start.imply("hour", 15);
                    result.start.imply("meridiem", 1);
                } else if (time3 == "中") {
                    result.start.imply("hour", 12);
                    result.start.imply("meridiem", 1);
                } else if (time3 == "夜" || time3 == "晚") {
                    result.start.imply("hour", 22);
                    result.start.imply("meridiem", 1);
                } else if (time3 == "凌") {
                    result.start.imply("hour", 0);
                }
            }
        }

        result.start.assign("day", startMoment.date());
        result.start.assign("month", startMoment.month() + 1);
        result.start.assign("year", startMoment.year());

        return result;
    }
}
