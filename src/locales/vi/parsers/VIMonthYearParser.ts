import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { YEAR_PATTERN, parseYear } from "../constants";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// tháng 3 năm 1975  |  tháng 3/1975
const PATTERN = new RegExp("tháng\\s*([0-9]{1,2})" + "(?:\\s*(?:năm|/)\\s*(" + YEAR_PATTERN + "))?" + "(?=\\W|$)", "i");

const MONTH_GROUP = 1;
const YEAR_GROUP = 2;

export default class VIMonthYearParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const month = parseInt(match[MONTH_GROUP]);
        if (month > 12) return null;

        const result = context.createParsingResult(match.index, match[0]);
        result.start.assign("month", month);
        result.start.imply("day", 1);
        if (match[YEAR_GROUP]) {
            result.start.assign("year", parseYear(match[YEAR_GROUP]));
        } else {
            result.start.imply("year", context.reference.getDateWithAdjustedTimezone().getFullYear());
        }
        return result;
    }
}
