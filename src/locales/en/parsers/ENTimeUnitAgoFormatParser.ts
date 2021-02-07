import { ParsingContext } from "../../../chrono";
import { FULL_TIME_UNITS_PATTERN, parseTimeUnits, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

function createRegExp(pattern: string): RegExp {
    return new RegExp("" + "(" + pattern + ")" + "(?:ago|before|earlier)(?=(?:\\W|$))", "i");
}

const PATTERN = createRegExp(TIME_UNITS_PATTERN);
const FULL_PATTERN = createRegExp(FULL_TIME_UNITS_PATTERN);

const STRICT_PATTERN = new RegExp("" + "(" + TIME_UNITS_PATTERN + ")" + "ago(?=(?:\\W|$))", "i");

export default class ENTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(context: ParsingContext): RegExp {
        return this.strictMode ? STRICT_PATTERN : 
            context.option.useShorts ? FULL_PATTERN  : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const timeUnits = parseTimeUnits(match[1], context.option.useShorts);
        const outputTimeUnits = reverseTimeUnits(timeUnits);

        return ParsingComponents.createRelativeFromRefDate(context.refDate, outputTimeUnits);
    }
}
