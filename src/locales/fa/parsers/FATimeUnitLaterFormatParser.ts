import { ParsingContext } from "../../../chrono";
import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

/**
 * Persian time unit later parser
 * Handles expressions like: ۵ روز دیگر (5 days later), ۲ ساعت بعد (2 hours later)
 * Excludes patterns preceded by "تا" which should be handled by the within parser
 */
const PATTERN = new RegExp(`(?<!تا\\s{0,3})(${TIME_UNITS_PATTERN})\\s{0,5}(?:دیگر|بعد|آینده)(?=\\W|$)`, "i");

export default class FATimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        // Check if the match is preceded by "تا" (until) - if so, skip this match
        // as it should be handled by the within parser instead
        const textBeforeMatch = context.text.substring(0, match.index);
        if (/تا\s*$/.test(textBeforeMatch)) {
            return null;
        }

        const duration = parseDuration(match[1]);
        if (!duration) {
            return null;
        }
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
