import { OpUnitType, QUnitType } from "dayjs";
import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { TimeUnits } from "../../utils/timeunits";

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    lunedì: 1,
    lun: 1,
    martedì: 2,
    mar: 2,
    mercoledì: 3,
    mer: 3,
    giovedì: 4,
    gio: 4,
    venerdì: 5,
    ven: 5,
    sabato: 6,
    sab: 6,
    domenica: 7,
    dom: 7,
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
    febb: 2,
    "febb.": 2,
    marz: 3,
    "mar.": 3,
    apr: 4,
    "apr.": 4,
    mag: 5,
    "mag.": 5,
    magg: 5,
    "magg.": 5,
    giu: 6,
    "giu.": 6,
    lug: 7,
    "lug.": 7,
    lugl: 7,
    "lugl.": 7,
    ago: 8,
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
    tredici: 13,
    quattordici: 14,
    quindici: 15,
    sedici: 16,
    diciassette: 17,
    diciotto: 18,
    diciannove: 19,
    venti: 20,
    ventuno: 21,
    ventidue: 22,
    ventitre: 23,
    ventiquattro: 24,
    venticinque: 25,
    ventisei: 26,
    ventisette: 27,
    ventotto: 28,
    ventinove: 29,
    trenta: 30,
    trentuno: 31,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    primo: 1,
    secondo: 2,
    terzo: 3,
    quarto: 4,
    quinto: 5,
    sesto: 6,
    settimo: 7,
    ottavo: 8,
    nono: 9,
    decimo: 10,
    undicesimo: 11,
    dodicesimo: 12,
    tredicesimo: 13,
    quattordicesimo: 14,
    quindicesimo: 15,
    sedicesimo: 16,
    diciassettesimo: 17,
    diciottesimo: 18,
    diciannovesimo: 19,
    ventesimo: 20,
    ventunesimo: 21,
    ventiduesimo: 22,
    ventitreesimo: 23,
    ventiquattresimo: 24,
    venticinquesimo: 25,
    ventiseiesimo: 26,
    ventisettesimo: 27,
    ventottesimo: 28,
    ventinovesimo: 29,
    trentesimo: 30,
    trentunesimo: 31,
};

export const TIME_UNIT_DICTIONARY: { [word: string]: OpUnitType | QUnitType } = {
    s: "second",
    sec: "second",
    secondo: "second",
    secondi: "second",
    m: "minute",
    min: "minute",
    minuto: "minute",
    minuti: "minute",
    h: "hour",
    o: "hour",
    ora: "hour",
    ore: "hour",
    giorno: "d",
    giorni: "d",
    settimana: "week",
    settimane: "week",
    mese: "month",
    mesi: "month",
    trimestre: "quarter",
    trimestri: "quarter",
    anno: "year",
    anni: "year",
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+[\\.,][0-9]+|un\\.*?|metà|mezza|mezz'|un\\s*paio\\s*d\\.*)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "un" || num === "un'" || num === "una") {
        return 1;
    } else if (num === "metà" || num === "mezz'" || num === "mezza") {
        return 0.5;
    } else if (num === "un paio di" || num === "un paio d'" ) {
        return 2;
    }
    // Replace "," with "." to support some European languages
    //return parseFloat(num.replace(",", "."));
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:primo|[0-9]{1,2}(?:°)?)`;

export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }

    num = num.replace(/(?:°)$/i, "");
    return parseInt(num);
}

//-----------------------------

export const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:AUC|AVC|a.U.c.|AU|a.C.|aC|d.C.|dC)|[1-2][0-9]{3}|[5-9][0-9])`;
export function parseYear(match: string): number {

    if (/(AUC|AVC|a.U.c.|AU)/i.test(match)) {
        // Ad Urbe Condita
        match = match.replace(/(AUC|AVC|a.U.c.|AU)/i, "");
        return parseInt(match) - 753;
    }    

    if (/(a.C.|aC)/i.test(match)) {
        // Before Christ
        match = match.replace(/(a.C.|aC)/i, "");
        return -parseInt(match);
    }

    if (/(d.C.|dC)/i.test(match)) {
        // Anno Domini
        match = match.replace(/(d.C.|dC)/i, "");
        return parseInt(match);
    }

    const rawYearNumber = parseInt(match);
    return findMostLikelyADYear(rawYearNumber);
}

//-----------------------------

const SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,5}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s{0,5}`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(`(?:(?:tra\\s*le|circa\\s*?alle|per\\s*?le)\\s{0,3})?`, SINGLE_TIME_UNIT_PATTERN);

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
