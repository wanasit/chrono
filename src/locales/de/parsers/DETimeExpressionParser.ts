import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { ParsingComponents } from "../../../results";
import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../index";

export default class DETimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string {
        return "(?:(?:um|von)\\s*)?";
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|bis)\\s*";
    }

    primarySuffix(): string {
        return "(?:\\s*uhr)?(?:\\s*(?:morgens|vormittags|nachmittags|abends|nachts))?(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
            if (match[0].endsWith("morgens") || match[0].endsWith("vormittags")) {
                components.assign("meridiem", Meridiem.AM);
                const hour = components.get("hour");
                if (hour < 12) {
                    components.assign("hour", components.get("hour"));
                }
            }

            if (match[0].endsWith("nachmittags") || match[0].endsWith("abends") || match[0].endsWith("nachts")) {
                components.assign("meridiem", Meridiem.PM);
                const hour = components.get("hour");
                if (hour < 12) {
                    components.assign("hour", components.get("hour") + 12);
                }
            }
        }

        return components;
    }
}
