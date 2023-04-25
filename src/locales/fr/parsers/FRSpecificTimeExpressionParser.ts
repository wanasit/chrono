import { Parser, ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { Meridiem } from "../../../types";

/**
 * 8h10m00s
 * 8h10m00
 * 8h10
 */
const FIRST_REG_PATTERN = new RegExp(
    "(^|\\s|T)" +
        "(?:(?:[àa])\\s*)?" +
        "(\\d{1,2})(?:h|:)?" +
        "(?:(\\d{1,2})(?:m|:)?)?" +
        "(?:(\\d{1,2})(?:s|:)?)?" +
        "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
        "(?=\\W|$)",
    "i"
);

const SECOND_REG_PATTERN = new RegExp(
    "^\\s*(\\-|\\–|\\~|\\〜|[àa]|\\?)\\s*" +
        "(\\d{1,2})(?:h|:)?" +
        "(?:(\\d{1,2})(?:m|:)?)?" +
        "(?:(\\d{1,2})(?:s|:)?)?" +
        "(?:\\s*(A\\.M\\.|P\\.M\\.|AM?|PM?))?" +
        "(?=\\W|$)",
    "i"
);

const HOUR_GROUP = 2;
const MINUTE_GROUP = 3;
const SECOND_GROUP = 4;
const AM_PM_HOUR_GROUP = 5;

export default class FRSpecificTimeExpressionParser implements Parser {
    pattern(context): RegExp {
        return FIRST_REG_PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult | null {
        const result = context.createParsingResult(match.index + match[1].length, match[0].substring(match[1].length));

        // This looks more like a year e.g. 2020
        if (result.text.match(/^\d{4}$/)) {
            match.index += match[0].length;
            return null;
        }

        result.start = FRSpecificTimeExpressionParser.extractTimeComponent(result.start.clone(), match);
        if (!result.start) {
            match.index += match[0].length;
            return null;
        }

        const remainingText = context.text.substring(match.index + match[0].length);
        const secondMatch = SECOND_REG_PATTERN.exec(remainingText);
        if (secondMatch) {
            result.end = FRSpecificTimeExpressionParser.extractTimeComponent(result.start.clone(), secondMatch);
            if (result.end) {
                result.text += secondMatch[0];
            }
        }

        return result;
    }

    private static extractTimeComponent(
        extractingComponents: ParsingComponents,
        match: RegExpMatchArray
    ): ParsingComponents | null {
        let hour = 0;
        let minute = 0;
        let meridiem = null;

        // ----- Hours
        hour = parseInt(match[HOUR_GROUP]);

        // ----- Minutes
        if (match[MINUTE_GROUP] != null) {
            minute = parseInt(match[MINUTE_GROUP]);
        }

        if (minute >= 60 || hour > 24) {
            return null;
        }

        if (hour >= 12) {
            meridiem = Meridiem.PM;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP] != null) {
            if (hour > 12) return null;
            const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = Meridiem.AM;
                if (hour == 12) {
                    hour = 0;
                }
            }

            if (ampm == "p") {
                meridiem = Meridiem.PM;
                if (hour != 12) {
                    hour += 12;
                }
            }
        }

        extractingComponents.assign("hour", hour);
        extractingComponents.assign("minute", minute);
        if (meridiem !== null) {
            extractingComponents.assign("meridiem", meridiem);
        } else {
            if (hour < 12) {
                extractingComponents.imply("meridiem", Meridiem.AM);
            } else {
                extractingComponents.imply("meridiem", Meridiem.PM);
            }
        }

        // ----- Second
        if (match[SECOND_GROUP] != null) {
            const second = parseInt(match[SECOND_GROUP]);
            if (second >= 60) return null;

            extractingComponents.assign("second", second);
        }

        return extractingComponents;
    }
}
