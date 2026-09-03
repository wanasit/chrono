import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { Duration } from "../../calculation/duration";
import { Timeunit } from "../../types";

export const REGEX_PARTS = {
    leftBoundary: "([^\\p{L}\\p{N}_]|^)",
    rightBoundary: "(?=[^\\p{L}\\p{N}_]|$)",
    flags: "iu",
};

export function toWesternDigits(text: string): string {
    return text.replace(/[٠-٩]/g, (d) => (d.charCodeAt(0) - 1632).toString());
}

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    "الأحد": 0,
    "الاحد": 0,
    "أحد": 0,
    "احد": 0,
    "الإثنين": 1,
    "الاثنين": 1,
    "إثنين": 1,
    "اثنين": 1,
    "الثلاثاء": 2,
    "ثلاثاء": 2,
    "الأربعاء": 3,
    "الاربعاء": 3,
    "أربعاء": 3,
    "اربعاء": 3,
    "الخميس": 4,
    "خميس": 4,
    "الجمعة": 5,
    "جمعة": 5,
    "السبت": 6,
    "سبت": 6,
};

export const FULL_MONTH_NAME_DICTIONARY: { [word: string]: number } = {
    // Standard Gregorian
    "يناير": 1,
    "فبراير": 2,
    "مارس": 3,
    "أبريل": 4,
    "ابريل": 4,
    "مايو": 5,
    "يونيو": 6,
    "يوليو": 7,
    "أغسطس": 8,
    "اغسطس": 8,
    "سبتمبر": 9,
    "أكتوبر": 10,
    "اكتوبر": 10,
    "نوفمبر": 11,
    "ديسمبر": 12,

    // Levantine / Mesopotamian Gregorian
    "كانون الثاني": 1,
    "شباط": 2,
    "آذار": 3,
    "اذار": 3,
    "نيسان": 4,
    "أيار": 5,
    "ايار": 5,
    "حزيران": 6,
    "تموز": 7,
    "آب": 8,
    "اب": 8,
    "أيلول": 9,
    "ايلول": 9,
    "تشرين الأول": 10,
    "تشرين الاول": 10,
    "تشرين الثاني": 11,
    "كانون الأول": 12,
    "كانون الاول": 12,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    ...FULL_MONTH_NAME_DICTIONARY,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "واحد": 1,
    "واحدة": 1,
    "اثنان": 2,
    "اثنين": 2,
    "اثنتان": 2,
    "اثنتين": 2,
    "ثلاثة": 3,
    "ثلاث": 3,
    "أربعة": 4,
    "اربعة": 4,
    "أربع": 4,
    "اربع": 4,
    "خمسة": 5,
    "خمس": 5,
    "ستة": 6,
    "ست": 6,
    "سبعة": 7,
    "سبع": 7,
    "ثمانية": 8,
    "ثمان": 8,
    "تسعة": 9,
    "تسع": 9,
    "عشرة": 10,
    "عشر": 10,
    "أحد عشر": 11,
    "احد عشر": 11,
    "إحدى عشرة": 11,
    "احدى عشرة": 11,
    "اثنا عشر": 12,
    "اثني عشر": 12,
    "اثنتا عشرة": 12,
    "اثنتي عشرة": 12,
    "نصف": 0.5,
    "نص": 0.5,
    "ربع": 0.25,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    "الأول": 1,
    "الاول": 1,
    "الأولى": 1,
    "الاولى": 1,
    "أول": 1,
    "اول": 1,
    "حادي": 1,
    "الحادي": 1,
    "الثاني": 2,
    "الثانية": 2,
    "ثاني": 2,
    "الثالث": 3,
    "الثالثة": 3,
    "ثالث": 3,
    "الرابع": 4,
    "الرابعة": 4,
    "رابع": 4,
    "الخامس": 5,
    "الخامسة": 5,
    "خامس": 5,
    "السادس": 6,
    "السادسة": 6,
    "سادس": 6,
    "السابع": 7,
    "السابعة": 7,
    "سابع": 7,
    "الثامن": 8,
    "الثامنة": 8,
    "ثامن": 8,
    "التاسع": 9,
    "التاسعة": 9,
    "تاسع": 9,
    "العاشر": 10,
    "العاشرة": 10,
    "عاشر": 10,
    "الحادي عشر": 11,
    "الحادية عشرة": 11,
    "الثاني عشر": 12,
    "الثانية عشرة": 12,
    "الثالث عشر": 13,
    "الثالثة عشرة": 13,
    "الرابع عشر": 14,
    "الرابعة عشرة": 14,
    "الخامس عشر": 15,
    "الخامسة عشرة": 15,
    "السادس عشر": 16,
    "السادسة عشرة": 16,
    "السابع عشر": 17,
    "السابعة عشرة": 17,
    "الثامن عشر": 18,
    "الثامنة عشرة": 18,
    "التاسع عشر": 19,
    "التاسعة عشرة": 19,
    "العشرون": 20,
    "العشرين": 20,
    "الحادي والعشرون": 21,
    "الحادية والعشرون": 21,
    "الواحد والعشرون": 21,
    "الثاني والعشرون": 22,
    "الثانية والعشرون": 22,
    "الثالث والعشرون": 23,
    "الثالثة والعشرون": 23,
    "الرابع والعشرون": 24,
    "الرابعة والعشرون": 24,
    "الخامس والعشرون": 25,
    "الخامسة والعشرون": 25,
    "السادس والعشرون": 26,
    "السادسة والعشرون": 26,
    "السابع والعشرون": 27,
    "السابعة والعشرون": 27,
    "الثامن والعشرون": 28,
    "الثامنة والعشرون": 28,
    "التاسع والعشرون": 29,
    "التاسعة والعشرون": 29,
    "الثلاثون": 30,
    "الثلاثين": 30,
    "الحادي والثلاثون": 31,
    "الحادية والثلاثون": 31,
    "الواحد والثلاثون": 31,
};

export const TIME_UNIT_DICTIONARY: { [word: string]: Timeunit } = {
    // Second
    "ثانية": "second",
    "ثواني": "second",
    "ثوان": "second",
    "ثوانٍ": "second",

    // Minute
    "دقيقة": "minute",
    "دقائق": "minute",

    // Hour
    "ساعة": "hour",
    "ساعات": "hour",

    // Day
    "يوم": "day",
    "أيام": "day",
    "ايام": "day",

    // Week
    "أسبوع": "week",
    "اسبوع": "week",
    "أسابيع": "week",
    "اسابيع": "week",

    // Month
    "شهر": "month",
    "أشهر": "month",
    "اشهر": "month",
    "شهور": "month",

    // Year
    "سنة": "year",
    "سنوات": "year",
    "سنين": "year",
    "عام": "year",
    "أعوام": "year",
    "اعوام": "year",
};

export const DUAL_TIME_UNIT_DICTIONARY: { [word: string]: Timeunit } = {
    "ثانيتان": "second",
    "ثانيتين": "second",
    "دقيقتان": "minute",
    "دقيقتين": "minute",
    "ساعتان": "hour",
    "ساعتين": "hour",
    "يومان": "day",
    "يومين": "day",
    "أسبوعان": "week",
    "اسبوعان": "week",
    "أسبوعين": "week",
    "اسبوعين": "week",
    "شهران": "month",
    "شهرين": "month",
    "سنتان": "year",
    "سنتين": "year",
    "عامان": "year",
    "عامين": "year",
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9٠-٩]+|[0-9٠-٩]+[\\.,][0-9٠-٩]+|\\s{0,3})`;

export function parseNumberPattern(match: string): number {
    const clean = match.trim();
    if (INTEGER_WORD_DICTIONARY[clean] !== undefined) {
        return INTEGER_WORD_DICTIONARY[clean];
    }
    if (clean === "") {
        return 1;
    }
    const western = toWesternDigits(clean).replace(",", ".");
    return parseFloat(western);
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9٠-٩]{1,2})`;

export function parseOrdinalNumberPattern(match: string): number {
    const clean = match.trim();
    if (ORDINAL_WORD_DICTIONARY[clean] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[clean];
    }
    const western = toWesternDigits(clean);
    return parseInt(western, 10);
}

//-----------------------------

const yearSuffix = "(?:\\s*(?:ميلادية|ميلادي|م))?";
const bcSuffix = "(?:\\s*(?:قبل الميلاد|ق\\.م))";
export const YEAR_PATTERN = `(?:[1-9١-٩][0-9٠-٩]{0,3}${yearSuffix}${bcSuffix}|[1-2١-٢][0-9٠-٩]{3}${yearSuffix}|[5-9٥-٩][0-9٠-٩]${yearSuffix})`;

export function parseYear(match: string): number {
    let clean = match.trim();
    const isBC = /(قبل الميلاد|ق\.م)/i.test(clean);
    clean = clean.replace(/(قبل الميلاد|ق\.م|ميلادية|ميلادي|م)/gi, "").trim();
    const western = toWesternDigits(clean);
    const rawYearNumber = parseInt(western, 10);
    if (isBC) {
        return -rawYearNumber;
    }
    return findMostLikelyADYear(rawYearNumber);
}

//-----------------------------

const DUAL_UNIT_PATTERN = `(${matchAnyPattern(DUAL_TIME_UNIT_DICTIONARY)})`;
const NUMBER_WITH_UNIT_PATTERN = `(?:(${NUMBER_PATTERN})\\s{0,3})?(${matchAnyPattern(TIME_UNIT_DICTIONARY)})`;

const SINGLE_TIME_UNIT_PATTERN = `(?:${DUAL_UNIT_PATTERN}|${NUMBER_WITH_UNIT_PATTERN})`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, REGEX_PARTS.flags);

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(
    `(?:(?:خلال|في غضون|في خلال|حوالي|تقريباً|تقريبا)\\s{0,3})?`,
    SINGLE_TIME_UNIT_PATTERN
);

export function parseDuration(timeunitText: string): Duration {
    const fragments: { [c in Timeunit]?: number } = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match.index + match[0].length).trim();
        if (!remainingText) break;
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    return fragments as Duration;
}

function collectDateTimeFragment(fragments: { [c in Timeunit]?: number }, match: RegExpMatchArray) {
    if (match[1]) {
        // Dual form (e.g. يومين, ساعتين)
        const dualWord = match[1].trim();
        const unit = DUAL_TIME_UNIT_DICTIONARY[dualWord];
        if (unit) {
            fragments[unit] = 2;
        }
    } else if (match[3]) {
        // Standard form (e.g. 3 أيام, ساعة)
        const numStr = match[2] ? match[2].trim() : "";
        const num = parseNumberPattern(numStr);
        const unitWord = match[3].trim();
        const unit = TIME_UNIT_DICTIONARY[unitWord];
        if (unit) {
            fragments[unit] = num;
        }
    }
}
