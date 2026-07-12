import { MONTH_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { matchAnyPattern } from "../../../utils/pattern";
import { parseYear } from "../constants";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-9][0-9]{3})`;

const PATTERN = new RegExp(
    `(${YEAR_PATTERN})` +
        `(?:\\s*[-.\\/,]?\\s*|\\s+of\\s+)` +
        `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        `(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)`,
    "i"
);

const YEAR_GROUP = 1;
const MONTH_NAME_GROUP = 2;

export default class ENYearMonthNameParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const year = parseYear(match[YEAR_GROUP]);
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        const month = MONTH_DICTIONARY[monthName];

        const result = context.createParsingResult(match.index, match[0]);
        result.start.imply("day", 1);
        result.start.assign("month", month);
        result.start.assign("year", year);
        result.start.addTag("parser/ENYearMonthNameParser");

        return result;
    }
}
