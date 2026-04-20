import { TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { matchAnyPattern } from "../../../utils/pattern";

// Pattern for "la semana pasada" (unit + modifier), "la próxima semana" (modifier + unit), "esta semana"
const PATTERN = new RegExp(
    // Pattern 1: unit + modifier (pasado/pasada)
    `(?:(?:el|la)\\s+)?(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s+(pasado|pasada)(?=\\W|$)|` +
        // Pattern 2: modifier + unit (próximo/último/este/esta)
        `(?:(?:el|la)\\s+)?(próximo|proxima|próxima|siguiente|último|ultima|este|esta)\\s+(${matchAnyPattern(TIME_UNIT_DICTIONARY)})(?=\\W|$)`,
    "i"
);

const UNIT_GROUP_1 = 1;
const MODIFIER_GROUP_1 = 2;
const MODIFIER_GROUP_2 = 3;
const UNIT_GROUP_2 = 4;

export default class ESRelativeDateFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        let modifier: string;
        let unitWord: string;

        if (match[UNIT_GROUP_2]) {
            // Pattern 2: modifier + unit ("la próxima semana", "este mes")
            modifier = match[MODIFIER_GROUP_2];
            unitWord = match[UNIT_GROUP_2];
        } else {
            // Pattern 1: unit + modifier ("la semana pasada", "el último mes")
            unitWord = match[UNIT_GROUP_1];
            modifier = match[MODIFIER_GROUP_1];
        }

        modifier = modifier.toLowerCase();
        unitWord = unitWord.toLowerCase();
        const timeunit = TIME_UNIT_DICTIONARY[unitWord];

        if (modifier == "próximo" || modifier == "proxima" || modifier == "próxima" || modifier == "siguiente") {
            const timeUnits = {};
            timeUnits[timeunit] = 1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        if (modifier == "pasado" || modifier == "pasada" || modifier == "último" || modifier == "ultima") {
            const timeUnits = {};
            timeUnits[timeunit] = -1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        const components = context.createParsingComponents();
        let date = new Date(context.reference.instant.getTime());

        // Esta semana
        if (unitWord.match(/semana/i)) {
            date.setDate(date.getDate() - date.getDay());
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.imply("year", date.getFullYear());
        }

        // Este mes
        else if (unitWord.match(/mes/i)) {
            date.setDate(1);
            components.imply("day", date.getDate());
            components.assign("year", date.getFullYear());
            components.assign("month", date.getMonth() + 1);
        }

        // Este año
        else if (unitWord.match(/año/i)) {
            date.setDate(1);
            date.setMonth(0);
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.assign("year", date.getFullYear());
        }

        return components;
    }
}
