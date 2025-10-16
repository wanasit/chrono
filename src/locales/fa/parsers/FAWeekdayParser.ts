import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays";

/**
 * Persian weekday parser
 * Handles expressions like: یکشنبه (Sunday), دوشنبه گذشته (last Monday), جمعه آینده (next Friday)
 */
const PATTERN = new RegExp(
    "(?:(?:،|\\(|\\（)\\s*)?" +
        "(?:در\\s*)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s*(?:،|\\)|\\）))?" +
        "(?:\\s*(گذشته|پیش|قبل|آینده|بعد|این))?" +
        "(?=\\W|$)",
    "i"
);

const WEEKDAY_GROUP = 1;
const MODIFIER_GROUP = 2;

export default class FAWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const modifierWord = match[MODIFIER_GROUP];
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
