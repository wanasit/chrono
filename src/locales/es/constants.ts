import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { Duration } from "../../calculation/duration";
import { Timeunit } from "../../types";

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    "domingo": 0,
    "dom": 0,
    "lunes": 1,
    "lun": 1,
    "martes": 2,
    "mar": 2,
    "miércoles": 3,
    "miercoles": 3,
    "mié": 3,
    "mie": 3,
    "jueves": 4,
    "jue": 4,
    "viernes": 5,
    "vie": 5,
    "sábado": 6,
    "sabado": 6,
    "sáb": 6,
    "sab": 6,
};

export const FULL_MONTH_NAME_DICTIONARY: { [word: string]: number } = {
    "enero": 1,
    "febrero": 2,
    "marzo": 3,
    "abril": 4,
    "mayo": 5,
    "junio": 6,
    "julio": 7,
    "agosto": 8,
    "septiembre": 9,
    "setiembre": 9,
    "octubre": 10,
    "noviembre": 11,
    "diciembre": 12,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    ...FULL_MONTH_NAME_DICTIONARY,
    "ene": 1,
    "ene.": 1,
    "feb": 2,
    "feb.": 2,
    "mar": 3,
    "mar.": 3,
    "abr": 4,
    "abr.": 4,
    "may": 5,
    "may.": 5,
    "jun": 6,
    "jun.": 6,
    "jul": 7,
    "jul.": 7,
    "ago": 8,
    "ago.": 8,
    "sep": 9,
    "sep.": 9,
    "sept": 9,
    "sept.": 9,
    "oct": 10,
    "oct.": 10,
    "nov": 11,
    "nov.": 11,
    "dic": 12,
    "dic.": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "uno": 1,
    "dos": 2,
    "tres": 3,
    "cuatro": 4,
    "cinco": 5,
    "seis": 6,
    "siete": 7,
    "ocho": 8,
    "nueve": 9,
    "diez": 10,
    "once": 11,
    "doce": 12,
    "trece": 13,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    "primero": 1,
    "primera": 1,
    "segundo": 2,
    "segunda": 2,
    "tercero": 3,
    "tercera": 3,
    "cuarto": 4,
    "cuarta": 4,
    "quinto": 5,
    "quinta": 5,
    "sexto": 6,
    "sexta": 6,
    "séptimo": 7,
    "septimo": 7,
    "séptima": 7,
    "septima": 7,
    "octavo": 8,
    "octava": 8,
    "noveno": 9,
    "novena": 9,
    "décimo": 10,
    "decimo": 10,
    "décima": 10,
    "decima": 10,
    "undécimo": 11,
    "undecimo": 11,
    "duodécimo": 12,
    "duodecimo": 12,
    "decimotercero": 13,
    "decimocuarto": 14,
    "decimoquinto": 15,
    "decimosexto": 16,
    "decimoséptimo": 17,
    "decimoseptimo": 17,
    "decimoctavo": 18,
    "decimonoveno": 19,
    "vigésimo": 20,
    "vigesimo": 20,
    "vigésimo primero": 21,
    "vigesimo primero": 21,
    "vigésimo segundo": 22,
    "vigesimo segundo": 22,
    "vigésimo tercero": 23,
    "vigesimo tercero": 23,
    "vigésimo cuarto": 24,
    "vigesimo cuarto": 24,
    "vigésimo quinto": 25,
    "vigesimo quinto": 25,
    "vigésimo sexto": 26,
    "vigesimo sexto": 26,
    "vigésimo séptimo": 27,
    "vigesimo septimo": 27,
    "vigésimo octavo": 28,
    "vigesimo octavo": 28,
    "vigésimo noveno": 29,
    "vigesimo noveno": 29,
    "trigésimo": 30,
    "trigesimo": 30,
    "trigésimo primero": 31,
    "trigesimo primero": 31,
};

export const TIME_UNIT_DICTIONARY_NO_ABBR: { [word: string]: Timeunit } = {
    "segundo": "second",
    "segundos": "second",
    "minuto": "minute",
    "minutos": "minute",
    "hora": "hour",
    "horas": "hour",
    "día": "day",
    "dias": "day",
    "días": "day",
    "semana": "week",
    "semanas": "week",
    "mes": "month",
    "meses": "month",
    "trimestre": "quarter",
    "trimestres": "quarter",
    "año": "year",
    "años": "year",
};

export const TIME_UNIT_DICTIONARY: { [word: string]: Timeunit } = {
    "s": "second",
    "seg": "second",
    "sec": "second",
    "segundo": "second",
    "segundos": "second",
    "m": "minute",
    "min": "minute",
    "mins": "minute",
    "minuto": "minute",
    "minutos": "minute",
    "h": "hour",
    "hr": "hour",
    "hrs": "hour",
    "hora": "hour",
    "horas": "hour",
    "d": "day",
    "día": "day",
    "dias": "day",
    "días": "day",
    "sem": "week",
    "semana": "week",
    "semanas": "week",
    "mes": "month",
    "meses": "month",
    "trim": "quarter",
    "trimestre": "quarter",
    "trimestres": "quarter",
    "a": "year",
    "año": "year",
    "años": "year",
    ...TIME_UNIT_DICTIONARY_NO_ABBR,
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+\\.[0-9]+|media(?:\\s{0,2}una?)?|un?a?\\b(?:\\s{0,2}pocos?)?|pocos?|algunos?|varios?|el|la|un?\\s{0,2}par(?:\\s{0,2}de)?)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "un" || num === "una" || num === "uno" || num === "el" || num === "la") {
        return 1;
    } else if (num.match(/pocos?/)) {
        return 3;
    } else if (num.match(/algunos?/)) {
        return 3;
    } else if (num.match(/media/)) {
        return 0.5;
    } else if (num.match(/par/)) {
        return 2;
    } else if (num.match(/varios?/)) {
        return 7;
    }

    return parseFloat(num);
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(
    ORDINAL_WORD_DICTIONARY
)}|[0-9]{1,2}(?:ro|do|to|mo|er|vo|no|ma|era|ero|avo|ava)?)`;

export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }

    num = num.replace(/(?:ro|do|to|mo|er|vo|no|ma|era|ero|avo|ava)$/i, "");
    return parseInt(num);
}

//-----------------------------

export const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s{0,2}(?:AC|DC|a\\.?\\s*c\\.?|d\\.?\\s*c\\.?)|[1-2][0-9]{3}|[5-9][0-9])`;
export function parseYear(match: string): number {
    if (/AC|a\.?\s*c\.?/i.test(match)) {
        // Antes de Cristo
        match = match.replace(/AC|a\.?\s*c\.?/i, "");
        return -parseInt(match);
    }

    if (/DC|d\.?\s*c\.?/i.test(match)) {
        // Después de Cristo
        match = match.replace(/DC|d\.?\s*c\.?/i, "");
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

const TIME_UNIT_CONNECTOR_PATTERN = `\\s{0,5},?(?:\\s*y)?\\s{0,5}`;

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(
    `(?:(?:aproximadamente|alrededor de|cerca de)\\s{0,3})?`,
    SINGLE_TIME_UNIT_PATTERN,
    TIME_UNIT_CONNECTOR_PATTERN
);

export const TIME_UNITS_NO_ABBR_PATTERN = repeatedTimeunitPattern(
    `(?:(?:aproximadamente|alrededor de|cerca de)\\s{0,3})?`,
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
    if (match[0].match(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ]+$/)) {
        return;
    }
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
}
