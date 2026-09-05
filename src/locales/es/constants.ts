import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
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

export const TIME_UNIT_DICTIONARY: { [word: string]: Timeunit } = {
    "sec": "second",
    "segundo": "second",
    "segundos": "second",
    "min": "minute",
    "mins": "minute",
    "minuto": "minute",
    "minutos": "minute",
    "h": "hour",
    "hr": "hour",
    "hrs": "hour",
    "hora": "hour",
    "horas": "hour",
    "día": "day",
    "días": "day",
    "semana": "week",
    "semanas": "week",
    "mes": "month",
    "meses": "month",
    "cuarto": "quarter",
    "cuartos": "quarter",
    "año": "year",
    "años": "year",
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+\\.[0-9]+|un?|uno?|una?|algunos?|unos?|demi-?)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "un" || num === "una" || num === "uno") {
        return 1;
    } else if (num.match(/algunos?/)) {
        return 3;
    } else if (num.match(/unos?/)) {
        return 3;
    } else if (num.match(/media?/)) {
        return 0.5;
    }

    return parseFloat(num);
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(
    ORDINAL_WORD_DICTIONARY
)}|[0-9]{1,2}(?:º|ª|°|ro|do|to|mo|er|vo|no|ma|era|ero|avo|ava)?)`;

export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }

    num = num.replace(/(?:º|ª|°|ro|do|to|mo|er|vo|no|ma|era|ero|avo|ava)$/i, "");
    return parseInt(num);
}
//-----------------------------
// 88 p. Chr. n.
// 234 AC
export const YEAR_PATTERN = "[0-9]{1,4}(?![^\\s]\\d)(?:\\s*[a|d]\\.?\\s*c\\.?|\\s*a\\.?\\s*d\\.?)?";
export function parseYear(match: string): number {
    if (match.match(/^[0-9]{1,4}$/)) {
        let yearNumber = parseInt(match);
        if (yearNumber < 100) {
            if (yearNumber > 50) {
                yearNumber = yearNumber + 1900;
            } else {
                yearNumber = yearNumber + 2000;
            }
        }
        return yearNumber;
    }

    if (match.match(/a\.?\s*c\.?/i)) {
        match = match.replace(/a\.?\s*c\.?/i, "");
        return -parseInt(match);
    }

    return parseInt(match);
}

const SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,5}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s{0,5}`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern("", SINGLE_TIME_UNIT_PATTERN);

import { Duration } from "../../calculation/duration";
export function parseDuration(timeunitText): Duration {
    const fragments = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    return fragments as Duration;
}

function collectDateTimeFragment(fragments, match) {
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
}
