import { ParsingContext } from "../../../chrono";
import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(`(?:در|طی|ظرف)\\s{0,3}(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");

export default class FATimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
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
