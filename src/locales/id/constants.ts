import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { Duration } from "../../calculation/duration";
import { Timeunit } from "../../types";

/**
 * Note: "minggu" means both "Sunday" and "week". The weekday parser only treats it as Sunday
 * when it is preceded by "hari" (e.g. "hari Minggu"). "ahad" is an unambiguous alternative.
 */
export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    "minggu": 0,
    "ahad": 0,
    "senin": 1,
    "selasa": 2,
    "rabu": 3,
    "kamis": 4,
    "jumat": 5,
    "jum'at": 5,
    "sabtu": 6,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    "januari": 1,
    "jan": 1,
    "jan.": 1,
    "februari": 2,
    "pebruari": 2,
    "feb": 2,
    "feb.": 2,
    "peb": 2,
    "peb.": 2,
    "maret": 3,
    "mar": 3,
    "mar.": 3,
    "april": 4,
    "apr": 4,
    "apr.": 4,
    "mei": 5,
    "juni": 6,
    "jun": 6,
    "jun.": 6,
    "juli": 7,
    "jul": 7,
    "jul.": 7,
    "agustus": 8,
    "agu": 8,
    "agu.": 8,
    "agt": 8,
    "agt.": 8,
    "ags": 8,
    "ags.": 8,
    "september": 9,
    "sep": 9,
    "sep.": 9,
    "sept": 9,
    "sept.": 9,
    "oktober": 10,
    "okt": 10,
    "okt.": 10,
    "november": 11,
    "nopember": 11,
    "nov": 11,
    "nov.": 11,
    "nop": 11,
    "nop.": 11,
    "desember": 12,
    "des": 12,
    "des.": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "satu": 1,
    "dua": 2,
    "tiga": 3,
    "empat": 4,
    "lima": 5,
    "enam": 6,
    "tujuh": 7,
    "delapan": 8,
    "sembilan": 9,
    "sepuluh": 10,
    "sebelas": 11,
    "dua belas": 12,
};

export const TIME_UNIT_DICTIONARY: { [word: string]: Timeunit } = {
    "detik": "second",
    "menit": "minute",
    "jam": "hour",
    "hari": "day",
    "minggu": "week",
    "pekan": "week",
    "bulan": "month",
    "tahun": "year",
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+[\\.,][0-9]+|setengah)`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "setengah") {
        return 0.5;
    }
    // Indonesian uses "," as the decimal separator
    return parseFloat(num.replace(",", "."));
}

//-----------------------------

// 1945  |  45  |  500 SM (Sebelum Masehi = BC)  |  2024 M (Masehi = AD)
export const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s*(?:SM|M)(?=\\W|$)|[1-2][0-9]{3}|[5-9][0-9])`;

export function parseYear(match: string): number {
    if (/SM/i.test(match)) {
        return -parseInt(match.replace(/SM/i, ""));
    }
    if (/M/i.test(match)) {
        return parseInt(match.replace(/M/i, ""));
    }
    return findMostLikelyADYear(parseInt(match));
}

//-----------------------------

// "3 hari"  |  "dua minggu"  |  "sebulan" (se- prefix = one)
const SINGLE_TIME_UNIT_PATTERN = `(?:(${NUMBER_PATTERN})\\s{0,5}|se)(${matchAnyPattern(TIME_UNIT_DICTIONARY)})\\s{0,5}`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern("", SINGLE_TIME_UNIT_PATTERN, "\\s{0,5}(?:,|dan)?\\s{0,5}");

export function parseDuration(timeunitText: string): Duration {
    const fragments: { [key: string]: number } = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        const num = match[1] ? parseNumberPattern(match[1]) : 1;
        const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
        fragments[unit] = num;
        remainingText = remainingText.substring(match.index + match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    return fragments as Duration;
}
