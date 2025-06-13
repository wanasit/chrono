import { OpUnitType, QUnitType } from "dayjs";
import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { TimeUnits } from "../../utils/timeunits";
import { Weekday } from "../../types";

export const WEEKDAY_DICTIONARY: { [word: string]: Weekday } = {
    "شنبه": 0,
    "یکشنبه": 1,
    "یک شنبه": 1,
    "یک‌شنبه": 1,
    "دوشنبه": 2,
    "دو شنبه": 2,
    "دو‌شنبه": 2,
    "سه شنبه": 3,
    "سه‌شنبه": 3,
    "سهشنبه": 3,
    "چهارشنبه": 4,
    "چهار شنبه": 4,
    "چهار‌شنبه": 4,
    "پنجشنبه": 5,
    "پنج شنبه": 5,
    "پنج‌شنبه": 5,
    "جمعه": 6,
};

export const FULL_MONTH_NAME_DICTIONARY: { [word: string]: number } = {
    "فروردین": 1,
    "اردیبهشت": 2,
    "خرداد": 3,
    "تیر": 4,
    "مرداد": 5,
    "شهریور": 6,
    "مهر": 7,
    "آبان": 8,
    "آذر": 9,
    "دی": 10,
    "بهمن": 11,
    "اسفند": 12,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    ...FULL_MONTH_NAME_DICTIONARY,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "یک": 1,
    "دو": 2,
    "سه": 3,
    "چهار": 4,
    "پنج": 5,
    "شش": 6,
    "شیش": 6,
    "هفت": 7,
    "هشت": 8,
    "نه": 9,
    "ده": 10,
    "یازده": 11,
    "دوازده": 12,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    "اول": 1,
    "اولین": 1,
    "یکم": 1,
    "دومی": 2,
    "دومین": 2,
    "دوم": 2,
    "سومی": 3,
    "سومین": 3,
    "سوم": 3,
    "چهارمی": 4,
    "چهارمین": 4,
    "چهارم": 4,
    "پنجمی": 5,
    "پنجمین": 5,
    "پنجم": 5,
    "ششمی": 6,
    "شیشمی": 6,
    "ششمین": 6,
    "شیشمین": 6,
    "ششم": 6,
    "شیشم": 6,
    "هفتمی": 7,
    "هفتمین": 7,
    "هفتم": 7,
    "هشتمی": 8,
    "هشتمین": 8,
    "هشتم": 8,
    "نهمی": 9,
    "نهمین": 9,
    "نهم": 9,
    "دهمی": 10,
    "دهمین": 10,
    "دهم": 10,
    "یازدهمی": 11,
    "یازدهمین": 11,
    "یازدهم": 11,
    "دوازدهمی": 12,
    "دوازدهمین": 12,
    "دوازدهم": 12,
    "سیزدهمی": 13,
    "سیزدهمین": 13,
    "سیزدهم": 13,
    "چهاردهمی": 14,
    "چهاردهمین": 14,
    "چهاردهم": 14,
    "پونزدهمی": 15,
    "پانزدهمی": 15,
    "پونزدهمین": 15,
    "پانزدهمین": 15,
    "پونزدهم": 15,
    "پانزدهم": 15,
    "شانزدهمی": 16,
    "شانزدهمین": 16,
    "شانزدهم": 16,
    "شونزدهمی": 16,
    "شونزدهمین": 16,
    "شونزدهم": 16,
    "هفدهم": 17,
    "هجدهم": 18,
    "نوزدهم": 19,
    "بیستم": 20,
    "بیست و یکم": 21,
    "بیست و دوم": 22,
    "بیست و سوم": 23,
    "بیست و چهارم": 24,
    "بیست و پنجم": 25,
    "بیست و ششم": 26,
    "بیست و هفتم": 27,
    "بیست و هشتم": 28,
    "بیست و نهم": 29,
    "سی ام": 30,
    "سی و یکم": 31,
};

export const TIME_UNIT_DICTIONARY_NO_ABBR: { [word: string]: OpUnitType | QUnitType } = {
    "ثانیه": "second",
    "ثانیه ها": "second",
    "دقیقه": "minute",
    "دقیقه ها": "minute",
    "ساعت": "hour",
    "ساعت ها": "hour",
    "روز": "d",
    "روز ها": "d",
    "هفته": "week",
    "هفته ها": "week",
    "ماه": "month",
    "ماه ها": "month",
    "سال": "year",
    "سال ها": "year",
};

export const TIME_UNIT_DICTIONARY: { [word: string]: OpUnitType | QUnitType } = {
    "ثانیه": "second",
    "ثانیه ها": "second",
    "دقیقه": "minute",
    "دقیقه ها": "minute",
    "دقایق": "minute",
    "ساعت": "hour",
    "ساعت ها": "hour",
    "روز": "d",
    "روز ها": "d",
    "هفته": "week",
    "هفته ها": "week",
    "ماه": "month",
    "ماه ها": "month",
    "سال": "year",
    "سال ها": "year",
    // Also, merge the entries from the full-name dictionary.
    // We leave the duplicated entries for readability.
    ...TIME_UNIT_DICTIONARY_NO_ABBR,
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}an?)?|an?\\b(?:\\s{0,2}few)?|few|several|the|a?\\s{0,2}couple\\s{0,2}(?:of)?)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "a" || num === "an" || num == "the") {
        return 1;
    } else if (num.match(/few/)) {
        return 3;
    } else if (num.match(/half/)) {
        return 0.5;
    } else if (num.match(/couple/)) {
        return 2;
    } else if (num.match(/several/)) {
        return 7;
    }

    return parseFloat(num);
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:st|nd|rd|th)?)`;
export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }

    num = num.replace(/(?:st|nd|rd|th)$/i, "");
    return parseInt(num);
}

//-----------------------------

export const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-2][0-9]{3}|[5-9][0-9]|2[0-5])`;
export function parseYear(match: string): number {
    if (/BE/i.test(match)) {
        // Buddhist Era
        match = match.replace(/BE/i, "");
        return parseInt(match) - 543;
    }

    if (/BCE?/i.test(match)) {
        // Before Christ, Before Common Era
        match = match.replace(/BCE?/i, "");
        return -parseInt(match);
    }

    if (/(AD|CE)/i.test(match)) {
        // Anno Domini, Common Era
        match = match.replace(/(AD|CE)/i, "");
        return parseInt(match);
    }

    const rawYearNumber = parseInt(match);
    return findMostLikelyADYear(rawYearNumber);
}

//-----------------------------

const SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,3}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

const SINGLE_TIME_UNIT_NO_ABBR_PATTERN = `(${NUMBER_PATTERN})\\s{0,3}(${matchAnyPattern(
    TIME_UNIT_DICTIONARY_NO_ABBR
)})`;

const TIME_UNIT_CONNECTOR_PATTERN = `\\s{0,5},?(?:\\s*and)?\\s{0,5}`;

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(
    `(?:(?:about|around)\\s{0,3})?`,
    SINGLE_TIME_UNIT_PATTERN,
    TIME_UNIT_CONNECTOR_PATTERN
);
export const TIME_UNITS_NO_ABBR_PATTERN = repeatedTimeunitPattern(
    `(?:(?:about|around)\\s{0,3})?`,
    SINGLE_TIME_UNIT_NO_ABBR_PATTERN,
    TIME_UNIT_CONNECTOR_PATTERN
);

export function parseTimeUnits(timeunitText): null | TimeUnits {
    const fragments = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length).trim();
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    if (Object.keys(fragments).length == 0) {
        return null;
    }
    return fragments;
}

function collectDateTimeFragment(fragments, match) {
    if (match[0].match(/^[a-zA-Z]+$/)) {
        return;
    }
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
}
