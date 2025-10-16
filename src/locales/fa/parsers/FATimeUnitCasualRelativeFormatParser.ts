import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

/**
 * Persian Time Unit Casual Relative Format Parser
 * Handles expressions with explicit time units like:
 * - دو روز گذشته (two days ago - last two days)
 * - سه هفته آینده (three weeks next - next three weeks)
 * - یک ماه پیش (one month ago)
 */
const PATTERN = new RegExp(
    `(این|گذشته|قبل|پیش|آینده|بعد)\\s*(${TIME_UNITS_PATTERN})` +
        `|` +
        `(${TIME_UNITS_PATTERN})\\s*(این|گذشته|قبل|پیش|آینده|بعد)` +
        `(?=\\W|$)`,
    "i"
);

export default class FATimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        // Determine if modifier is prefix or suffix
        const isPrefixModifier = match[1] !== undefined;
        const modifier = (isPrefixModifier ? match[1] : match[4]).toLowerCase();
        const timeUnitsText = isPrefixModifier ? match[2] : match[3];

        let duration = parseDuration(timeUnitsText);
        if (!duration) {
            return null;
        }

        // Handle "last" modifiers: گذشته, قبل, پیش
        if (modifier === "گذشته" || modifier === "قبل" || modifier === "پیش") {
            duration = reverseDuration(duration);
        }
        // For "next" modifiers (آینده, بعد) and "this" (این), keep duration as is

        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
