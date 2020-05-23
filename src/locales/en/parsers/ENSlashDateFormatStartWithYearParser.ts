import {Parser, ParsingContext} from "../../../chrono";
import {MONTH_OFFSET, MONTH_PATTERN} from "../constants";

/*
    Date format with slash "/" between numbers like ENSlashDateFormatParser,
    but this parser expect year before month and date.
    - YYYY/MM/DD
    - YYYY-MM-DD
    - YYYY.MM.DD
*/
const PATTERN = new RegExp('(?<=\\W|^)'
    + '([0-9]{4})[\\.\\/]'
    + '((?:' + MONTH_PATTERN + '|[0-9]{1,2}))[\\.\\/]'
    + '([0-9]{1,2})'
    + '(?=\\W|$)', 'i');

const YEAR_NUMBER_GROUP = 1;
const MONTH_NUMBER_GROUP = 2;
const DATE_NUMBER_GROUP  = 3;

export default class ENSlashDateFormatStartWithYearParser implements Parser {

    pattern(): RegExp { return PATTERN; }

    extract(context: ParsingContext, match: RegExpMatchArray) {

        const monthWord = match[MONTH_NUMBER_GROUP].toLowerCase();
        const month = MONTH_OFFSET[monthWord] || parseInt(monthWord);

        const year = parseInt(match[YEAR_NUMBER_GROUP]);
        const day = parseInt(match[DATE_NUMBER_GROUP]);

        return {
            'day': day,
            'month': month,
            'year': year
        }
    }
}
