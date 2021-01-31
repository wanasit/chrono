import { MONTH_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { matchAnyPattern } from "../../../utils/pattern";
import { YEAR_PATTERN, parseYear } from "../constants";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { ORDINAL_NUMBER_PATTERN } from "../../nl/constants";
import { parseOrdinalNumberPattern } from "../../../../dist/locales/nl/constants";

const PATTERN = new RegExp(
    `(${ORDINAL_NUMBER_PATTERN})\\s*` +
        `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        "\\s*" +
        "(?:" +
        `[,-]?\\s*(${YEAR_PATTERN})?` +
        ")?" +
        "(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)",
    "i"
);

const DAY_GROUP = 1;
const MONTH_NAME_GROUP = 2;
const YEAR_GROUP = 3;

/**
 * The parser for parsing month name and year.
 * - January, 2012
 * - January 2012
 * - January
 */
export default class NLMonthNameParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        if (match[0].length <= 3) {
            return null;
        }

        const components = context.createParsingComponents();

        const day = parseOrdinalNumberPattern(match[DAY_GROUP]);
        if (day > 31) {
            return null;
        }
        components.assign("day", day);

        const monthName = match[MONTH_NAME_GROUP];
        const month = MONTH_DICTIONARY[monthName.toLowerCase()];
        components.assign("month", month);

        if (match[YEAR_GROUP]) {
            const year = parseYear(match[YEAR_GROUP]);
            components.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.refDate, 1, month);
            components.imply("year", year);
        }

        return components;
    }
}
