import { ParsingContext } from "../../../chrono";
import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

/**
 * Persian time unit later parser
 * Handles expressions like: ۵ روز دیگر (5 days later), ۲ ساعت بعد (2 hours later)
 */
const PATTERN = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:دیگر|بعد|آینده)(?=\\W|$)`, "i");

export default class FATimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const duration = parseDuration(match[1]);
        if (!duration) {
            return null;
        }
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
