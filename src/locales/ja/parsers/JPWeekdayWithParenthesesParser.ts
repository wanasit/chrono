import { ParsingContext, Parser } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_OFFSET } from "../constants";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays";

const PATTERN = new RegExp("(?:\\(|\\（)(?<weekday>" + Object.keys(WEEKDAY_OFFSET).join("|") + ")(?:\\)|\\）)", "i");

/**
 * Weekday with parentheses in Japanese
 * For examples:
 * - (水)
 * - （土）
 */
export default class JPWeekdayWithParenthesesParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match.groups.weekday;
        const offset = WEEKDAY_OFFSET[dayOfWeek];
        if (offset === undefined) return null;
        return createParsingComponentsAtWeekday(context.reference, offset);
    }
}
