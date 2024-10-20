import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { createParsingComponentsAtWeekday } from "../../../common/calculation/weekdays";
import { Weekday } from "../../../types";

const PATTERN = new RegExp(
    "(?:(?:\\,|\\(|\\（)\\s*)?" +
        "(?:on\\s*?)?" +
        "(?:(this|last|past|next)\\s*)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)}|weekend|weekday)` +
        "(?:\\s*(?:\\,|\\)|\\）))?" +
        "(?:\\s*(this|last|past|next)\\s*week)?" +
        "(?=\\W|$)",
    "i"
);

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_GROUP = 3;

export default class ENWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let modifierWord = prefix || postfix;
        modifierWord = modifierWord || "";
        modifierWord = modifierWord.toLowerCase();

        let modifier = null;
        if (modifierWord == "last" || modifierWord == "past") {
            modifier = "last";
        } else if (modifierWord == "next") {
            modifier = "next";
        } else if (modifierWord == "this") {
            modifier = "this";
        }

        const weekday_word = match[WEEKDAY_GROUP].toLowerCase();
        let weekday;
        if (WEEKDAY_DICTIONARY[weekday_word] !== undefined) {
            weekday = WEEKDAY_DICTIONARY[weekday_word];
        } else if (weekday_word == "weekend") {
            // This depends on what days are weekend setting, but typically:
            // 'This/next weekend' means the coming Saturday, 'last weekend' means last Sunday.
            weekday = modifier == "last" ? Weekday.SUNDAY : Weekday.SATURDAY;
        } else if (weekday_word == "weekday") {
            // In English, the "weekday" means any day of the week except weekend.
            // This also depends on what days are weekend setting, but typically:
            // - On weekend ref, this means the coming Monday or last Friday.
            // - On weekday ref, this means the next/last working day.
            const refWeekday = context.reference.getDateWithAdjustedTimezone().getDay();
            if (refWeekday == Weekday.SUNDAY || refWeekday == Weekday.SATURDAY) {
                weekday = modifier == "last" ? Weekday.FRIDAY : Weekday.MONDAY;
            } else {
                weekday = refWeekday - 1;
                weekday = modifier == "last" ? weekday - 1 : weekday + 1;
                weekday = (weekday % 5) + 1;
            }
        } else {
            return null;
        }

        return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
    }
}
