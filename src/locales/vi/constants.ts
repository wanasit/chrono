import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { Duration } from "../../calculation/duration";
import { Timeunit } from "../../types";

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    "ch\u1ee7 nh\u1eadt": 0,
    "cn": 0,
    "th\u1ee9 hai": 1,
    "t2": 1,
    "th\u1ee9 ba": 2,
    "t3": 2,
    "th\u1ee9 t\u01b0": 3,
    "t4": 3,
    "th\u1ee9 n\u0103m": 4,
    "t5": 4,
    "th\u1ee9 s\u00e1u": 5,
    "t6": 5,
    "th\u1ee9 b\u1ea3y": 6,
    "t7": 6,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    "th\u00e1ng 1": 1,
    "th\u00e1ng m\u1ed9t": 1,
    "th\u00e1ng gi\u00eang": 1,
    "th\u00e1ng 2": 2,
    "th\u00e1ng hai": 2,
    "th\u00e1ng 3": 3,
    "th\u00e1ng ba": 3,
    "th\u00e1ng 4": 4,
    "th\u00e1ng t\u01b0": 4,
    "th\u00e1ng 5": 5,
    "th\u00e1ng n\u0103m": 5,
    "th\u00e1ng 6": 6,
    "th\u00e1ng s\u00e1u": 6,
    "th\u00e1ng 7": 7,
    "th\u00e1ng b\u1ea3y": 7,
    "th\u00e1ng 8": 8,
    "th\u00e1ng t\u00e1m": 8,
    "th\u00e1ng 9": 9,
    "th\u00e1ng ch\u00edn": 9,
    "th\u00e1ng 10": 10,
    "th\u00e1ng m\u01b0\u1eddi": 10,
    "th\u00e1ng 11": 11,
    "th\u00e1ng m\u01b0\u1eddi m\u1ed9t": 11,
    "th\u00e1ng 12": 12,
    "th\u00e1ng m\u01b0\u1eddi hai": 12,
    "th\u00e1ng ch\u1ea1p": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "m\u1ed9t": 1,
    "hai": 2,
    "ba": 3,
    "b\u1ed1n": 4,
    "n\u0103m": 5,
    "s\u00e1u": 6,
    "b\u1ea3y": 7,
    "t\u00e1m": 8,
    "ch\u00edn": 9,
    "m\u01b0\u1eddi": 10,
    "m\u01b0\u1eddi m\u1ed9t": 11,
    "m\u01b0\u1eddi hai": 12,
};

export const TIME_UNIT_DICTIONARY: { [word: string]: Timeunit } = {
    "gi\u00e2y": "second",
    "ph\u00fat": "minute",
    "gi\u1edd": "hour",
    "ng\u00e0y": "day",
    "tu\u1ea7n": "week",
    "th\u00e1ng": "month",
    "n\u0103m": "year",
};

export const NUMBER_PATTERN = "(?:" + matchAnyPattern(INTEGER_WORD_DICTIONARY) + "|[0-9]+|[0-9]+\\.[0-9]+)";

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) return INTEGER_WORD_DICTIONARY[num];
    return parseFloat(num);
}

// YYYY, YYYY TCN (Tr\u01b0\u1edbc C\u00f4ng nguy\u00ean = BC)
export const YEAR_PATTERN = "(?:[0-9]{1,4}(?:\\s*TCN)?)";

export function parseYear(match: string): number {
    const upper = match.toUpperCase();
    const num = parseInt(match.replace(/[^0-9]+/g, ""));
    if (/TCN/.test(upper)) return -num;
    return findMostLikelyADYear(num);
}

const SINGLE_TIME_UNIT_PATTERN = "(" + NUMBER_PATTERN + ")\\s{0,5}(" + matchAnyPattern(TIME_UNIT_DICTIONARY) + ")\\s{0,5}";
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern("", SINGLE_TIME_UNIT_PATTERN);

export function parseDuration(timeunitText: string): Duration {
    const fragments: { [key: string]: number } = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        const num = parseNumberPattern(match[1]);
        const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
        fragments[unit] = num;
        remainingText = remainingText.substring(match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    return fragments as Duration;
}
