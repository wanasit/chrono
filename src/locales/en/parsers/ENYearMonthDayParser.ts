import { ParsingContext } from "../../../chrono";
import { MONTH_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

/*
    Date format with slash "/" between numbers like ENSlashDateFormatParser,
    but this parser expect year before month and date.
    - YYYY/MM/DD
    - YYYY-MM-DD
    - YYYY.MM.DD
*/
const PATTERN = new RegExp(
    `([0-9]{4})[-\\.\\/\\s]` +
        `(?:(${matchAnyPattern(MONTH_DICTIONARY)})|([0-9]{1,2}))[-\\.\\/\\s]` +
        `([0-9]{1,2})` +
        "(?=\\W|$)",
    "i"
);

const YEAR_NUMBER_GROUP = 1;
const MONTH_NAME_GROUP = 2;
const MONTH_NUMBER_GROUP = 3;
const DATE_NUMBER_GROUP = 4;

export default class ENYearMonthDayParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMonthDateOrder: boolean) {
        super();
    }

    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const year = parseInt(match[YEAR_NUMBER_GROUP]);
        let day = parseInt(match[DATE_NUMBER_GROUP]);
        let month = match[MONTH_NUMBER_GROUP]
            ? parseInt(match[MONTH_NUMBER_GROUP])
            : MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];

        if (month < 1 || month > 12) {
            if (this.strictMonthDateOrder) {
                return null;
            }
            if (day >= 1 && day <= 12) {
                [month, day] = [day, month];
            }
        }
        if (day < 1 || day > 31) {
            return null;
        }

        return {
            day: day,
            month: month,
            year: year,
        };
    }
}
