import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { findYearClosestToRef } from "../../../calculation/years";
import { MONTH_DICTIONARY, YEAR_PATTERN, parseYear } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    "(?:(?:pada\\s+)?(?:tanggal|tgl\\.?)\\s*)?" +
        "([0-9]{1,2})" +
        "(?:\\s*(?:-|–|s\\.d\\.?|s/d|sampai(?:\\s+dengan)?|hingga)\\s*([0-9]{1,2}))?" +
        "(?:\\s*|-|/)" +
        `(${matchAnyPattern(MONTH_DICTIONARY)})` +
        `(?:(?:\\s*|-|/|,\\s*)(?:tahun\\s+)?(${YEAR_PATTERN}))?` +
        "(?=\\W|$)",
    "i"
);

const DATE_GROUP = 1;
const DATE_TO_GROUP = 2;
const MONTH_NAME_GROUP = 3;
const YEAR_GROUP = 4;

/**
 * The parser for parsing Indonesian dates with the month name (day before month)
 * - 17 Agustus 1945
 * - tanggal 17 Agustus
 * - 5-7 Januari 2024
 * - 5 s.d. 7 Jan 2024
 * - 1 Mei 500 SM
 */
export default class IDMonthNameLittleEndianParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const result = context.createParsingResult(match.index, match[0]);

        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseInt(match[DATE_GROUP]);
        if (day > 31) {
            // e.g. "[96 Agustus]" => "9[6 Agustus]", we need to shift away from the next number
            match.index = match.index + match[DATE_GROUP].length;
            return null;
        }

        result.start.assign("month", month);
        result.start.assign("day", day);

        if (match[YEAR_GROUP]) {
            result.start.assign("year", parseYear(match[YEAR_GROUP]));
        } else {
            result.start.imply("year", findYearClosestToRef(context.refDate, day, month));
        }

        if (match[DATE_TO_GROUP]) {
            const endDate = parseInt(match[DATE_TO_GROUP]);
            if (endDate > 31) {
                return null;
            }
            result.end = result.start.clone();
            result.end.assign("day", endDate);
        }

        return result;
    }
}
