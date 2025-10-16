import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ReferenceWithTimezone } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

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

        // Use custom Persian weekday calculation for better accuracy
        return this.createPersianWeekdayComponents(context.reference, weekday, modifier);
    }

    private createPersianWeekdayComponents(
        reference: ReferenceWithTimezone,
        weekday: number,
        modifier: "last" | "next" | "this" | null
    ): ParsingComponents {
        const refDate = reference.getDateWithAdjustedTimezone();
        const refWeekday = refDate.getDay();
        let daysToAdd = 0;

        if (modifier === "next") {
            // For "next", always go to the next occurrence of the weekday
            daysToAdd = weekday - refWeekday;
            if (daysToAdd <= 0) {
                daysToAdd += 7;
            }
        } else if (modifier === "last") {
            // For "last", always go to the previous occurrence of the weekday
            daysToAdd = weekday - refWeekday;
            if (daysToAdd >= 0) {
                daysToAdd -= 7;
            }
        } else if (modifier === "this") {
            // For "this", go to the weekday in the current week
            daysToAdd = weekday - refWeekday;
            if (daysToAdd < 0) {
                daysToAdd += 7;
            }
        } else {
            // No modifier - find the closest occurrence (prefer backward for past weekdays)
            daysToAdd = weekday - refWeekday;
            if (daysToAdd > 0) {
                // Future weekday - check if we should go forward or backward
                const daysBackward = daysToAdd - 7; // negative value
                if (Math.abs(daysBackward) <= daysToAdd) {
                    daysToAdd = daysBackward;
                }
            } else if (daysToAdd < 0) {
                // Past weekday - go forward to next week or keep this week based on proximity
                const daysForward = daysToAdd + 7;
                if (Math.abs(daysToAdd) > daysForward) {
                    daysToAdd = daysForward;
                }
            } else {
                // Same day - check time to decide
                const currentHour = refDate.getHours();
                if (currentHour >= 12) {
                    daysToAdd = 7; // Go to next week if after noon
                }
            }
        }

        const components = new ParsingComponents(reference);
        const targetDate = new Date(refDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

        components.assign("year", targetDate.getFullYear());
        components.assign("month", targetDate.getMonth() + 1);
        components.assign("day", targetDate.getDate());
        components.assign("weekday", weekday);

        return components;
    }
}
