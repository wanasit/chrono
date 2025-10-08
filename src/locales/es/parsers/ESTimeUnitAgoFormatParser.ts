import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_NO_ABBR_PATTERN, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

const PATTERN = new RegExp(`(?:hace|atrás)\\s{0,5}(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");

const STRICT_PATTERN = new RegExp(`(?:hace|atrás)\\s{0,5}(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`, "i");

export default class ESTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const duration = parseDuration(match[1]);
        if (!duration) {
            return null;
        }
        return ParsingComponents.createRelativeFromReference(context.reference, reverseDuration(duration));
    }
}
