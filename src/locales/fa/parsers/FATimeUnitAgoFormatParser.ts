import { ParsingContext } from "../../../chrono";
import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

/**
 * Persian time unit ago parser
 * Handles expressions like: ۵ روز پیش (5 days ago), ۲ ساعت قبل (2 hours before)
 */
const PATTERN = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:پیش|قبل|گذشته)(?=\\W|$)`, "i");

export default class FATimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const duration = parseDuration(match[1]);
        if (!duration) {
            return null;
        }
        return ParsingComponents.createRelativeFromReference(context.reference, reverseDuration(duration));
    }
}
