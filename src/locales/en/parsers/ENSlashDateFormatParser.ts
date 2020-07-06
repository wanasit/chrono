import {Parser, ParsingContext} from "../../../chrono";
import {ParsingResult} from "../../../results";
import dayjs from "dayjs";
import {parseYear} from "../constants";
import {findYearClosestToRef} from "../../../calculation/yearCalculation";


const PATTERN = new RegExp('(\\W|^)' +
    '(?:' +
        '(?:on\\s*?)?' +
        '((?:sun|mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?)' +
        '\\s*\\,?\\s*' +
    ')?' +
    '([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})' +
    '(?:' +
        '[\\/\\.\\-]' +
        '([0-9]{4}\\s*\\,?\\s*|[0-9]{2}\\s*\\,?\\s*)' +
    ')?' +
    '(\\W|$)', 'i');

const DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}


const OPENING_GROUP = 1;
const ENDING_GROUP = 6;

const WEEKDAY_GROUP = 2;

const FIRST_NUMBERS_GROUP = 3;
const SECOND_NUMBERS_GROUP = 4;

const YEAR_GROUP = 5;

export default class ENSlashDateFormatParser implements Parser {
    groupNumberMonth: number;
    groupNumberDay: number;

    constructor(littleEndian: boolean) {
        this.groupNumberMonth = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
        this.groupNumberDay = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;
    }

    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {

        if(match[OPENING_GROUP] == '/' || match[ENDING_GROUP] == '/') {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length
            return;
        }

        const index = match.index + match[OPENING_GROUP].length;
        const text = match[0].substr(match[OPENING_GROUP].length, match[0].length - match[ENDING_GROUP].length);

        // '1.12', '1.12.12' is more like a version numbers
        if(text.match(/^\d\.\d$/) || text.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)) {
            return;
        }

        // MM/dd -> OK
        // MM.dd -> NG
        if(!match[YEAR_GROUP] && match[0].indexOf('/') < 0) {
            return;
        }

        const result = context.createParsingResult(index, text);
        let month = parseInt(match[this.groupNumberMonth]);
        let day   = parseInt(match[this.groupNumberDay]);

        if(month < 1 || month > 12) {
            if(month > 12) {
                if (day >= 1 && day <= 12 && month <= 31) {
                    [day, month] = [month, day]
                } else {
                    return null;
                }
            }
        }

        if (day < 1 || day > 31) {
            return null;
        }

        result.start.assign('day', day);
        result.start.assign('month', month);

        if (match[YEAR_GROUP]) {
            const year = parseYear(match[YEAR_GROUP]) || dayjs(context.refDate).year();
            result.start.assign('year', year);
        } else {
            const year = findYearClosestToRef(context.refDate, day, month);
            result.start.imply('year', year);
        }

        //Day of week
        if(match[WEEKDAY_GROUP]) {
            result.start.assign('weekday', DAYS_OFFSET[match[WEEKDAY_GROUP].toLowerCase()]);
        }

        return result;
    }
}
