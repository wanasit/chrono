import { Parser, ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { Meridiem } from "../../../index";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

export default class ENTimeExpressionParser extends AbstractTimeExpressionParser {
    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|to|\\?)\\s*";
    }

    primaryPrefix(): string {
        return "(?:(?:at|from)\\s*)??";
    }

    primarySuffix(): string {
        return "(?:\\s*(?:o\\W*clock|at\\s*night|in\\s*the\\s*(?:morning|afternoon)))?(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
            if (match[0].endsWith("night")) {
                const hour = components.get("hour");
                if (hour > 6 && hour < 12) {
                    components.assign("hour", components.get("hour") + 12);
                    components.assign("meridiem", Meridiem.PM);
                }
            }

            if (match[0].endsWith("afternoon")) {
                const hour = components.get("hour");
                if (hour >= 0 && hour <= 6) {
                    components.assign("hour", components.get("hour") + 12);
                    components.assign("meridiem", Meridiem.PM);
                }
            }

            if (match[0].endsWith("morning")) {
                const hour = components.get("hour");
                if (hour < 12) {
                    components.assign("hour", components.get("hour"));
                    components.assign("meridiem", Meridiem.AM);
                }
            }
        }

        return components;
    }
}
