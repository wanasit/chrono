import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { Meridiem } from "../../../index";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

export default class ENTimeExpressionParser extends AbstractTimeExpressionParser {
    constructor(strictMode) {
        super(strictMode);
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|to|until|through|till|\\?)\\s*";
    }

    primaryPrefix(): string {
        return "(?:(?:at|from)\\s*)??";
    }

    primarySuffix(): string {
        return "(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?!/)(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
            if (match[0].endsWith("night")) {
                const hour = components.get("hour");
                if (hour >= 6 && hour < 12) {
                    components.assign("hour", components.get("hour") + 12);
                    components.assign("meridiem", Meridiem.PM);
                } else if (hour < 6) {
                    components.assign("meridiem", Meridiem.AM);
                }
            }

            if (match[0].endsWith("afternoon")) {
                components.assign("meridiem", Meridiem.PM);
                const hour = components.get("hour");
                if (hour >= 0 && hour <= 6) {
                    components.assign("hour", components.get("hour") + 12);
                }
            }

            if (match[0].endsWith("morning")) {
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
