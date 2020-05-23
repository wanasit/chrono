import dayjs, {OpUnitType} from "dayjs";
import {ParsingComponents} from "../../results";

export const WEEKDAY_OFFSET = {
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

export const WEEKDAY_PATTERN = '(?:'
    + Object.keys(WEEKDAY_OFFSET)
        .sort((a, b) => b.length - a.length)
        .join('|')
        .replace(/\./g, '\\.')
    + ')';

export const MONTH_OFFSET = {
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

export const MONTH_PATTERN = '(?:'
    + Object.keys(MONTH_OFFSET)
        .sort((a, b) => b.length - a.length)
        .join('|')
        .replace(/\./g, '\\.')
    + ')';

export const INTEGER_WORDS: {[word: string]: number} = {
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

export const INTEGER_WORDS_PATTERN = '(?:'
    + Object.keys(exports.INTEGER_WORDS).join('|')
    +')';

export const ORDINAL_WORDS = {
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

export const ORDINAL_WORDS_PATTERN = '(?:'
    + Object.keys(ORDINAL_WORDS)
        .sort((a, b) => b.length - a.length)
        .join('|')
    + ')';

const TIME_UNIT =
    '(' + INTEGER_WORDS_PATTERN + '|[0-9]+|[0-9]+\.[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' +
    '(sec(?:onds?)?|min(?:ute)?s?|h(?:r|rs|our|ours)?|weeks?|days?|months?|years?)\\s*';

const TIME_UNIT_STRICT =
    '(?:[0-9]+|an?)\\s*' +
    '(?:seconds?|minutes?|hours?|days?)\\s*';

const PATTERN_TIME_UNIT = new RegExp(TIME_UNIT, 'i');

export const TIME_UNIT_PATTERN = '(?:' + TIME_UNIT.replace(/\((?!\?)/g, '(?:') + ')+';
export const TIME_UNIT_STRICT_PATTERN = '(?:' + TIME_UNIT_STRICT + ')+';

export function createComponentRelativeFromRefDate(
    refDate:Date, fragments: {[c: OpUnitType]: number}): ParsingComponents {

    let date = dayjs(refDate);
    for (const key in fragments) {
        date = date.add(fragments[key], key);
    }

    const components = new ParsingComponents(refDate);
    if (fragments['hour'] || fragments['minute'] || fragments['second']) {
        components.assign('hour', date.hour());
        components.assign('minute', date.minute());
        components.assign('second', date.second());
    }

    if (fragments['d'] || fragments['month'] || fragments['year']) {
        components.assign('day', date.date());
        components.assign('month', date.month() + 1);
        components.assign('year', date.year());
    } else {
        if (fragments['week']) {
            components.imply('weekday', date.day());
        }

        components.imply('day', date.date());
        components.imply('month', date.month() + 1);
        components.imply('year', date.year());
    }

    return components;
}

export function extractDateJSTimeUnitValues(timeunitText) : {[c: OpUnitType]: number} {
    const fragments = {};
    let remainingText = timeunitText;
    let match = PATTERN_TIME_UNIT.exec(remainingText);
    while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length);
        match = PATTERN_TIME_UNIT.exec(remainingText);
    }
    return fragments;
}

function collectDateTimeFragment(fragments, match) {

    let num = match[1].toLowerCase() ;
    if (exports.INTEGER_WORDS[num] !== undefined) {
        num = exports.INTEGER_WORDS[num];
    } else if(num === 'a' || num === 'an'){
        num = 1;
    } else if (num.match(/few/)) {
        num = 3;
    } else if (num.match(/half/)) {
        num = 0.5;
    } else {
        num = parseFloat(num);
    }

    if (match[2].match(/^h/i)) {
        fragments['hour'] = num;
    } else if (match[2].match(/min/i)) {
        fragments['minute'] = num;
    } else if (match[2].match(/sec/i)) {
        fragments['second'] = num;
    } else if (match[2].match(/week/i)) {
        fragments['week'] = num;
    } else if (match[2].match(/day/i)) {
        fragments['d'] = num;
    } else if (match[2].match(/month/i)) {
        fragments['month'] = num;
    } else if (match[2].match(/year/i)) {
        fragments['year'] = num;
    }

    return fragments;
}