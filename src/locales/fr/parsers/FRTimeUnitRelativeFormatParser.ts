import { ParsingContext } from "../../../chrono";
import { NUMBER_PATTERN, parseNumberPattern, TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";
import { matchAnyPattern } from "../../../utils/pattern";

export default class FRTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor() {
        super();
    }

    innerPattern(): RegExp {
        return new RegExp(
            `(?:les?|la|l'|du|des?)\\s*` +
                `(${NUMBER_PATTERN})?` +
                `(?:\\s*(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?))?` +
                `\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)})` +
                `(?:\\s*(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?))?`,
            "i"
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const num = match[1] ? parseNumberPattern(match[1]) : 1;
        const unit = TIME_UNIT_DICTIONARY[match[3].toLowerCase()];
        let timeUnits = {};
        timeUnits[unit] = num;

        // Modifier
        let modifier = match[2] || match[4] || "";
        modifier = modifier.toLowerCase();
        if (!modifier) {
            return;
        }

        if (/derni[eè]re?s?/.test(modifier) || /pass[ée]e?s?/.test(modifier) || /pr[ée]c[ée]dents?/.test(modifier)) {
            timeUnits = reverseTimeUnits(timeUnits);
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
