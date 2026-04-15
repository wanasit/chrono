import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays";

const PATTERN = new RegExp(
    "(" + matchAnyPattern(WEEKDAY_DICTIONARY) + ")" +
        // 'sau khi' is a conjunction ("after when") — exclude via negative lookahead
        "(?:\\s*(này|tới|sau(?!\\s*khi)|qua))?" +
        "(?=\\W|$)",
    "i"
);

const WEEKDAY_GROUP = 1;
const MODIFIER_GROUP = 2;

export default class VIWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dowText = match[WEEKDAY_GROUP].toLowerCase();
        const dow = WEEKDAY_DICTIONARY[dowText];
        if (dow === undefined) return null;

        const modifier = match[MODIFIER_GROUP];
        let modifierType: "this" | "next" | "last" | null = null;
        if (modifier) {
            const m = modifier.toLowerCase();
            if (m.includes("tới") || m.includes("sau")) modifierType = "next";
            else if (m.includes("qua")) modifierType = "last";
        }

        return createParsingComponentsAtWeekday(context.reference, dow, modifierType);
    }
}
