import { OpUnitType, QUnitType } from "dayjs";
import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { TimeUnits } from "../../utils/timeunits";

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    "domenica": 0,
    "dom": 0,
    "lunedì": 1,
    "lun": 1,
    "martedì": 2,
    "mar": 2,
    "mercoledì": 3,
    "merc": 3,
    "giovedì": 4,
    "giov": 4,
    "venerdì": 5,
    "ven": 5,
    "sabato": 6,
    "sab": 6,
};

export const FULL_MONTH_NAME_DICTIONARY: { [word: string]: number } = {};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    ...FULL_MONTH_NAME_DICTIONARY,
    "gennaio": 1,
    "gen": 1,
    "gen.": 1,
    "febbraio": 2,
    "feb": 2,
    "feb.": 2,
    "febraio": 2,
    "febb": 2,
    "febb.": 2,
    "marzo": 3,
    "mar": 3,
    "mar.": 3,
    "aprile": 4,
    "apr": 4,
    "apr.": 4,
    "maggio": 5,
    "mag": 5,
    "giugno": 6,
    "giu": 6,
    "luglio": 7,
    "lug": 7,
    "lugl": 7,
    "lug.": 7,
    "agosto": 8,
    "ago": 8,
    "settembre": 9,
    "set": 9,
    "set.": 9,
    "sett": 9,
    "sett.": 9,
    "ottobre": 10,
    "ott": 10,
    "ott.": 10,
    "novembre": 11,
    "nov": 11,
    "nov.": 11,
    "dicembre": 12,
    "dic": 12,
    "dice": 12,
    "dic.": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "uno": 1,
    "due": 2,
    "tre": 3,
    "quattro": 4,
    "cinque": 5,
    "sei": 6,
    "sette": 7,
    "otto": 8,
    "nove": 9,
    "dieci": 10,
    "undici": 11,
    "dodici": 12,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    "primo": 1,
    "secondo": 2,
    "terzo": 3,
    "quarto": 4,
    "quinto": 5,
    "sesto": 6,
    "settimo": 7,
    "ottavo": 8,
    "nono": 9,
    "decimo": 10,
    "undicesimo": 11,
    "dodicesimo": 12,
    "tredicesimo": 13,
    "quattordicesimo": 14,
    "quindicesimo": 15,
    "sedicesimo": 16,
    "diciassettesimo": 17,
    "diciottesimo": 18,
    "diciannovesimo": 19,
    "ventesimo": 20,
    "ventunesimo": 21,
    "ventiduesimo": 22,
    "ventitreesimo": 23,
    "ventiquattresimo": 24,
    "venticinquesimo": 25,
    "ventiseiesimo": 26,
    "ventisettesimo": 27,
    "ventottesimo": 28,
    "ventinovesimo": 29,
    "trentesimo": 30,
    "trentunesimo": 31,
};

export const TIME_UNIT_DICTIONARY: { [word: string]: OpUnitType | QUnitType } = {
    "sec": "second",
    "secondo": "second",
    "secondi": "second",
    "min": "minute",
    "mins": "minute",
    "minuti": "minute",
    "h": "hour",
    "hr": "hour",
    "o": "hour",
    "ora": "hour",
    "ore": "hour",
    "giorno": "d",
    "giorni": "d",
    "settimana": "week",
    "settimane": "week",
    "mese": "month",
    "trimestre": "quarter",
    "trimestri": "quarter",
    "anni": "year",
    "anno": "year",
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+\\.[0-9]+|half(?:\\s{0,2}un?)?|un?\\b(?:\\s{0,2}qualcuno)?|qualcuno|molti|a?\\s{0,2}alcuni\\s{0,2}(?:of)?)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "un" || num === "una") {
        return 1;
    } else if (num.match(/alcuni/)) {
        return 3;
    } else if (num.match(/metá/)) {
        return 0.5;
    } else if (num.match(/paio/)) {
        return 2;
    } else if (num.match(/molti/)) {
        return 7;
    }

    return parseFloat(num);
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(
    ORDINAL_WORD_DICTIONARY
)}|[0-9]{1,2}(?:mo|ndo|rzo|simo|esimo)?)`;
export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }

    num = num.replace(/(?:imo|ndo|rzo|rto|nto|sto|tavo|nono|cimo|timo|esimo)$/i, "");
    return parseInt(num);
}

//-----------------------------

export const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:BE|AD|BC|BCE|CE)|[1-2][0-9]{3}|[5-9][0-9])`;
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

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(`(?:(?:about|around)\\s{0,3})?`, SINGLE_TIME_UNIT_PATTERN);

export function parseTimeUnits(timeunitText): TimeUnits {
    const fragments = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length).trim();
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    return fragments;
}

function collectDateTimeFragment(fragments, match) {
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
}
