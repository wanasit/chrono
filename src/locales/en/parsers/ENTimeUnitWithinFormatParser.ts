import { TIME_UNITS_PATTERN, parseTimeUnits, TIME_UNITS_NO_ABBR_PATTERN } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const TIME_UNIT_PATTERN = `(${TIME_UNITS_PATTERN})`;
const TIME_UNIT_CONNECTOR_PATTERN = `\\s+and\\s+`;
const MULTIPLE_TIME_UNITS_PATTERN = `${TIME_UNIT_PATTERN}(?:${TIME_UNIT_CONNECTOR_PATTERN}${TIME_UNIT_PATTERN})*`;

const PATTERN_WITH_OPTIONAL_PREFIX = new RegExp(
    `(?:(?:within|in|for)\\s*)?` +
    `(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?${MULTIPLE_TIME_UNITS_PATTERN}(?=\\W|$)`,
    "i"
);

const PATTERN_WITH_PREFIX = new RegExp(
    `(?:within|in|for)\\s*` +
        `(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${MULTIPLE_TIME_UNITS_PATTERN})(?=\\W|$)`,
    "i"
);

const PATTERN_WITH_PREFIX_STRICT = new RegExp(
    `(?:within|in|for)\\s*` +
        `(?:(?:about|around|roughly|approximately|just)\\s*(?:~\\s*)?)?(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`,
    "i"
);

export default class ENTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(context: ParsingContext): RegExp {
        if (this.strictMode) {
            return PATTERN_WITH_PREFIX_STRICT;
        }
        return context.option.forwardDate ? PATTERN_WITH_OPTIONAL_PREFIX : PATTERN_WITH_PREFIX;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
