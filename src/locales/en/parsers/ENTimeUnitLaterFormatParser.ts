import { ParsingContext } from "../../../chrono";
import { parseTimeUnits, TIME_UNITS_NO_ABBR_PATTERN, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    `(${TIME_UNITS_PATTERN})\\s{0,5}(?:later|after|from now|henceforth|forward|out)` + "(?=(?:\\W|$))",
    "i"
);

const STRICT_PATTERN = new RegExp(
    "" + "(" + TIME_UNITS_NO_ABBR_PATTERN + ")" + "(later|from now)" + "(?=(?:\\W|$))",
    "i"
);
const GROUP_NUM_TIMEUNITS = 1;

export default class ENTimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const fragments = parseTimeUnits(match[GROUP_NUM_TIMEUNITS]);
        return ParsingComponents.createRelativeFromReference(context.reference, fragments);
    }
}
