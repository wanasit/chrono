import {OpUnitType} from "dayjs";
import {matchAnyPattern} from "../../utils/pattern";

export const WEEKDAY_DICTIONARY: {[word: string]: number} = {
    'sunday': 0,
    'sun': 0,
    'sun.': 0,
    'monday': 1,
    'mon': 1,
    'mon.': 1,
    'tuesday': 2,
    'tue':2,
    'tue.':2,
    'wednesday': 3,
    'wed': 3,
    'wed.': 3,
    'thursday': 4,
    'thurs': 4,
    'thurs.': 4,
    'thur': 4,
    'thur.': 4,
    'thu': 4,
    'thu.': 4,
    'friday': 5,
    'fri': 5,
    'fri.': 5,
    'saturday': 6,
    'sat': 6,
    'sat.': 6
};

export const MONTH_DICTIONARY: {[word: string]: number}  = {
    'january': 1,
    'jan': 1,
    'jan.': 1,
    'february': 2,
    'feb': 2,
    'feb.': 2,
    'march': 3,
    'mar': 3,
    'mar.': 3,
    'april': 4,
    'apr': 4,
    'apr.': 4,
    'may': 5,
    'june': 6,
    'jun': 6,
    'jun.': 6,
    'july': 7,
    'jul': 7,
    'jul.': 7,
    'august': 8,
    'aug': 8,
    'aug.': 8,
    'september': 9,
    'sep': 9,
    'sep.': 9,
    'sept': 9,
    'sept.': 9,
    'october': 10,
    'oct': 10,
    'oct.': 10,
    'november': 11,
    'nov': 11,
    'nov.': 11,
    'december': 12,
    'dec': 12,
    'dec.': 12
};

export const INTEGER_WORD_DICTIONARY: {[word: string]: number} = {
    'one' : 1,
    'two' : 2,
    'three' : 3,
    'four' : 4,
    'five' : 5,
    'six' : 6,
    'seven' : 7,
    'eight' : 8,
    'nine' : 9,
    'ten' : 10,
    'eleven' : 11,
    'twelve' : 12
};

export const ORDINAL_WORD_DICTIONARY: {[word: string]: number} = {
    'first' : 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
    'seventh': 7,
    'eighth': 8,
    'ninth': 9,
    'tenth': 10,
    'eleventh': 11,
    'twelfth': 12,
    'thirteenth': 13,
    'fourteenth': 14,
    'fifteenth': 15,
    'sixteenth': 16,
    'seventeenth': 17,
    'eighteenth': 18,
    'nineteenth': 19,
    'twentieth': 20,
    'twenty first': 21,
    'twenty-first': 21,
    'twenty second': 22,
    'twenty-second': 22,
    'twenty third': 23,
    'twenty-third': 23,
    'twenty fourth': 24,
    'twenty-fourth': 24,
    'twenty fifth': 25,
    'twenty-fifth': 25,
    'twenty sixth': 26,
    'twenty-sixth': 26,
    'twenty seventh': 27,
    'twenty-seventh': 27,
    'twenty eighth': 28,
    'twenty-eighth': 28,
    'twenty ninth': 29,
    'twenty-ninth': 29,
    'thirtieth': 30,
    'thirty first': 31,
    'thirty-first': 31
};

export const TIME_UNIT_DICTIONARY : {[word: string]: OpUnitType} = {
    'sec': 'second',
    'second' : 'second',
    'seconds' : 'second',
    'min' : 'minute',
    'mins' : 'minute',
    'minute' : 'minute',
    'minutes' : 'minute',
    'h' : 'hour',
    'hr' : 'hour',
    'hrs' : 'hour',
    'hour' : 'hour',
    'hours' : 'hour',
    'day' : 'd',
    'days' : 'd',
    'week' : 'week',
    'weeks': 'week',
    'month' : 'month',
    'months' : 'month',
    'yr' : 'year',
    'year' : 'year',
    'years' : 'year',
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s*an?)?|an?(?:\\s*few)?|few)`;

export function parseNumberPattern(match: string) : number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === 'a' || num === 'an') {
        return 1;
    } else if (num.match(/few/)) {
        return 3;
    } else if (num.match(/half/)) {
        return 0.5;
    }

    return parseFloat(num);
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
export function parseOrdinalNumberPattern(match: string) : number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }

    num = num.replace(/(?:st|nd|rd|th)$/i, '')
    return parseInt(num);
}


//-----------------------------

export const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s*(?:BE|AD|BC)|[1-2][0-9]{3}|[5-9][0-9])`;
export function parseYear(match: string) : number {
    if (/BE/i.test(match)) {
        // Buddhist Era
        match = match.replace(/BE/i, '');
        return parseInt(match) - 543;
    }

    if (/BC/i.test(match)){
        // Before Christ
        match = match.replace(/BC/i, '');
        return -parseInt(match);
    }

    if (/AD/i.test(match)){
        match = match.replace(/AD/i, '');
        return parseInt(match);
    }

    let yearNumber = parseInt(match);
    if (yearNumber < 100){
        if (yearNumber > 50) {
            yearNumber = yearNumber + 1900;
        } else {
            yearNumber = yearNumber + 2000;
        }
    }

    return yearNumber;
}

//-----------------------------

const SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s*(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s*`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, 'i');

const SINGLE_TIME_UNIT_PATTERN_NO_CAPTURE = SINGLE_TIME_UNIT_PATTERN.replace(/\((?!\?)/g, '(?:');

export const TIME_UNITS_PATTERN = `(?:${SINGLE_TIME_UNIT_PATTERN_NO_CAPTURE})+`;

export function parseTimeUnits(timeunitText) : {[c in OpUnitType]?: number} {
    const fragments = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    return fragments;
}

function collectDateTimeFragment(fragments, match) {
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()]
    fragments[unit] = num;
}