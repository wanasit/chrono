import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// 2 ng\u00e0y sau  |  3 tu\u1ea7n n\u1eefa  |  1 th\u00e1ng t\u1edbi
const PATTERN = new RegExp(
    "(" + TIME_UNITS_PATTERN + ")" +
    "\\s{0,5}(?:sau|n\u1eefa|t\u1edbi|ti\u1ebfp)(?=\\W|$)",
    "i"
);

export default class VITimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode = false) { super(); }
    innerPattern(): RegExp { return PATTERN; }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const duration = parseDuration(match[1]);
        if (!duration) return null;
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
