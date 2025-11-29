import { TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { matchAnyPattern } from "../../../utils/pattern";

// Italian uses "il mese prossimo" (article + noun + modifier) more commonly than "il prossimo mese"
const PATTERN = new RegExp(
    "(?:" +
        // Pattern 1: "il prossimo mese" / "la prossima settimana" (modifier before noun)
        `(?:il\\s*|la\\s*|l'\\s*)?(questo|questa|quest'|scorso|scorsa|prossimo|prossima|dopo\\s*questo|dopo\\s*questa)\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)})` +
        "|" +
        // Pattern 2: "il mese prossimo" / "la settimana scorsa" (modifier after noun)
        `(?:il\\s*|la\\s*|l'\\s*)(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s*(scorso|scorsa|prossimo|prossima)` +
        ")(?=\\W|$)",
    "i"
);

// Pattern 1 groups
const MODIFIER_WORD_GROUP_1 = 1;
const RELATIVE_WORD_GROUP_1 = 2;
// Pattern 2 groups
const RELATIVE_WORD_GROUP_2 = 3;
const MODIFIER_WORD_GROUP_2 = 4;

export default class ITRelativeDateFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        // Determine which pattern matched
        let modifier: string;
        let unitWord: string;

        if (match[MODIFIER_WORD_GROUP_1]) {
            // Pattern 1: "il prossimo mese"
            modifier = match[MODIFIER_WORD_GROUP_1].toLowerCase();
            unitWord = match[RELATIVE_WORD_GROUP_1].toLowerCase();
        } else {
            // Pattern 2: "il mese prossimo"
            modifier = match[MODIFIER_WORD_GROUP_2].toLowerCase();
            unitWord = match[RELATIVE_WORD_GROUP_2].toLowerCase();
        }

        const timeunit = TIME_UNIT_DICTIONARY[unitWord];

        if (modifier == "prossimo" || modifier == "prossima" || modifier.startsWith("dopo")) {
            const timeUnits = {};
            timeUnits[timeunit] = 1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        if (modifier == "scorso" || modifier == "scorsa") {
            const timeUnits = {};
            timeUnits[timeunit] = -1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        const components = context.createParsingComponents();
        let date = new Date(context.reference.instant.getTime());

        // Questa settimana
        if (unitWord.match(/settimana/i)) {
            date.setDate(date.getDate() - date.getDay());
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.imply("year", date.getFullYear());
        }

        // Questo mese
        else if (unitWord.match(/mese/i)) {
            date.setDate(1);
            components.imply("day", date.getDate());
            components.assign("year", date.getFullYear());
            components.assign("month", date.getMonth() + 1);
        }

        // Quest'anno
        else if (unitWord.match(/anno/i)) {
            date.setDate(1);
            date.setMonth(0);
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.assign("year", date.getFullYear());
        }

        return components;
    }
}
