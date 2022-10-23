import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { Meridiem } from "../../../index";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

export default class ITTimeExpressionParser extends AbstractTimeExpressionParser {
    constructor(strictMode) {
        super(strictMode);
    }

    followingPhase(): string {
        return "\\s{0,3}(?:\\-|\\–|e\\s*le|\\w*?ino\\s*alle|\\s*)?\\s{0,3}";
    }

    primaryPrefix(): string {
        return "(?:(?:dalle|alle)\\s{0,3})??";
    }

    primarySuffix(): string {
        return "(?:\\s*(?:in\\s*punto|di\\s*sera|del\\w*\\s*mattin\\w*?|del\\s*pomeriggio|della\\s*sera|della\\s*notte))?(?!/)(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
            if (match[0].endsWith("mattina")) {
                components.assign("meridiem", Meridiem.AM);
                const hour = components.get("hour");
                if (hour >= 4 && hour < 12) {
                    components.assign("hour", components.get("hour"));
                }
            }

            if (match[0].endsWith("pomeriggio")) {
                components.assign("meridiem", Meridiem.PM);
                const hour = components.get("hour");
                if (hour >= 0 && hour <= 6) {
                    components.assign("hour", components.get("hour") + 12);
                }
            }

            if (match[0].endsWith("sera")) {
                components.assign("meridiem", Meridiem.PM);
                const hour = components.get("hour");
                if (hour >= 6 && hour < 12) {
                    components.assign("hour", components.get("hour") + 12);
                }
            }

            if (match[0].endsWith("notte")) {
                const hour = components.get("hour");
                if (hour >= 12) {
                    components.assign("hour", components.get("hour") + 12);
                    components.assign("meridiem", Meridiem.PM);
                } else if (hour < 4) {
                    components.assign("meridiem", Meridiem.AM);
                }
            }

        }

        return components;
    }
}
