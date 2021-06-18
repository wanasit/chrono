import { OpUnitType } from "dayjs";
import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { TimeUnits } from "../../utils/timeunits";

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    // Zondag
    zondag: 0,
    zon: 0,
    "zon.": 0,
    zo: 0,
    "zo.": 0,
    // Maandag
    maandag: 1,
    ma: 1,
    "ma.": 1,
    // Dinsdag
    dinsdag: 2,
    din: 2,
    "din.": 2,
    di: 2,
    "di.": 2,
    // Woensdag
    woensdag: 3,
    woe: 3,
    "woe.": 3,
    wo: 3,
    "wo.": 3,
    // Donderdag
    donderdag: 4,
    dond: 4,
    "dond.": 4,
    do: 4,
    "do.": 4,
    // Vrijdag
    vrijdag: 5,
    vrij: 5,
    "vrij.": 5,
    vr: 5,
    "vr.": 5,
    // Zaterdag
    zaterdag: 6,
    zat: 6,
    "zat.": 6,
    "za": 6,
    "za.": 6,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    januari: 1,
    jan: 1,
    "jan.": 1,
    februari: 2,
    feb: 2,
    "feb.": 2,
    maart: 3,
    mar: 3,
    "mar.": 3,
    april: 4,
    apr: 4,
    "apr.": 4,
    mei: 5,
    juni: 6,
    jun: 6,
    "jun.": 6,
    juli: 7,
    jul: 7,
    "jul.": 7,
    augustus: 8,
    aug: 8,
    "aug.": 8,
    september: 9,
    sep: 9,
    "sep.": 9,
    sept: 9,
    "sept.": 9,
    oktober: 10,
    okt: 10,
    "okt.": 10,
    november: 11,
    nov: 11,
    "nov.": 11,
    december: 12,
    dec: 12,
    "dec.": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    een: 1,
    twee: 2,
    drie: 3,
    vier: 4,
    vijf: 5,
    zes: 6,
    zeven: 7,
    acht: 8,
    negen: 9,
    tien: 10,
    elf: 11,
    twaalf: 12,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    eerste: 1,
    tweede: 2,
    derde: 3,
    vierde: 4,
    vijfde: 5,
    zesde: 6,
    zevende: 7,
    achtste: 8,
    negende: 9,
    tiende: 10,
    elfde: 11,
    twaalfde: 12,
    dertiende: 13,
    veertiende: 14,
    vijftiende: 15,
    zestiende: 16,
    zeventiende: 17,
    achttiende: 18,
    negentiende: 19,
    twintigste: 20,
    "eenentwintigste": 21,
    "tweeëntwintigste": 22,
    "drieentwintigste": 23,
    "vierentwintigste": 24,
    "vijfentwintigste": 25,
    "zesentwintigste": 26,
    "zevenentwintigste": 27,
    "achtentwintig": 28,
    "negenentwintig": 29,
    "dertigste": 30,
    "eenendertigste": 31,
};

export const TIME_UNIT_DICTIONARY: { [word: string]: OpUnitType } = {
    sec: "second",
    second: "second",
    seconden: "second",
    min: "minute",
    mins: "minute",
    minute: "minute",
    minuut: "minute",
    minuten: "minute",
    minuutje: "minute",
    h: "hour",
    hr: "hour",
    hrs: "hour",
    uur: "hour",
    u: "hour",
    uren: "hour",
    dag: "d",
    dagen: "d",
    week: "week",
    weken: "week",
    maand: "month",
    maanden: "month",
    jaar: "year",
    jr: "year",
    jaren: "year",
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+[\\.,][0-9]+|halve?|half|paar)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "paar") {
        return 2;
    } else if (num === "half" || num.match(/halve?/)) {
        return 0.5;
    }
    // Replace "," with "." to support some European languages
    return parseFloat(num.replace(",", "."));
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:ste|de)?)`;
export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }
    num = num.replace(/(?:ste|de)$/i, "");
    return parseInt(num);
}

//-----------------------------

export const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s*(?:voor Christus|na Christus)|[1-2][0-9]{3}|[5-9][0-9])`;
export function parseYear(match: string): number {
    if (/voor Christus/i.test(match)) {
        // Before Christ
        match = match.replace(/voor Christus/i, "");
        return -parseInt(match);
    }

    if (/na Christus/i.test(match)) {
        match = match.replace(/na Christus/i, "");
        return parseInt(match);
    }

    const rawYearNumber = parseInt(match);
    return findMostLikelyADYear(rawYearNumber);
}

//-----------------------------

const SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,5}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s{0,5}`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(`(?:(?:binnen|in)\\s*)?`, SINGLE_TIME_UNIT_PATTERN);

export function parseTimeUnits(timeunitText): TimeUnits {
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
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
}
