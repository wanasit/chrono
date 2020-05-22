import {Parser, ParsingContext} from "../../../chrono";
import {findYearClosestToRef} from "../../../calculation/yearCalculation";
import {
    MONTH_OFFSET,
    MONTH_PATTERN,
    ORDINAL_WORDS,
    ORDINAL_WORDS_PATTERN,
    WEEKDAY_OFFSET,
    WEEKDAY_PATTERN
} from "../constants";

/*


*/


const PATTERN = new RegExp('(?<=\\W|^)' +
    '(?:' +
        '(?:on\\s*?)?' +
        `(${WEEKDAY_PATTERN})` +
    '\\s*,?\\s*)?' +
    `(${MONTH_PATTERN})` +
    '(?:-|\/|\\s*,?\\s*)' +
    `(([0-9]{1,2})(?:st|nd|rd|th)?|${ORDINAL_WORDS_PATTERN})(?!\\s*(?:am|pm))\\s*`+
    '(?:' +
        '(?:to|\\-)\\s*' +
        `(([0-9]{1,2})(?:st|nd|rd|th)?|${ORDINAL_WORDS_PATTERN})\\s*` +
    ')?' +
    '(?:' +
        '(?:-|\/|\\s*,?\\s*)' +
        '(?:([0-9]{4})\\s*(BE|AD|BC)?|([0-9]{1,4})\\s*(AD|BC))\\s*' +
    ')?' +
    '(?=\\W|$)(?!\\:\\d)', 'i');

const WEEKDAY_GROUP = 1;
const MONTH_NAME_GROUP = 2;
const DATE_GROUP = 3;
const DATE_NUM_GROUP = 4;
const DATE_TO_GROUP = 5;
const DATE_TO_NUM_GROUP = 6;
const YEAR_GROUP = 7;
const YEAR_BE_GROUP = 8;
const YEAR_GROUP2 = 9;
const YEAR_BE_GROUP2 = 10;

/**
 * The parser for parsing US's date format that begin with month's name.
 *  - January 13
 *  - January 13, 2012
 *  - January 13 - 15, 2012
 *  - Tuesday, January 13, 2012
 * Note: Watch out for:
 *  - January 12:00
 *  - January 12.44
 *  - January 1222344
 */
export default class ENMonthNameMiddleEndianParser implements Parser {

    pattern(context: ParsingContext): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {

        const month = MONTH_OFFSET[match[MONTH_NAME_GROUP]];
        const day = match[DATE_NUM_GROUP] ?
            parseInt(match[DATE_NUM_GROUP]) :
            ORDINAL_WORDS[match[DATE_GROUP].toLowerCase()];

        const components = context.createParsingComponents({
            'day': day, 'month': month
        });

        if (match[YEAR_GROUP] || match[YEAR_GROUP2]) {
            let year = parseInt(match[YEAR_GROUP] || match[YEAR_GROUP2]);
            const yearBE = match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2];
            if (yearBE) {
                if (/BE/i.test(yearBE)) {
                    // Buddhist Era
                    year = year - 543;
                } else if (/BC/i.test(yearBE)) {
                    // Before Christ
                    year = -year;
                }
            } else if (year < 100){
                year = year + 2000;
            }

            components.assign('year', year)
        } else {
            const year = findYearClosestToRef(context.refDate, day, month)
            components.imply('year', year)
        }

        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            const weekday = WEEKDAY_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]
            components.assign('weekday', weekday);
        }

        if (!match[DATE_TO_GROUP]) {
            return components
        }

        // Text can be 'range' value. Such as 'January 12 - 13, 2012'
        const endDate = match[DATE_TO_NUM_GROUP] ?
            parseInt(match[DATE_TO_NUM_GROUP]) :
            ORDINAL_WORDS[match[DATE_TO_GROUP].toLowerCase()];

        const result = context.createParsingResult(match.index, match[0])
        result.start = components;
        result.end = components.clone();
        result.end.assign('day', endDate);

        return result;
    }

}