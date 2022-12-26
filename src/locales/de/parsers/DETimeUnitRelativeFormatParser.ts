import { ParsingContext } from "../../../chrono";
import { NUMBER_PATTERN, parseNumberPattern, TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";
import { matchAnyPattern } from "../../../utils/pattern";

export default class DETimeUnitRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor() {
        super();
    }

    innerPattern(): RegExp {
        return new RegExp(
            `(?:((?:(?:über)(?:über)nächste|kommende|folgende|(?:vor)?(?:vor)?letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?|vor|in|nach|ab\\sjetzt(?:\\sin)?)\\s*)?` +
                `(${NUMBER_PATTERN})?` +
                `(?:\\s*(nächste|kommende|folgende|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?)?` +
                `\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)}\\b)` +
                `(?:\\s*(früher|frueher|vorher|davor|zuvor|später|spaeter|danach|nachher|ab\\sjetzt))?`,
            "i"
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        // Modifier
        let modifier = match[1] || match[3] || match[5] || "";
        modifier = modifier.toLowerCase();
        if (!modifier) {
            return;
        }

        let num = match[2] ? parseNumberPattern(match[2]) : 1;
        if (/vorvorletzte/.test(modifier) || /überübernächste/.test(modifier)) {
            num += 2;
        } else if (/vorletzte/.test(modifier) || /übernächste/.test(modifier)) {
            num += 1;
        }

        const unit = TIME_UNIT_DICTIONARY[match[4].toLowerCase()];
        let timeUnits = {};
        timeUnits[unit] = num;

        if (
            /vor/.test(modifier) ||
            /letzte/.test(modifier) ||
            /vergangen/.test(modifier) ||
            /fr(?:ü|ue)her/.test(modifier)
        ) {
            timeUnits = reverseTimeUnits(timeUnits);
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
