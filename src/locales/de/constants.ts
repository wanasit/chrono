import { OpUnitType, QUnitType } from "dayjs";
import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { TimeUnits } from "../../utils/timeunits";

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    "sonntag": 0,
    "so": 0,
    "montag": 1,
    "mo": 1,
    "dienstag": 2,
    "di": 2,
    "mittwoch": 3,
    "mi": 3,
    "donnerstag": 4,
    "do": 4,
    "freitag": 5,
    "fr": 5,
    "samstag": 6,
    "sa": 6,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    "januar": 1,
    "jänner": 1,
    "janner": 1,
    "jan": 1,
    "jan.": 1,
    "februar": 2,
    "feber": 2,
    "feb": 2,
    "feb.": 2,
    "märz": 3,
    "maerz": 3,
    "mär": 3,
    "mär.": 3,
    "mrz": 3,
    "mrz.": 3,
    "april": 4,
    "apr": 4,
    "apr.": 4,
    "mai": 5,
    "juni": 6,
    "jun": 6,
    "jun.": 6,
    "juli": 7,
    "jul": 7,
    "jul.": 7,
    "august": 8,
    "aug": 8,
    "aug.": 8,
    "september": 9,
    "sep": 9,
    "sep.": 9,
    "sept": 9,
    "sept.": 9,
    "oktober": 10,
    "okt": 10,
    "okt.": 10,
    "november": 11,
    "nov": 11,
    "nov.": 11,
    "dezember": 12,
    "dez": 12,
    "dez.": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "eins": 1,
    "eine": 1,
    "einem": 1,
    "einen": 1,
    "einer": 1,
    "zwei": 2,
    "drei": 3,
    "vier": 4,
    "fünf": 5,
    "fuenf": 5,
    "sechs": 6,
    "sieben": 7,
    "acht": 8,
    "neun": 9,
    "zehn": 10,
    "elf": 11,
    "zwölf": 12,
    "zwoelf": 12,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    erste: 1,
    ersten: 1,
    erster: 1,
    erstes: 1,
    zweite: 2,
    zweiten: 2,
    zweiter: 2,
    zweites: 2,
    dritte: 3,
    dritten: 3,
    dritter: 3,
    drittes: 3,
    vierte: 4,
    vierten: 4,
    fünfte: 5,
    fünften: 5,
    fünfter: 5,
    fünftes: 5,
    fuenfte: 5,
    fuenften: 5,
    fuenfter: 5,
    fuenftes: 5,
    sechste: 6,
    sechsten: 6,
    sechster: 6,
    sechstes: 6,
    siebte: 7,
    siebten: 7,
    siebter: 7,
    siebtes: 7,
    siebente: 7,
    siebenten: 7,
    siebenter: 7,
    siebentes: 7,
    achte: 8,
    achten: 8,
    achter: 8,
    achtes: 8,
    neunte: 9,
    neunten: 9,
    neunter: 9,
    neuntes: 9,
    zehnte: 10,
    zehnten: 10,
    zehnter: 10,
    zehntes: 10,
    elfte: 11,
    elften: 11,
    elfter: 11,
    elftes: 11,
    zwölfte: 12,
    zwölften: 12,
    zwölfter: 12,
    zwölftes: 12,
    zwoelfte: 12,
    zwoelften: 12,
    zwoelfter: 12,
    zwoelftes: 12,
    dreizehnte: 13,
    dreizehnten: 13,
    dreizehnter: 13,
    dreizehntes: 13,
    vierzehnte: 14,
    vierzehnten: 14,
    vierzehnter: 14,
    vierzehntes: 14,
    fünfzehnte: 15,
    fünfzehnten: 15,
    fünfzehnter: 15,
    fünfzehntes: 15,
    fuenfzehnte: 15,
    fuenfzehnten: 15,
    fuenfzehnter: 15,
    fuenfzehntes: 15,
    sechzehnte: 16,
    sechzehnten: 16,
    sechzehnter: 16,
    sechzehntes: 16,
    siebzehnte: 17,
    siebzehnten: 17,
    siebzehnter: 17,
    siebzehntes: 17,
    achtzehnte: 18,
    achtzehnten: 18,
    achtzehnter: 18,
    achtzehntes: 18,
    neunzehnte: 19,
    neunzehnten: 19,
    neunzehnter: 19,
    neunzehntes: 19,
    zwanzigste: 20,
    zwanzigsten: 20,
    zwanzigster: 20,
    zwanzigstes: 20,
    einundzwanzigste: 21,
    einundzwanzigsten: 21,
    einundzwanzigster: 21,
    einundzwanzigstes: 21,
    zweiundzwanzigste: 22,
    zweiundzwanzigsten: 22,
    zweiundzwanzigster: 22,
    zweiundzwanzigstes: 22,
    dreiundzwanzigste: 23,
    dreiundzwanzigsten: 23,
    dreiundzwanzigster: 23,
    dreiundzwanzigstes: 23,
    vierundzwanzigste: 24,
    vierundzwanzigsten: 24,
    vierundzwanzigster: 24,
    vierundzwanzigstes: 24,
    fünfundzwanzigste: 25,
    fünfundzwanzigsten: 25,
    fünfundzwanzigster: 25,
    fünfundzwanzigstes: 25,
    fuenfundzwanzigste: 25,
    fuenfundzwanzigsten: 25,
    fuenfundzwanzigster: 25,
    fuenfundzwanzigstes: 25,
    sechsundzwanzigste: 26,
    sechsundzwanzigsten: 26,
    sechsundzwanzigster: 26,
    sechsundzwanzigstes: 26,
    siebenundzwanzigste: 27,
    siebenundzwanzigsten: 27,
    siebenundzwanzigster: 27,
    siebenundzwanzigstes: 27,
    achtundzanzigste: 28,
    achtundzanzigsten: 28,
    achtundzanzigster: 28,
    achtundzanzigstes: 28,
    neundundzwanzigste: 29,
    neundundzwanzigsten: 29,
    neundundzwanzigster: 29,
    neundundzwanzigstes: 29,
    dreißigste: 30,
    dreißigsten: 30,
    dreißigster: 30,
    dreißigstes: 30,
    dreissigste: 30,
    dreissigsten: 30,
    dreissigster: 30,
    dreissigstes: 30,
    einunddreißigste: 31,
    einunddreißigsten: 31,
    einunddreißigster: 31,
    einunddreißigstes: 31,
    einunddreissigste: 31,
    einunddreissigsten: 31,
    einunddreissigster: 31,
    einunddreissigstes: 31,
};

export const TIME_UNIT_DICTIONARY: { [word: string]: OpUnitType | QUnitType } = {
    sek: "second",
    sekunde: "second",
    sekunden: "second",
    min: "minute",
    minute: "minute",
    minuten: "minute",
    h: "hour",
    std: "hour",
    stunde: "hour",
    stunden: "hour",
    d: "d",
    tag: "d",
    tage: "d",
    tagen: "d",
    woche: "week",
    wochen: "week",
    monat: "month",
    monate: "month",
    monaten: "month",
    monats: "month",
    quartal: "quarter",
    quartals: "quarter",
    quartale: "quarter",
    quartalen: "quarter",
    a: "year",
    j: "year",
    jr: "year",
    jahr: "year",
    jahre: "year",
    jahren: "year",
    jahres: "year",
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+,[0-9]+|(?:ein(?:e(?:m|n|r|s)?)?\\s*)?(?:halb(?:e(?:n|r)?)?|(?:drei\\s?)?viertel|vtl\\.?)|ein\\s+paar|einige(?:r|n)?|mehrere(?:r|n)?|wenige(?:r|n)?|ein(?:e(?:m|n|r|s)?)?)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "ein" || num === "einem" || num === "einen" || num === "einer" || num === "eines") {
        return 1;
    } else if (num.match(/wenige/)) {
        return 3;
    } else if (num.match(/halb/)) {
        return 0.5;
    } else if (num.match(/drei\s?viertel/)) {
        return 0.75;
    } else if (num.match(/viertel|vtl/)) {
        return 0.25;
    } else if (num.match(/paar/)) {
        return 2;
    } else if (num.match(/einige/)) {
        return 5;
    } else if (num.match(/mehrere/)) {
        return 7;
    }

    return parseFloat(num.replace(",", "."));
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}\\.?(?:te(?:n|r|s)?)?)`;
export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }

    num = num.replace(/(?:\\.?(?:te(?:n|r|s)?))$/i, "");
    return parseInt(num);
}

//-----------------------------

export const YEAR_PATTERN = `(?:[0-9]{1,4}(?:\\s*[vn]\\.?\\s*(?:C(?:hr)?|(?:u\\.?|d\\.?(?:\\s*g\\.?)?)?\\s*Z)\\.?|\\s*(?:u\\.?|d\\.?(?:\\s*g\\.)?)\\s*Z\\.?)?)`;
export function parseYear(match: string): number {
    if (/v/i.test(match)) {
        // v.Chr.
        return -parseInt(match.replace(/[^0-9]+/gi, ""));
    }

    if (/n/i.test(match)) {
        // n.Chr.
        return parseInt(match.replace(/[^0-9]+/gi, ""));
    }

    if (/z/i.test(match)) {
        // n.Chr. as "uZ" or "dgZ"
        return parseInt(match.replace(/[^0-9]+/gi, ""));
    }

    const rawYearNumber = parseInt(match);
    return findMostLikelyADYear(rawYearNumber);
}

//-----------------------------

const SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,5}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s{0,5}`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(
    `(?:(?:etwa|ungefähr|ca\\.?)\\s{0,3})?`,
    SINGLE_TIME_UNIT_PATTERN
);

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
