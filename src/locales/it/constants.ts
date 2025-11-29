import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { Duration } from "../../calculation/duration";
import { Timeunit, Weekday } from "../../types";

export const WEEKDAY_DICTIONARY: { [word: string]: Weekday } = {
    domenica: 0,
    dom: 0,
    "dom.": 0,
    lunedì: 1,
    lunedi: 1,
    lun: 1,
    "lun.": 1,
    martedì: 2,
    martedi: 2,
    mar: 2,
    "mar.": 2,
    mercoledì: 3,
    mercoledi: 3,
    mer: 3,
    "mer.": 3,
    giovedì: 4,
    giovedi: 4,
    gio: 4,
    "gio.": 4,
    venerdì: 5,
    venerdi: 5,
    ven: 5,
    "ven.": 5,
    sabato: 6,
    sab: 6,
    "sab.": 6,
};

export const FULL_MONTH_NAME_DICTIONARY: { [word: string]: number } = {
    gennaio: 1,
    febbraio: 2,
    marzo: 3,
    aprile: 4,
    maggio: 5,
    giugno: 6,
    luglio: 7,
    agosto: 8,
    settembre: 9,
    ottobre: 10,
    novembre: 11,
    dicembre: 12,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    ...FULL_MONTH_NAME_DICTIONARY,
    gen: 1,
    "gen.": 1,
    feb: 2,
    "feb.": 2,
    mar: 3,
    "mar.": 3,
    apr: 4,
    "apr.": 4,
    mag: 5,
    "mag.": 5,
    giu: 6,
    "giu.": 6,
    lug: 7,
    "lug.": 7,
    ago: 8,
    "ago.": 8,
    set: 9,
    "set.": 9,
    sett: 9,
    "sett.": 9,
    ott: 10,
    "ott.": 10,
    nov: 11,
    "nov.": 11,
    dic: 12,
    "dic.": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    uno: 1,
    una: 1,
    un: 1,
    due: 2,
    tre: 3,
    quattro: 4,
    cinque: 5,
    sei: 6,
    sette: 7,
    otto: 8,
    nove: 9,
    dieci: 10,
    undici: 11,
    dodici: 12,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    primo: 1,
    prima: 1,
    "1°": 1,
    "1ª": 1,
    secondo: 2,
    seconda: 2,
    "2°": 2,
    "2ª": 2,
    terzo: 3,
    terza: 3,
    "3°": 3,
    "3ª": 3,
    quarto: 4,
    quarta: 4,
    "4°": 4,
    "4ª": 4,
    quinto: 5,
    quinta: 5,
    "5°": 5,
    "5ª": 5,
    sesto: 6,
    sesta: 6,
    "6°": 6,
    "6ª": 6,
    settimo: 7,
    settima: 7,
    "7°": 7,
    "7ª": 7,
    ottavo: 8,
    ottava: 8,
    "8°": 8,
    "8ª": 8,
    nono: 9,
    nona: 9,
    "9°": 9,
    "9ª": 9,
    decimo: 10,
    decima: 10,
    "10°": 10,
    "10ª": 10,
    undicesimo: 11,
    undicesima: 11,
    "11°": 11,
    "11ª": 11,
    dodicesimo: 12,
    dodicesima: 12,
    "12°": 12,
    "12ª": 12,
    tredicesimo: 13,
    tredicesima: 13,
    "13°": 13,
    "13ª": 13,
    quattordicesimo: 14,
    quattordicesima: 14,
    "14°": 14,
    "14ª": 14,
    quindicesimo: 15,
    quindicesima: 15,
    "15°": 15,
    "15ª": 15,
    sedicesimo: 16,
    sedicesima: 16,
    "16°": 16,
    "16ª": 16,
    diciassettesimo: 17,
    diciassettesima: 17,
    "17°": 17,
    "17ª": 17,
    diciottesimo: 18,
    diciottesima: 18,
    "18°": 18,
    "18ª": 18,
    diciannovesimo: 19,
    diciannovesima: 19,
    "19°": 19,
    "19ª": 19,
    ventesimo: 20,
    ventesima: 20,
    "20°": 20,
    "20ª": 20,
    ventunesimo: 21,
    ventunesima: 21,
    "21°": 21,
    "21ª": 21,
    ventiduesimo: 22,
    ventiduesima: 22,
    "22°": 22,
    "22ª": 22,
    ventitreesimo: 23,
    ventitreesima: 23,
    "23°": 23,
    "23ª": 23,
    ventiquattresimo: 24,
    ventiquattresima: 24,
    "24°": 24,
    "24ª": 24,
    venticinquesimo: 25,
    venticinquesima: 25,
    "25°": 25,
    "25ª": 25,
    ventiseiesimo: 26,
    ventiseiesima: 26,
    "26°": 26,
    "26ª": 26,
    ventisettesimo: 27,
    ventisettesima: 27,
    "27°": 27,
    "27ª": 27,
    ventottesimo: 28,
    ventottesima: 28,
    "28°": 28,
    "28ª": 28,
    ventinovesimo: 29,
    ventinovesima: 29,
    "29°": 29,
    "29ª": 29,
    trentesimo: 30,
    trentesima: 30,
    "30°": 30,
    "30ª": 30,
    trentunesimo: 31,
    trentunesima: 31,
    "31°": 31,
    "31ª": 31,
};

export const TIME_UNIT_DICTIONARY_NO_ABBR: { [word: string]: Timeunit } = {
    secondo: "second",
    secondi: "second",
    minuto: "minute",
    minuti: "minute",
    ora: "hour",
    ore: "hour",
    giorno: "day",
    giorni: "day",
    settimana: "week",
    settimane: "week",
    mese: "month",
    mesi: "month",
    trimestre: "quarter",
    trimestri: "quarter",
    anno: "year",
    anni: "year",
};

export const TIME_UNIT_DICTIONARY: { [word: string]: Timeunit } = {
    s: "second",
    sec: "second",
    secondo: "second",
    secondi: "second",
    m: "minute",
    min: "minute",
    minuto: "minute",
    minuti: "minute",
    h: "hour",
    ora: "hour",
    ore: "hour",
    g: "day",
    gg: "day",
    giorno: "day",
    giorni: "day",
    sett: "week",
    settimana: "week",
    settimane: "week",
    mese: "month",
    mesi: "month",
    trim: "quarter",
    trimestre: "quarter",
    trimestri: "quarter",
    anno: "year",
    anni: "year",
    // Also, merge the entries from the full-name dictionary.
    // We leave the duplicated entries for readability.
    ...TIME_UNIT_DICTIONARY_NO_ABBR,
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+\\.[0-9]+|mezz[oa]?(?:\\s{0,2})?|un(?:'|\\s{0,2})?|qualche|alcuni|paio\\s{0,2}(?:di)?)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "un" || num === "un'" || num === "una" || num === "uno") {
        return 1;
    } else if (num.match(/qualche/)) {
        return 3;
    } else if (num.match(/mezz/)) {
        return 0.5;
    } else if (num.match(/paio/)) {
        return 2;
    } else if (num.match(/alcuni/)) {
        return 7;
    }

    return parseFloat(num);
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:°|ª|º)?)`;
export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }

    num = num.replace(/(?:°|ª|º)$/i, "");
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

const TIME_UNIT_CONNECTOR_PATTERN = `\\s{0,5},?(?:\\s*e)?\\s{0,5}`;

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(
    `(?:(?:circa|approssimativamente)\\s{0,3})?`,
    SINGLE_TIME_UNIT_PATTERN,
    TIME_UNIT_CONNECTOR_PATTERN
);
export const TIME_UNITS_NO_ABBR_PATTERN = repeatedTimeunitPattern(
    `(?:(?:circa|approssimativamente)\\s{0,3})?`,
    SINGLE_TIME_UNIT_NO_ABBR_PATTERN,
    TIME_UNIT_CONNECTOR_PATTERN
);

export function parseDuration(timeunitText): null | Duration {
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
    return fragments as Duration;
}

function collectDateTimeFragment(fragments, match) {
    if (match[0].match(/^[a-zA-Z]+$/)) {
        return;
    }
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
}
