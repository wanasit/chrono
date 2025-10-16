import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { Meridiem } from "../../../types";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

/**
 * Persian time expression parser
 * Handles expressions like: ساعت ۹ (9 o'clock), ۱۴:۳۰ (14:30), ۹ صبح (9 AM)
 */
export default class FATimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string {
        return "(?:(?:در\\s*)?(?:ساعت|راس)\\s*)?";
    }

    primarySuffix(): string {
        return "(?:\\s*(?:صبح|بعدازظهر|بعد‌از‌ظهر|عصر|شب))?(?=\\W|$)";
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|تا|الی)?\\s*";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (!components) {
            return components;
        }

        // Handle Persian time of day suffixes
        const matchText = match[0].toLowerCase();
        const hour = components.get("hour");

        if (matchText.includes("صبح")) {
            // Morning (AM)
            components.assign("meridiem", Meridiem.AM);
            if (hour >= 0 && hour <= 11) {
                components.assign("hour", hour);
            }
        } else if (matchText.includes("بعدازظهر") || matchText.includes("بعد‌از‌ظهر")) {
            // Afternoon (PM)
            components.assign("meridiem", Meridiem.PM);
            if (hour >= 0 && hour <= 11) {
                components.assign("hour", hour + 12);
            }
        } else if (matchText.includes("عصر")) {
            // Evening (PM)
            components.assign("meridiem", Meridiem.PM);
            if (hour >= 0 && hour <= 11) {
                components.assign("hour", hour + 12);
            }
        } else if (matchText.includes("شب")) {
            // Night (PM)
            components.assign("meridiem", Meridiem.PM);
            if (hour >= 6 && hour < 12) {
                components.assign("hour", hour + 12);
            } else if (hour < 6) {
                components.assign("meridiem", Meridiem.AM);
            }
        }

        return components.addTag("parser/FATimeExpressionParser");
    }

    extractFollowingTimeComponents(
        context: ParsingContext,
        match: RegExpMatchArray,
        result: ParsingResult
    ): ParsingComponents | null {
        const followingComponents = super.extractFollowingTimeComponents(context, match, result);
        if (followingComponents) {
            followingComponents.addTag("parser/FATimeExpressionParser");
        }
        return followingComponents;
    }
}
