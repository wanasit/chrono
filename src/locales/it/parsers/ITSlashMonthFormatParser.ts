import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp("([0-9]|0[1-9]|1[012])/([0-9]{4})" + "", "i");

const MONTH_GROUP = 1;
const YEAR_GROUP = 2;

/**
 * Month/Year date format with slash "/" (also "-" and ".") between numbers
 * - 11/05
 * - 06/2005
 */
export default class ENSlashMonthFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const year = parseInt(match[YEAR_GROUP]);
        const month = parseInt(match[MONTH_GROUP]);

        return context.createParsingComponents().imply("day", 1).assign("month", month).assign("year", year);
    }
}
