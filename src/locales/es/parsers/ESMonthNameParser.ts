import { FULL_MONTH_NAME_DICTIONARY, MONTH_DICTIONARY, ORDINAL_NUMBER_PATTERN } from "../constants";
import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { matchAnyPattern } from "../../../utils/pattern";
import { YEAR_PATTERN, parseYear } from "../constants";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    `((?:en)\\s*)?` +
        `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        `\\s*` +
        `(?:` +
        `(?:,|-|de)?\\s*(${YEAR_PATTERN})?` +
        ")?" +
        "(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)",
    "i"
);

const PREFIX_GROUP = 1;
const MONTH_NAME_GROUP = 2;
const YEAR_GROUP = 3;

const DATE_PREFIX_PATTERN = new RegExp(
    `(?:^|[^\\p{L}\\p{N}\\p{M}_])${ORDINAL_NUMBER_PATTERN}` +
        `(?:\\s*(?:desde|de|-|–|ao?|\\s)\\s*${ORDINAL_NUMBER_PATTERN})?` +
        `\\s*(?:de)?\\s*(?:-|/|\\s*(?:de|,)?\\s*)$`,
    "iu"
);

export default class ESMonthNameParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();

        if (context.text.substring(0, match.index).match(DATE_PREFIX_PATTERN)) {
            return null;
        }

        if (match[0].length <= 3 && !FULL_MONTH_NAME_DICTIONARY[monthName]) {
            return null;
        }

        const result = context.createParsingResult(
            match.index + (match[PREFIX_GROUP] || "").length,
            match.index + match[0].length
        );
        result.start.imply("day", 1);
        result.start.addTag("parser/ESMonthNameParser");

        const month = MONTH_DICTIONARY[monthName];
        result.start.assign("month", month);

        if (match[YEAR_GROUP]) {
            const year = parseYear(match[YEAR_GROUP]);
            result.start.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.refDate, 1, month);
            result.start.imply("year", year);
        }

        return result;
    }
}
