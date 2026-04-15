import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

// 2 ng\u00e0y tr\u01b0\u1edbc  |  3 th\u00e1ng qua  |  1 n\u0103m tr\u01b0\u1edbc
const PATTERN = new RegExp("(" + TIME_UNITS_PATTERN + ")" + "\\s{0,5}(?:tr\u01b0\u1edbc|qua)(?=\\W|$)", "i");
export default class VITimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode = false) {
        super();
    }
    innerPattern(): RegExp {
        // VI has no unit abbreviations, so strict and casual patterns are identical.
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const duration = parseDuration(match[1]);
        if (!duration) return null;
        return ParsingComponents.createRelativeFromReference(context.reference, reverseDuration(duration));
    }
}
