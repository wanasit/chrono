import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { Meridiem } from "../../../index";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

export default class ENTimeExpressionParser extends AbstractTimeExpressionParser {
    constructor(strictMode) {
        super(strictMode);
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|to|\\?)\\s*";
    }

    primaryPrefix(): string {
        return "(?:(?:alle|dalle)\\s*)??";
    }

    primarySuffix(): string {
        return "(?:\\s*(?:o\\W*in punto|alle\\s*sera|in\\s*del\\s*(?:mattina|pomeriggio)))?(?!/)(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
            if (match[0].endsWith("sera")) {
                const hour = components.get("hour");
                if (hour >= 6 && hour < 12) {
                    components.assign("hour", components.get("hour") + 12);
                    components.assign("meridiem", Meridiem.PM);
                } else if (hour < 6) {
                    components.assign("meridiem", Meridiem.AM);
                }
            }

            if (match[0].endsWith("pomeriggio")) {
                components.assign("meridiem", Meridiem.PM);
                const hour = components.get("hour");
                if (hour >= 0 && hour <= 6) {
                    components.assign("hour", components.get("hour") + 12);
                }
            }

            if (match[0].endsWith("mattina")) {
                components.assign("meridiem", Meridiem.AM);
                const hour = components.get("hour");
                if (hour < 12) {
                    components.assign("hour", components.get("hour"));
                }
            }
        }

        return components;
    }
}
