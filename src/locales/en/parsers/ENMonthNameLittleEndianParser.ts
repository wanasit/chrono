import {Parser, ParsingContext} from "../../../chrono";
import {ParsingResult} from "../../../results";
import {findYearClosestToRef} from "../../../calculation/yearCalculation";
import {
    MONTH_OFFSET,
    MONTH_PATTERN,
    ORDINAL_WORDS,
    ORDINAL_WORDS_PATTERN,
    WEEKDAY_OFFSET,
    WEEKDAY_PATTERN
} from "../constants";


const PATTERN = new RegExp('(?<=\\W|^)' +
        '(?:on\\s*?)?' +
        `(?:(${WEEKDAY_PATTERN})\\s*,?\\s*)?` +
        `(([0-9]{1,2})(?:st|nd|rd|th)?|${ORDINAL_WORDS_PATTERN})` +
        '(?:\\s*' +
            '(?:to|\\-|\\–|until|through|till|\\s)\\s*' +
            '(([0-9]{1,2})(?:st|nd|rd|th)?|' + ORDINAL_WORDS_PATTERN + ')' +
        ')?' + 
        '(?:-|\/|\\s*(?:of)?\\s*)' +
        '(' + MONTH_PATTERN + ')' +
        '(?:' +
            '(?:-|\/|,?\\s*)' +
            '((?:' + 
                '[1-9][0-9]{0,3}\\s*(?:BE|AD|BC)|' +
                '[1-2][0-9]{3}|' +
                '[5-9][0-9]' +
            ')(?![^\\s]\\d))' +
        ')?' +
        '(?=\\W|$)', 'i'
    );

const WEEKDAY_GROUP = 1;
const DATE_GROUP = 2;
const DATE_NUM_GROUP = 3;
const DATE_TO_GROUP = 4;
const DATE_TO_NUM_GROUP = 5;
const MONTH_NAME_GROUP = 6;
const YEAR_GROUP = 7;

export default class ENMonthNameLittleEndianParser implements Parser {

    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const result = context.createParsingResult(match.index, match[0]);

        const month = MONTH_OFFSET[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = match[DATE_NUM_GROUP] ?
            parseInt(match[DATE_NUM_GROUP]):
            ORDINAL_WORDS[match[DATE_GROUP].toLowerCase()];

        result.start.assign('month', month);
        result.start.assign('day', day);

        if (match[WEEKDAY_GROUP]) {
            const weekday = WEEKDAY_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        if (match[YEAR_GROUP]) {
            let year: string = match[YEAR_GROUP];
            let yearNumber: number;
            if (/BE/i.test(year)) {
                // Buddhist Era
                year = year.replace(/BE/i, '');
                yearNumber = parseInt(year) - 543;
            } else if (/BC/i.test(year)){
                // Before Christ
                year = year.replace(/BC/i, '');
                yearNumber = -parseInt(year);
            } else if (/AD/i.test(year)){
                year = year.replace(/AD/i, '');
                yearNumber = parseInt(year);
            } else {
                yearNumber = parseInt(year);
                if (yearNumber < 100){
                    if (yearNumber > 50) {
                        yearNumber = yearNumber + 1900;
                    } else {
                        yearNumber = yearNumber + 2000;
                    }
                }
            }

            result.start.assign('year', yearNumber)
        } else {
            const year = findYearClosestToRef(context.refDate, day, month);
            result.start.imply('year', year)
        }

        if (match[DATE_TO_GROUP]) {
            const endDate = match[DATE_TO_NUM_GROUP] ?
                parseInt(match[DATE_TO_NUM_GROUP]):
                ORDINAL_WORDS[match[DATE_TO_GROUP].toLowerCase()];

            result.end = result.start.clone();
            result.end.assign('day', endDate);
        }

        return result;
    }
}
