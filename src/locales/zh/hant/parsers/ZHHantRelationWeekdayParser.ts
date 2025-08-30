import { ParsingContext } from "../../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../../common/parsers/AbstractParserWithWordBoundary";
import { ParsingResult } from "../../../../results";
import { WEEKDAY_OFFSET } from "../constants";

const PATTERN = new RegExp(
    "(?<prefix>上|今|下|這|呢)(?:個)?(?:星期|禮拜|週)(?<weekday>" + Object.keys(WEEKDAY_OFFSET).join("|") + ")"
);

export default class ZHHantRelationWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const result = context.createParsingResult(match.index, match[0]);

        const dayOfWeek = match.groups.weekday;
        const offset = WEEKDAY_OFFSET[dayOfWeek];
        if (offset === undefined) return null;

        let modifier = null;
        const prefix = match.groups.prefix;

        if (prefix == "上") {
            modifier = "last";
        } else if (prefix == "下") {
            modifier = "next";
        } else if (prefix == "今" || prefix == "這" || prefix == "呢") {
            modifier = "this";
        }

        const date = new Date(context.refDate.getTime());
        let startMomentFixed = false;
        const refOffset = date.getDay();

        if (modifier == "last" || modifier == "past") {
            date.setDate(date.getDate() + (offset - 7 - refOffset));
            startMomentFixed = true;
        } else if (modifier == "next") {
            date.setDate(date.getDate() + (offset + 7 - refOffset));
            startMomentFixed = true;
        } else if (modifier == "this") {
            date.setDate(date.getDate() + (offset - refOffset));
        } else {
            let diff = offset - refOffset;
            if (Math.abs(diff - 7) < Math.abs(diff)) {
                diff -= 7;
            }
            if (Math.abs(diff + 7) < Math.abs(diff)) {
                diff += 7;
            }
            date.setDate(date.getDate() + diff);
        }

        result.start.assign("weekday", offset);
        if (startMomentFixed) {
            result.start.assign("day", date.getDate());
            result.start.assign("month", date.getMonth() + 1);
            result.start.assign("year", date.getFullYear());
        } else {
            result.start.imply("day", date.getDate());
            result.start.imply("month", date.getMonth() + 1);
            result.start.imply("year", date.getFullYear());
        }

        return result;
    }
}
