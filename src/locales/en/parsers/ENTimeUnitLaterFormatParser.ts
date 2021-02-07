import { ParsingContext } from "../../../chrono";
import { FULL_TIME_UNITS_PATTERN, parseTimeUnits, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = createRegExp(TIME_UNITS_PATTERN);
const FULL_PATTERN = createRegExp(FULL_TIME_UNITS_PATTERN);

function createRegExp(pattern: string) {
    return new RegExp(
        "" + "(" + pattern + ")" + "(later|after|from now|henceforth|forward|out)" + "(?=(?:\\W|$))",
        "i"
    );
}

const STRICT_PATTERN = new RegExp("" + "(" + TIME_UNITS_PATTERN + ")" + "(later|from now)" + "(?=(?:\\W|$))", "i");
const GROUP_NUM_TIMEUNITS = 1;

export default class ENTimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(context: ParsingContext): RegExp {
        return this.strictMode ? STRICT_PATTERN : 
            context.option.useShorts ? FULL_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const fragments = parseTimeUnits(match[GROUP_NUM_TIMEUNITS], context.option.useShorts);
        return ParsingComponents.createRelativeFromRefDate(context.refDate, fragments);
    }
}
