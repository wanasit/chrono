import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { ParsingComponents } from "../../../results";
import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../types";

// Captured by primarySuffix(), after the groups of AbstractTimeExpressionParser's primary pattern
const DAY_PERIOD_GROUP = 7;

/**
 * Indonesian time expressions
 * - pukul 10.30
 * - jam 7 malam
 * - pkl. 08.00 WIB
 * - 13:00 - 15:00
 */
export default class IDTimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string {
        return "(?:(?:pada\\s+)?(?:pukul|pkl\\.?|jam)\\s*)?";
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|s\\.d\\.?|s/d|sampai(?:\\s+dengan)?|hingga)\\s*(?:(?:pukul|pkl\\.?|jam)\\s*)?";
    }

    primarySuffix(): string {
        return "(?:\\s*(pagi|siang|sore|petang|malam))?(?!/)(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        // This looks more like a year e.g. 2020
        if (match[0].match(/^\s*\d{4}\s*$/)) {
            return null;
        }

        const components = super.extractPrimaryTimeComponents(context, match);
        if (!components || !match[DAY_PERIOD_GROUP] || components.isCertain("meridiem")) {
            return components;
        }

        let hour = components.get("hour");
        if (hour > 12) {
            return components;
        }

        switch (match[DAY_PERIOD_GROUP].toLowerCase()) {
            case "pagi":
                // "jam 12 pagi" is midnight
                if (hour == 12) hour = 0;
                break;
            case "siang":
                // "jam 11 siang" is still before noon, "jam 1 siang" is 13:00
                if (hour < 10) hour += 12;
                break;
            case "sore":
            case "petang":
                if (hour < 12) hour += 12;
                break;
            case "malam":
                // "jam 12 malam" is midnight, "jam 2 malam" is late at night
                if (hour == 12) hour = 0;
                else if (hour >= 5) hour += 12;
                break;
        }

        components.assign("hour", hour);
        components.assign("meridiem", hour >= 12 ? Meridiem.PM : Meridiem.AM);
        return components;
    }
}
