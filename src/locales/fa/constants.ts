import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { Timeunit } from "../../types";

/**
 * Persian (Farsi) weekday dictionary
 * Maps Persian weekday names to their numeric values (0 = Sunday, 6 = Saturday)
 */
export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    "یکشنبه": 0,
    "یک‌شنبه": 0,
    "یک شنبه": 0,
    "دوشنبه": 1,
    "دو‌شنبه": 1,
    "دو شنبه": 1,
    "سه‌شنبه": 2,
    "سه شنبه": 2,
    "سه‌‌شنبه": 2,
    "چهارشنبه": 3,
    "چهار‌شنبه": 3,
    "چهار شنبه": 3,
    "پنجشنبه": 4,
    "پنج‌شنبه": 4,
    "پنج شنبه": 4,
    "جمعه": 5,
    "شنبه": 6,
};

/**
 * Persian (Farsi) month dictionary
 * Maps Persian month names (both Solar Hijri and Gregorian) to their numeric values
 */
export const MONTH_DICTIONARY: { [word: string]: number } = {
    // Solar Hijri months (Persian calendar)
    "فروردین": 1,
    "اردیبهشت": 2,
    "خرداد": 3,
    "تیر": 4,
    "مرداد": 5,
    "شهریور": 6,
    "مهر": 7,
    "آبان": 8,
    "آذر": 9,
    "دی": 10,
    "بهمن": 11,
    "اسفند": 12,
    // Gregorian months in Persian
    "ژانویه": 1,
    "فوریه": 2,
    "مارس": 3,
    "آوریل": 4,
    "مه": 5,
    "می": 5,
    "ژوئن": 6,
    "جون": 6,
    "ژوئیه": 7,
    "جولای": 7,
    "اوت": 8,
    "آگوست": 8,
    "سپتامبر": 9,
    "اکتبر": 10,
    "نوامبر": 11,
    "دسامبر": 12,
};

/**
 * Persian integer word dictionary
 * Maps Persian number words to their numeric values
 */
export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    "اول": 1,
    "یک": 1,
    "دو": 2,
    "سه": 3,
    "چهار": 4,
    "پنج": 5,
    "شش": 6,
    "هفت": 7,
    "هشت": 8,
    "نه": 9,
    "ده": 10,
    "یازده": 11,
    "دوازده": 12,
    "سیزده": 13,
    "چهارده": 14,
    "پانزده": 15,
    "شانزده": 16,
    "هفده": 17,
    "هجده": 18,
    "نوزده": 19,
    "بیست": 20,
    "سی": 30,
    "چهل": 40,
    "پنجاه": 50,
    "شصت": 60,
    "هفتاد": 70,
    "هشتاد": 80,
    "نود": 90,
    "ده‌دوشت": 100,
    "یازده‌دوشت": 200,
    "دوازده‌دوشت": 300,
    "سیزده‌دوشت": 400,
    "چهارده‌دوشت": 500,
    "پانزده‌دوشت": 600,
};

/**
 * Persian time unit dictionary
 * Maps Persian time unit words to their Timeunit values
 */
export const TIME_UNIT_DICTIONARY: { [word: string]: Timeunit } = {
    "ثانیه": "second",
    "ثانیه‌ای": "second",
    "ثانیه‌ها": "second",
    "دقیقه": "minute",
    "دقیقه‌ای": "minute",
    "دقیقه‌ها": "minute",
    "ساعت": "hour",
    "ساعتی": "hour",
    "ساعت‌ها": "hour",
    "روز": "day",
    "روزی": "day",
    "روزها": "day",
    "هفته": "week",
    "هفته‌ای": "week",
    "هفته‌ها": "week",
    "ماه": "month",
    "ماهی": "month",
    "ماه‌ها": "month",
    "سال": "year",
    "سالی": "year",
    "سال‌ها": "year",
    "فصل": "quarter",
    "فصلی": "quarter",
};

/**
 * Pattern to match Persian and Western Arabic numerals
 */
export const PERSIAN_NUMBER_PATTERN = `(?:[۰-۹]+|[0-9]+)`;

/**
 * Pattern to match the Persian number words or digits
 */
export const NUMBER_PATTERN = `(?:${matchAnyPattern(INTEGER_WORD_DICTIONARY)}|${PERSIAN_NUMBER_PATTERN}|نیم|چند)`;

/**
 * Converts Persian/Arabic numerals to Western numerals
 */
function convertPersianNumberToWestern(persianNum: string): string {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

    let result = persianNum;
    for (let i = 0; i < 10; i++) {
        const regex = new RegExp(persianDigits[i], "g");
        result = result.replace(regex, i.toString());
        const arabicRegex = new RegExp(arabicDigits[i], "g");
        result = result.replace(arabicRegex, i.toString());
    }
    return result;
}

/**
 * Parses Persian number patterns into numeric values
 */
export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();

    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    } else if (num === "نیم") {
        return 0.5;
    } else if (num === "چند") {
        return 3;
    }

    // Convert Persian/Arabic numerals to Western numerals
    const westernNum = convertPersianNumberToWestern(match);
    return parseFloat(westernNum);
}

/**
 * Pattern for ordinal numbers in Persian
 */
export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(INTEGER_WORD_DICTIONARY)}(?:م|ام|اُم|ین|مین)?|${PERSIAN_NUMBER_PATTERN}(?:م|ام|اُم|ین|مین)?|[0-9]+(?:st|nd|rd|th)?)`;

/**
 * Parses ordinal number patterns
 */
export function parseOrdinalNumberPattern(match: string): number {
    let num = match.toLowerCase();
    // Remove Persian ordinal suffixes
    num = num.replace(/(?:م|ام|اُم|ین|مین|st|nd|rd|th)$/i, "");

    // Check if it's a word number first
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    }

    const westernNum = convertPersianNumberToWestern(num);
    return parseInt(westernNum);
}

/**
 * Year pattern for Persian
 * Supports both Persian calendar years (1300-1500) and Gregorian years
 */
export const YEAR_PATTERN = `(?:[۱-۱][۰-۹]{3}|[1-2][0-9]{3}|[5-9][0-9]|13[0-9]{2}|14[0-9]{2})`;

/**
 * Parses year patterns
 */
export function parseYear(match: string): number {
    const westernNum = convertPersianNumberToWestern(match);
    let yearNumber = parseInt(westernNum);

    // For Persian calendar years (1300-1500), keep them as-is
    if (yearNumber >= 1300 && yearNumber <= 1500) {
        return yearNumber; // Keep Persian years as-is
    } else if (yearNumber < 100) {
        if (yearNumber > 50) {
            yearNumber = yearNumber + 1900;
        } else {
            yearNumber = yearNumber + 2000;
        }
    }

    return yearNumber;
}

/**
 * Single time unit pattern
 */
const SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,5}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

/**
 * Time units pattern with optional connectors
 */
export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(
    `(?:(?:حدود|تقریباً|در حدود)\\s{0,3})?`,
    SINGLE_TIME_UNIT_PATTERN,
    `\\s{0,5}(?:و)?\\s{0,5}`
);

import { Duration } from "../../calculation/duration";

/**
 * Parses Persian duration text into a Duration object
 */
export function parseDuration(timeunitText: string): Duration | null {
    const fragments: { [key: string]: number } = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);

    while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }

    if (Object.keys(fragments).length === 0) {
        return null;
    }

    return fragments as Duration;
}

/**
 * Helper function to collect date/time fragments from regex matches
 */
function collectDateTimeFragment(fragments: { [key: string]: number }, match: RegExpMatchArray): void {
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
}
