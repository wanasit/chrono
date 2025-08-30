import { ParsingContext } from "../../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../../common/parsers/AbstractParserWithWordBoundary";
import { ParsingResult } from "../../../../results";
import { WEEKDAY_OFFSET } from "../constants";

const PATTERN = new RegExp("(?:星期|礼拜|周)(?<weekday>" + Object.keys(WEEKDAY_OFFSET).join("|") + ")");

export default class ZHHansWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const result = context.createParsingResult(match.index, match[0]);

        const dayOfWeek = match.groups.weekday;
        const offset = WEEKDAY_OFFSET[dayOfWeek];
        if (offset === undefined) return null;

        const date = new Date(context.refDate.getTime());
        const startMomentFixed = false;
        const refOffset = date.getDay();

        let diff = offset - refOffset;
        if (Math.abs(diff - 7) < Math.abs(diff)) {
            diff -= 7;
        }
        if (Math.abs(diff + 7) < Math.abs(diff)) {
            diff += 7;
        }

        date.setDate(date.getDate() + diff);

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
