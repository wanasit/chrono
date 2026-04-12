import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

// tu\u1ea7n n\u00e0y  |  th\u00e1ng tr\u01b0\u1edbc  |  n\u0103m sau  |  tu\u1ea7n t\u1edbi
const PATTERN = new RegExp(
    "(n\u00e0y|n\u00e0y|tr\u01b0\u1edbc|qua|sau|t\u1edbi|ti\u1ebfp)\\s*(" + TIME_UNITS_PATTERN + ")" +
    "|(" + TIME_UNITS_PATTERN + ")\\s*(n\u00e0y|tr\u01b0\u1edbc|qua|sau|t\u1edbi|ti\u1ebfp)" +
    "(?=\\W|$)",
    "i"
);

export default class VITimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp { return PATTERN; }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        // prefix form (tr\u01b0\u1edbc tu\u1ea7n) or suffix form (tu\u1ea7n tr\u01b0\u1edbc)
        const modifier = (match[1] || match[5] || "").toLowerCase();
        const unitText = match[2] || match[3] || "";
        let duration = parseDuration(unitText);
        if (!duration) return null;

        if (modifier === "tr\u01b0\u1edbc" || modifier === "qua") {
            duration = reverseDuration(duration);
        }
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
