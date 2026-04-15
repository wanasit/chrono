import { TIME_UNIT_DICTIONARY, NUMBER_PATTERN, parseDuration } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";
import { matchAnyPattern } from "../../../utils/pattern";

// tuần này  |  tháng trước  |  năm sau  |  tuần tới  |  2 tuần trước
// NUMBER is optional so bare unit words ("tuần này") are matched
const CASUAL_UNIT_PATTERN = "(?:" + NUMBER_PATTERN + "\\s{0,5})?(?:" + matchAnyPattern(TIME_UNIT_DICTIONARY) + ")";

const PATTERN = new RegExp(
    "(này|trước|qua|sau|tới|tiếp)\\s*(" +
        CASUAL_UNIT_PATTERN +
        ")" +
        "|(" +
        CASUAL_UNIT_PATTERN +
        ")\\s*(này|trước|qua|sau|tới|tiếp)" +
        "(?=\\W|$)",
    "i"
);

export default class VITimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        // prefix form (trước tuần) or suffix form (tuần trước)
        const modifier = (match[1] || match[4] || "").toLowerCase();
        const unitText = (match[2] || match[3] || "").toLowerCase();

        let duration = parseDuration(unitText);
        if (Object.keys(duration).length === 0) {
            // bare unit word with no number — implies 1
            const unit = TIME_UNIT_DICTIONARY[unitText];
            if (!unit) return null;
            duration = { [unit]: 1 };
        }

        if (modifier === "trước" || modifier === "qua") {
            duration = reverseDuration(duration);
        }
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
