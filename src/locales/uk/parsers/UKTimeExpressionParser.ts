import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { Meridiem } from "../../../types";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { REGEX_PARTS } from "../constants";

export default class UKTimeExpressionParser extends AbstractTimeExpressionParser {
    constructor(strictMode) {
        super(strictMode);
    }

    patternFlags(): string {
        return REGEX_PARTS.flags;
    }

    primaryPatternLeftBoundary(): string {
        return `(^|\\s|T|(?:[^\\p{L}\\p{N}_]))`;
    }

    followingPhase(): string {
        return `\\s*(?:\\-|\\–|\\~|\\〜|до|і|по|\\?)\\s*`;
    }

    primaryPrefix(): string {
        return `(?:(?:в|у|о|об|з|із|від)\\s*)??`;
    }

    primarySuffix(): string {
        return `(?:\\s*(?:ранку|вечора|по обіді|після обіду))?(?!\\/)${REGEX_PARTS.rightBoundary}`;
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
            if (match[0].endsWith("вечора")) {
                const hour = components.get("hour");
                if (hour >= 6 && hour < 12) {
                    components.assign("hour", components.get("hour") + 12);
                    components.assign("meridiem", Meridiem.PM);
                } else if (hour < 6) {
                    components.assign("meridiem", Meridiem.AM);
                }
            }

            if (match[0].endsWith("по обіді") || match[0].endsWith("після обіду")) {
                components.assign("meridiem", Meridiem.PM);
                const hour = components.get("hour");
                if (hour >= 0 && hour <= 6) {
                    components.assign("hour", components.get("hour") + 12);
                }
            }

            if (match[0].endsWith("ранку")) {
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
