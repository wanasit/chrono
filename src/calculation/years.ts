import { addDuration } from "./duration";

/**
 * Find the most likely year, from a raw number. For example:
 * 1997 => 1997
 * 97 => 1997
 * 12 => 2012
 */
export function findMostLikelyADYear(yearNumber: number): number {
    if (yearNumber < 100) {
        if (yearNumber > 50) {
            yearNumber = yearNumber + 1900;
        } else {
            yearNumber = yearNumber + 2000;
        }
    }

    return yearNumber;
}

export function findYearClosestToRef(refDate: Date, day: number, month: number): number {
    let date = new Date(refDate);
    date.setMonth(month - 1);
    date.setDate(day);
    const nextYear = addDuration(date, { "year": 1 });
    const lastYear = addDuration(date, { "year": -1 });
    if (Math.abs(nextYear.getTime() - refDate.getTime()) < Math.abs(date.getTime() - refDate.getTime())) {
        date = nextYear;
    } else if (Math.abs(lastYear.getTime() - refDate.getTime()) < Math.abs(date.getTime() - refDate.getTime())) {
        date = lastYear;
    }
    return date.getFullYear();
}
