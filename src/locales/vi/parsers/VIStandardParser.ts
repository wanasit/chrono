import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { findYearClosestToRef } from "../../../calculation/years";
import { YEAR_PATTERN, parseYear } from "../constants";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// ngày 15 tháng 3 năm 1975  |  15 tháng 3 năm 1975  |  15 tháng 3
const PATTERN = new RegExp(
    "(?:ng\u00e0y\\s*)?" +
    "([0-9]{1,2})" +
    "\\s*th\u00e1ng\\s*" +
    "([0-9]{1,2})" +
    "(?:\\s*n\u0103m\\s*(" + YEAR_PATTERN + "))?" +
    "(?=\\W|$)",
    "i"
);

const DAY_GROUP = 1;
const MONTH_GROUP = 2;
const YEAR_GROUP = 3;

export default class VIStandardParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp { return PATTERN; }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const day = parseInt(match[DAY_GROUP]);
        const month = parseInt(match[MONTH_GROUP]);
        if (day > 31 || month > 12) return null;

        const result = context.createParsingResult(match.index, match[0]);
        result.start.assign("day", day);
        result.start.assign("month", month);

        if (match[YEAR_GROUP]) {
            result.start.assign("year", parseYear(match[YEAR_GROUP]));
        } else {
            result.start.imply("year", findYearClosestToRef(context.refDate, day, month));
        }
        return result;
    }
}
