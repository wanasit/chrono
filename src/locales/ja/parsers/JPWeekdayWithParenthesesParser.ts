import { ParsingContext } from "../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_OFFSET } from "../constants";
import { createParsingComponentsAtWeekday } from "../../../common/calculation/weekdays";

const PATTERN = new RegExp("(?:\\(|\\（)(?<weekday>" + Object.keys(WEEKDAY_OFFSET).join("|") + ")(?:\\)|\\）)", "i");

/**
 * Weekday with parentheses in Japanese
 * For examples:
 * - (水)
 * - （土）
 */
export default class JPWeekdayWithParenthesesParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match.groups.weekday;
        const offset = WEEKDAY_OFFSET[dayOfWeek];
        if (offset === undefined) return null;
        return createParsingComponentsAtWeekday(context.reference, offset);
    }
}
