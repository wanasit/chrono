import { TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { matchAnyPattern } from "../../../utils/pattern";

/**
 * Persian Relative Date Format Parser
 * Handles expressions like:
 * - این هفته (this week)
 * - ماه گذشته (last month)
 * - سال آینده (next year)
 * - هفته پیش (last week)
 * - ساعت بعد (next hour)
 */
const PATTERN = new RegExp(
    `(این|گذشته|قبل|پیش|آینده)\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)})` +
        `|` +
        `(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s*(این|گذشته|قبل|پیش|آینده|بعد)` +
        `(?=\\W|$)`,
    "i"
);

const PREFIX_GROUP = 1;
const SUFFIX_GROUP = 4;

export default class FARelativeDateFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        // Determine modifier and unit word
        let modifier = match[PREFIX_GROUP] || match[SUFFIX_GROUP];
        let unitWord: string;

        if (match[PREFIX_GROUP]) {
            unitWord = match[2];
        } else {
            unitWord = match[3];
        }

        modifier = modifier.toLowerCase();
        unitWord = unitWord.toLowerCase();
        const timeunit = TIME_UNIT_DICTIONARY[unitWord];

        if (!timeunit) {
            return null;
        }

        // Handle "next" modifiers: آینده, بعد
        if (modifier === "آینده" || modifier === "بعد") {
            const timeUnits = {};
            timeUnits[timeunit] = 1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        // Handle "last" modifiers: گذشته, قبل, پیش
        if (modifier === "گذشته" || modifier === "قبل" || modifier === "پیش") {
            const timeUnits = {};
            timeUnits[timeunit] = -1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        // Handle "this" modifier: این
        if (modifier === "این") {
            const components = context.createParsingComponents();
            const date = context.reference.getDateWithAdjustedTimezone();

            // این هفته (this week) - start of current week
            if (timeunit === "week") {
                date.setDate(date.getDate() - date.getDay());
                components.imply("day", date.getDate());
                components.imply("month", date.getMonth() + 1);
                components.imply("year", date.getFullYear());
            }
            // این ماه (this month) - start of current month
            else if (timeunit === "month") {
                date.setDate(1);
                components.imply("day", date.getDate());
                components.assign("year", date.getFullYear());
                components.assign("month", date.getMonth() + 1);
            }
            // این سال (this year) - start of current year
            else if (timeunit === "year") {
                date.setDate(1);
                date.setMonth(0);
                components.imply("day", date.getDate());
                components.imply("month", date.getMonth() + 1);
                components.assign("year", date.getFullYear());
            }
            // این روز (today) - same as the current date
            else if (timeunit === "day") {
                components.imply("day", date.getDate());
                components.imply("month", date.getMonth() + 1);
                components.imply("year", date.getFullYear());
            }
            // این ساعت (this hour)
            else if (timeunit === "hour") {
                components.imply("day", date.getDate());
                components.imply("month", date.getMonth() + 1);
                components.imply("year", date.getFullYear());
                components.imply("hour", date.getHours());
            }

            return components;
        }

        return null;
    }
}
