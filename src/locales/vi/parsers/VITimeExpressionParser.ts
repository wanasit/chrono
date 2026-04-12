import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { Meridiem } from "../../../types";

// l\u00fac 7 gi\u1edd 30 ph\u00fat  |  7 gi\u1edd s\u00e1ng  |  7 gi\u1edd  |  15:30
const PATTERN = new RegExp(
    "(?:l\u00fac\\s*|v\u00e0o\\s*)?" +
    "([0-9]{1,2})" +
    "(?:\\s*gi\u1edd\\s*([0-9]{1,2})?\\s*(?:ph\u00fat\\s*)?" +
        "(s\u00e1ng|tr\u01b0a|chi\u1ec1u|t\u1ed1i|\u0111\u00eam)?" +
    "|:([0-9]{2}))" +
    "(?=\\W|$)",
    "i"
);

const HOUR_GROUP = 1;
const MINUTE_GIO_GROUP = 2;
const MERIDIEM_GROUP = 3;
const MINUTE_COLON_GROUP = 4;

export default class VITimeExpressionParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp { return PATTERN; }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const hour = parseInt(match[HOUR_GROUP]);
        if (hour > 23) return null;

        const result = context.createParsingResult(match.index, match[0]);
        result.start.assign("hour", hour);

        const minute = match[MINUTE_COLON_GROUP]
            ? parseInt(match[MINUTE_COLON_GROUP])
            : match[MINUTE_GIO_GROUP] ? parseInt(match[MINUTE_GIO_GROUP]) : 0;
        result.start.assign("minute", minute);

        const meridiem = match[MERIDIEM_GROUP]?.toLowerCase();
        if (meridiem === "s\u00e1ng" || meridiem === "tr\u01b0a") {
            result.start.assign("meridiem", Meridiem.AM);
        } else if (meridiem === "chi\u1ec1u" || meridiem === "t\u1ed1i" || meridiem === "\u0111\u00eam") {
            result.start.assign("meridiem", Meridiem.PM);
            if (hour < 12) result.start.assign("hour", hour + 12);
        }

        result.start.imply("second", 0);
        result.start.imply("millisecond", 0);
        return result;
    }
}
