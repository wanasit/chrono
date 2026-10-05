import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { MONTH_DICTIONARY, YEAR_PATTERN, parseYear } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    "(?:(?:pada\\s+)?bulan\\s+)?" +
        `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        `(?:\\s*[,-]?\\s*(?:tahun\\s+)?(${YEAR_PATTERN}))?` +
        "(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)",
    "i"
);

const MONTH_NAME_GROUP = 1;
const YEAR_GROUP = 2;

/**
 * The parser for parsing a month name with an optional year.
 * - Januari 2024
 * - bulan Maret
 * - Agustus tahun 1945
 */
export default class IDMonthNameParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();

        // Short abbreviations (e.g. "jan", "des") are too ambiguous to be taken as a month on their own
        if (monthName.length <= 3 && monthName !== "mei" && !match[YEAR_GROUP]) {
            return null;
        }

        const components = context.createParsingComponents();
        const month = MONTH_DICTIONARY[monthName];
        components.imply("day", 1);
        components.assign("month", month);

        if (match[YEAR_GROUP]) {
            components.assign("year", parseYear(match[YEAR_GROUP]));
        } else {
            components.imply("year", findYearClosestToRef(context.refDate, 1, month));
        }

        return components;
    }
}
