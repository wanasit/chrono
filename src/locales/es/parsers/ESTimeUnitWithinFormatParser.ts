import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN_WITH_OPTIONAL_PREFIX = new RegExp(
    `(?:(?:en|por|durante|de|dentro de)\\s*)?(${TIME_UNITS_PATTERN})(?=\\W|$)`,
    "i"
);

const PATTERN_WITH_PREFIX = new RegExp(`(?:en|por|durante|de|dentro de)\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");

export default class ESTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(context: ParsingContext): RegExp {
        return !this.strictMode && context.option.forwardDate ? PATTERN_WITH_OPTIONAL_PREFIX : PATTERN_WITH_PREFIX;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
