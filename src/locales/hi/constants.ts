import { matchAnyPattern } from "../../utils/pattern";

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    रविवार: 0,
    सोमवार: 1,
    मंगलवार: 2,
    बुधवार: 3,
    गुरुवार: 4,
    शुक्रवार: 5,
    शनिवार: 6,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    जनवरी: 1,
    फरवरी: 2,
    मार्च: 3,
    अप्रैल: 4,
    मई: 5,
    जून: 6,
    जुलाई: 7,
    अगस्त: 8,
    सितंबर: 9,
    अक्टूबर: 10,
    नवंबर: 11,
    दिसंबर: 12,
};

export const ORDINAL_NUMBER_PATTERN = `(?:[०-९]{1,2}|[0-9]{1,2})`;

export function parseHindiDigits(match: string): number {
    const hindiDigits = "०१२३४५६७८९";
    const normalized = match.replace(/[०-९]/g, (digit) => hindiDigits.indexOf(digit).toString());
    return parseInt(normalized);
}

export function parseOrdinalNumberPattern(match: string): number {
    return parseHindiDigits(match);
}

export const YEAR_PATTERN = `(?:[१२][०-९]{3}|[1-2][0-9]{3})`;

export function parseYear(match: string): number {
    return parseHindiDigits(match);
}

export const MONTH_PATTERN = matchAnyPattern(MONTH_DICTIONARY);
