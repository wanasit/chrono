import { TIME_UNITS_PATTERN, parseDuration, TIME_UNITS_NO_ABBR_PATTERN } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN_WITH_OPTIONAL_PREFIX = new RegExp(
    `(?:(?:entro|tra|fra|in|per)\\s*)?` +
        `(?:(?:circa|approssimativamente)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})(?=\\W|$)`,
    "i"
);

const PATTERN_WITH_PREFIX = new RegExp(
    `(?:entro|tra|fra|in|per)\\s*` +
        `(?:(?:circa|approssimativamente)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})(?=\\W|$)`,
    "i"
);

const PATTERN_WITH_PREFIX_STRICT = new RegExp(
    `(?:entro|tra|fra|in|per)\\s*` +
        `(?:(?:circa|approssimativamente)\\s*(?:~\\s*)?)?(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`,
    "i"
);

export default class ITTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(context: ParsingContext): RegExp {
        if (this.strictMode) {
            return PATTERN_WITH_PREFIX_STRICT;
        }
        return context.option.forwardDate ? PATTERN_WITH_OPTIONAL_PREFIX : PATTERN_WITH_PREFIX;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        // Exclude "per il/la unit" phases, e.g. "per l'anno"
        if (match[0].match(/^per\s*(il|la|l')\s*\w+/)) {
            return null;
        }
        const timeUnits = parseDuration(match[1]);
        if (!timeUnits) {
            return null;
        }
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
