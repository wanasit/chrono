import { ParsingContext } from "../../../chrono";
import { NUMBER_PATTERN, parseNumberPattern, TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";
import { matchAnyPattern } from "../../../utils/pattern";

export default class DETimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor() {
        super();
    }

    innerPattern(): RegExp {
        return new RegExp(
            `(?:\\s*((?:nächste|kommende|folgende|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?|vor|in)\\s*)?` +
                `(${NUMBER_PATTERN})?` +
                `(?:\\s*(nächste|kommende|folgende|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?)?` +
                `\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)})`,
            "i"
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const num = match[2] ? parseNumberPattern(match[2]) : 1;
        const unit = TIME_UNIT_DICTIONARY[match[4].toLowerCase()];
        let timeUnits = {};
        timeUnits[unit] = num;

        // Modifier
        let modifier = match[1] || match[3] || "";
        modifier = modifier.toLowerCase();
        if (!modifier) {
            return;
        }

        if (/vor/.test(modifier) || /letzte/.test(modifier) || /vergangen/.test(modifier)) {
            timeUnits = reverseTimeUnits(timeUnits);
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
