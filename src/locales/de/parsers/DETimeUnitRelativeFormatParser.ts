import { ParsingContext } from "../../../chrono";
import { NUMBER_PATTERN, parseNumberPattern, TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { matchAnyPattern } from "../../../utils/pattern";
import { Duration, reverseDuration } from "../../../calculation/duration";

/**
 * Relative DE time units, e.g.:
 * - "vor 3 Tagen", "in 2 Wochen"
 * - "letzte Woche", "vorletzte Woche", "übernächste Woche"
 * - "15 Minuten früher", "10 Minuten später"
 *
 * Revives and updates https://github.com/wanasit/chrono/pull/442 on current APIs
 * (reverseDuration instead of reverseTimeUnits).
 */
export default class DETimeUnitRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return new RegExp(
            `(?:((?:überübernächste|übernächste|nächste|kommende|folgende|vorvorletzte|vorletzte|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?|vor|in|nach|ab\\sjetzt(?:\\sin)?)\\s*)?` +
                `(${NUMBER_PATTERN})?` +
                `(?:\\s*(nächste|kommende|folgende|letzte|vergangene|vorige|vor(?:her|an)gegangene)(?:s|n|m|r)?)?` +
                `\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)})` +
                `(?:\\s*(früher|frueher|vorher|davor|zuvor|später|spaeter|danach|nachher|ab\\sjetzt))?` +
                `(?=\\W|$)`,
            "i"
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
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
        let timeUnits: Duration = {};
        timeUnits[unit] = num;

        if (
            /vor/.test(modifier) ||
            /letzte/.test(modifier) ||
            /vergangen/.test(modifier) ||
            /fr(?:ü|ue)her/.test(modifier) ||
            /davor|zuvor|vorher/.test(modifier)
        ) {
            timeUnits = reverseDuration(timeUnits);
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
