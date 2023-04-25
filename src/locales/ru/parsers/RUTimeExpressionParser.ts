import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { Meridiem } from "../../../types";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { REGEX_PARTS } from "../constants";

export default class RUTimeExpressionParser extends AbstractTimeExpressionParser {
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
        return `\\s*(?:\\-|\\–|\\~|\\〜|до|и|по|\\?)\\s*`;
    }

    primaryPrefix(): string {
        return `(?:(?:в|с)\\s*)??`;
    }

    primarySuffix(): string {
        return `(?:\\s*(?:утра|вечера|после полудня))?(?!\\/)${REGEX_PARTS.rightBoundary}`;
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
            if (match[0].endsWith("вечера")) {
                const hour = components.get("hour");
                if (hour >= 6 && hour < 12) {
                    components.assign("hour", components.get("hour") + 12);
                    components.assign("meridiem", Meridiem.PM);
                } else if (hour < 6) {
                    components.assign("meridiem", Meridiem.AM);
                }
            }

            if (match[0].endsWith("после полудня")) {
                components.assign("meridiem", Meridiem.PM);
                const hour = components.get("hour");
                if (hour >= 0 && hour <= 6) {
                    components.assign("hour", components.get("hour") + 12);
                }
            }

            if (match[0].endsWith("утра")) {
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
