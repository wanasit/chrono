/*
    
    The parser for parsing month name and year.
    
    EX. 
        - January
        - January 2012
        - January, 2012
*/


import {MONTH_OFFSET, MONTH_PATTERN} from "../constants";
import {Parser, ParsingContext} from "../../../chrono";
import {findYearClosestToRef} from "../../../calculation/yearCalculation";

const PATTERN = new RegExp('(?<=^|\\D\\s+|[^\\w\\s])' +
    '('+ MONTH_PATTERN +')' +
    '\\s*' +
    '(?:' +
        '[,-]?\\s*([0-9]{4})(\\s*BE|AD|BC)?' +
    ')?' +
    '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');

const MONTH_NAME_GROUP = 1;
const YEAR_GROUP = 2;
const YEAR_BE_GROUP = 3;

export default class ENMonthNameParser implements Parser {

    pattern(): RegExp {return PATTERN; }

    extract(context: ParsingContext, match: RegExpMatchArray) {

        if (match[0].length <= 3) {
            context.debug(() => {
                console.log(match)
                console.log(MONTH_PATTERN)
            });
            return null;
        }

        const components = context.createParsingComponents()
        components.imply('day', 1);

        const monthName = match[MONTH_NAME_GROUP];
        const month = MONTH_OFFSET[monthName.toLowerCase()];
        components.assign('month', month);

        if (match[YEAR_GROUP]) {
            let year = parseInt(match[YEAR_GROUP]);
            if(match[YEAR_BE_GROUP]){
                if (match[YEAR_BE_GROUP].match(/BE/)) {
                    // Buddhist Era
                    year = year - 543;
                } else if (match[YEAR_BE_GROUP].match(/BC/)) {
                    // Before Christ
                    year = -year;
                }
            } else if (year < 100){
                year = year + 2000;
            }

            components.assign('year', year)
        } else {
            const year = findYearClosestToRef(context.refDate, 1, month)
            components.imply('year', year)
        }

        return components;
    }
}
