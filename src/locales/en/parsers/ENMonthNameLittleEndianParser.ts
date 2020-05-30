import {Parser, ParsingContext} from "../../../chrono";
import {ParsingResult} from "../../../results";
import {findYearClosestToRef} from "../../../calculation/yearCalculation";
import {MONTH_DICTIONARY, ORDINAL_WORD_DICTIONARY, WEEKDAY_DICTIONARY,} from "../constants";
import {ORDINAL_NUMBER_PATTERN, parseOrdinalNumberPattern} from "../constants";
import {matchAnyPattern} from "../../../utils/pattern";


const PATTERN = new RegExp('(?<=\\W|^)' +
        '(?:on\\s*?)?' +
        `(?:(${matchAnyPattern(WEEKDAY_DICTIONARY)})\\s*,?\\s*)?` +
        `(${ORDINAL_NUMBER_PATTERN})` +
        '(?:\\s*' +
            '(?:to|\\-|\\–|until|through|till|\\s)\\s*' +
            `(${ORDINAL_NUMBER_PATTERN})` +
        ')?' + 
        '(?:-|\/|\\s*(?:of)?\\s*)' +
        '(' + matchAnyPattern(MONTH_DICTIONARY) + ')' +
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
const DATE_TO_GROUP = 3;
const MONTH_NAME_GROUP = 4;
const YEAR_GROUP = 5;

export default class ENMonthNameLittleEndianParser implements Parser {

    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        //console.log(match)

        const result = context.createParsingResult(match.index, match[0]);

        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseOrdinalNumberPattern(match[DATE_GROUP]);

        result.start.assign('month', month);
        result.start.assign('day', day);

        if (match[WEEKDAY_GROUP]) {
            const weekday = WEEKDAY_DICTIONARY[match[WEEKDAY_GROUP].toLowerCase()]
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

            context.debug(() => {
                console.log(day, month)
            });

            const year = findYearClosestToRef(context.refDate, day, month);
            result.start.imply('year', year)
        }

        if (match[DATE_TO_GROUP]) {
            const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP]);

            result.end = result.start.clone();
            result.end.assign('day', endDate);
        }

        return result;
    }
}
