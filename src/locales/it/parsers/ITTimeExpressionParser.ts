import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { Meridiem } from "../../../types";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

export default class ITTimeExpressionParser extends AbstractTimeExpressionParser {
    constructor(strictMode) {
        super(strictMode);
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|a|fino\\s*a|alle?|\\?)\\s*";
    }

    primaryPrefix(): string {
        return "(?:(?:alle?|dalle?)\\s*)??";
    }

    primarySuffix(): string {
        return "(?:\\s*(?:di\\s*(?:sera|notte|mattina|pomeriggio)))?(?!/)(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (!components) {
            return components;
        }

        if (match[0].match(/di\s*(?:sera|notte)/i)) {
            const hour = components.get("hour");
            if (hour >= 6 && hour < 12) {
                components.assign("hour", components.get("hour") + 12);
                components.assign("meridiem", Meridiem.PM);
            } else if (hour < 6) {
                components.assign("meridiem", Meridiem.AM);
            }
        }

        if (match[0].match(/di\s*pomeriggio/i)) {
            components.assign("meridiem", Meridiem.PM);
            const hour = components.get("hour");
            if (hour >= 0 && hour <= 6) {
                components.assign("hour", components.get("hour") + 12);
            }
        }

        if (match[0].match(/di\s*mattina/i)) {
            components.assign("meridiem", Meridiem.AM);
            const hour = components.get("hour");
            if (hour < 12) {
                components.assign("hour", components.get("hour"));
            }
        }

        return components.addTag("parser/ITTimeExpressionParser");
    }

    extractFollowingTimeComponents(
        context: ParsingContext,
        match: RegExpMatchArray,
        result: ParsingResult
    ): ParsingComponents | null {
        const followingComponents = super.extractFollowingTimeComponents(context, match, result);
        if (followingComponents) {
            followingComponents.addTag("parser/ITTimeExpressionParser");
        }
        return followingComponents;
    }
}
