import { ParsingContext } from "../../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../../common/parsers/AbstractParserWithWordBoundary";
import { addDuration, Duration } from "../../../../calculation/duration";
import { NUMBER, zhStringToNumber } from "../constants";

const PATTERN = new RegExp(
    "(\\d+|[" +
        Object.keys(NUMBER).join("") +
        "]+|半|幾)(?:\\s*)" +
        "(?:個)?" +
        "(秒(?:鐘)?|分鐘|小時|鐘|日|天|星期|禮拜|月|年)" +
        "(?:(?:之|過)?後|(?:之)?內)",
    "i"
);

const NUMBER_GROUP = 1;
const UNIT_GROUP = 2;

export default class ZHHantDeadlineFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const result = context.createParsingResult(match.index, match[0]);

        let number = parseInt(match[NUMBER_GROUP]);
        if (isNaN(number)) {
            number = zhStringToNumber(match[NUMBER_GROUP]);
        }

        if (isNaN(number)) {
            const string = match[NUMBER_GROUP];
            if (string === "幾") {
                number = 3;
            } else if (string === "半") {
                number = 0.5;
            } else {
                //just in case
                return null;
            }
        }

        const duration: Duration = {};
        const unit = match[UNIT_GROUP];
        const unitAbbr = unit[0];

        if (unitAbbr.match(/[日天星禮月年]/)) {
            if (unitAbbr == "日" || unitAbbr == "天") {
                duration.day = number;
            } else if (unitAbbr == "星" || unitAbbr == "禮") {
                duration.week = number;
            } else if (unitAbbr == "月") {
                duration.month = number;
            } else if (unitAbbr == "年") {
                duration.year = number;
            }

            const date = addDuration(context.refDate, duration);
            result.start.assign("year", date.getFullYear());
            result.start.assign("month", date.getMonth() + 1);
            result.start.assign("day", date.getDate());
            return result;
        }

        if (unitAbbr == "秒") {
            duration.second = number;
        } else if (unitAbbr == "分") {
            duration.minute = number;
        } else if (unitAbbr == "小" || unitAbbr == "鐘") {
            duration.hour = number;
        }

        const date = addDuration(context.refDate, duration);
        result.start.imply("year", date.getFullYear());
        result.start.imply("month", date.getMonth() + 1);
        result.start.imply("day", date.getDate());
        result.start.assign("hour", date.getHours());
        result.start.assign("minute", date.getMinutes());
        result.start.assign("second", date.getSeconds());
        return result;
    }
}
