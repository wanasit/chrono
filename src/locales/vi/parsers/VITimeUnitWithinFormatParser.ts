import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// trong 2 ng\u00e0y  |  trong 3 tu\u1ea7n  |  trong v\u00f2ng 1 th\u00e1ng
const PATTERN = new RegExp("(?:trong\\s*(?:v\u00f2ng\\s*)?)" + "(" + TIME_UNITS_PATTERN + ")(?=\\W|$)", "i");
// VI has no unit abbreviations, so strict and casual patterns are identical.
// STRICT_PATTERN is kept for API consistency with other locales (e.g. EN).
const STRICT_PATTERN = PATTERN;

export default class VITimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode = false) {
        super();
    }
    innerPattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseDuration(match[1]);
        if (!timeUnits) return null;
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
