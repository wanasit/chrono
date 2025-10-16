import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays";

/**
 * Persian weekday parser
 * Handles expressions like: یکشنبه (Sunday), دوشنبه گذشته (last Monday), جمعه آینده (next Friday), این شنبه (this Saturday)
 */
const PATTERN = new RegExp(
    "(?:(?:،|\\(|\\（)\\s*)?" +
        "(?:در\\s*)?" +
        "(?:(گذشته|پیش|قبل|آینده|بعد|این)\\s+)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s*(?:،|\\)|\\）))?" +
        "(?:\\s*(گذشته|پیش|قبل|آینده|بعد|این))?" +
        "(?=\\W|$)",
    "i"
);

const PREFIX_MODIFIER_GROUP = 1;
const WEEKDAY_GROUP = 2;
const SUFFIX_MODIFIER_GROUP = 3;

export default class FAWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        // Check both prefix and suffix modifier groups
        const modifierWord = match[PREFIX_MODIFIER_GROUP] || match[SUFFIX_MODIFIER_GROUP];
        let modifier: "last" | "next" | "this" | null = null;

        if (modifierWord) {
            const lowerModifier = modifierWord.toLowerCase();
            if (lowerModifier === "گذشته" || lowerModifier === "پیش" || lowerModifier === "قبل") {
                modifier = "last";
            } else if (lowerModifier === "آینده" || lowerModifier === "بعد") {
                modifier = "next";
            } else if (lowerModifier === "این") {
                modifier = "this";
            }
        }

        const weekdayWord = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = WEEKDAY_DICTIONARY[weekdayWord];

        if (weekday === undefined) {
            return null;
        }

        return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
    }
}
