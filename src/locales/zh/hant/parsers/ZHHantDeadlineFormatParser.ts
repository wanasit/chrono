import dayjs from "dayjs";
import { ParsingContext } from "../../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../../common/parsers/AbstractParserWithWordBoundary";
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

        let date = dayjs(context.refDate);
        const unit = match[UNIT_GROUP];
        const unitAbbr = unit[0];

        if (unitAbbr.match(/[日天星禮月年]/)) {
            if (unitAbbr == "日" || unitAbbr == "天") {
                date = date.add(number, "d");
            } else if (unitAbbr == "星" || unitAbbr == "禮") {
                date = date.add(number * 7, "d");
            } else if (unitAbbr == "月") {
                date = date.add(number, "month");
            } else if (unitAbbr == "年") {
                date = date.add(number, "year");
            }

            result.start.assign("year", date.year());
            result.start.assign("month", date.month() + 1);
            result.start.assign("day", date.date());
            return result;
        }

        if (unitAbbr == "秒") {
            date = date.add(number, "second");
        } else if (unitAbbr == "分") {
            date = date.add(number, "minute");
        } else if (unitAbbr == "小" || unitAbbr == "鐘") {
            date = date.add(number, "hour");
        }

        result.start.imply("year", date.year());
        result.start.imply("month", date.month() + 1);
        result.start.imply("day", date.date());
        result.start.assign("hour", date.hour());
        result.start.assign("minute", date.minute());
        result.start.assign("second", date.second());
        return result;
    }
}
