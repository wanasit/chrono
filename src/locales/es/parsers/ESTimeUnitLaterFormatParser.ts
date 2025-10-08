import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(`(?:en|dentro de)\\s{0,5}(${TIME_UNITS_PATTERN})(?=(?:\\W|$))`, "i");

const STRICT_PATTERN = new RegExp(`(?:en|dentro de)\\s{0,5}(${TIME_UNITS_PATTERN})(?=(?:\\W|$))`, "i");

const GROUP_NUM_TIMEUNITS = 1;

export default class ESTimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const fragments = parseDuration(match[GROUP_NUM_TIMEUNITS]);
        if (!fragments) {
            return null;
        }
        return ParsingComponents.createRelativeFromReference(context.reference, fragments);
    }
}
