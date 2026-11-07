/**
 * ISO-8601 calendar week helpers (week 1 contains 4 January; weeks Mon–Sun).
 */

export type Ymd = { year: number; month: number; day: number };

function ymdFromUtcDate(d: Date): Ymd {
    return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
    };
}

function addDaysYmd(ymd: Ymd, days: number): Ymd {
    const d = new Date(Date.UTC(ymd.year, ymd.month - 1, ymd.day, 12));
    d.setUTCDate(d.getUTCDate() + days);
    return ymdFromUtcDate(d);
}

/**
 * ISO week-year and week number for a local date (Y-M-D via UTC noon).
 */
export function getISOWeekParts(date: Date): { year: number; week: number } {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const day = date.getDate();
    const utc = Date.UTC(y, m - 1, day, 12);
    const dow = new Date(utc).getUTCDay() || 7; // Mon=1 … Sun=7
    const thursdayUtc = utc + (4 - dow) * 86400000;
    const isoYear = new Date(thursdayUtc).getUTCFullYear();
    const jan4Utc = Date.UTC(isoYear, 0, 4, 12);
    const jan4Dow = new Date(jan4Utc).getUTCDay() || 7;
    const mondayW1Utc = jan4Utc - (jan4Dow - 1) * 86400000;
    const mondayThisUtc = utc - (dow - 1) * 86400000;
    const week = Math.floor((mondayThisUtc - mondayW1Utc) / (7 * 86400000)) + 1;
    return { year: isoYear, week };
}

/**
 * Monday–Sunday Y-M-D for ISO week `week` of ISO week-year `year`.
 * Returns null if week 53 does not exist in that year.
 */
export function isoWeekMondaySunday(year: number, week: number): { monday: Ymd; sunday: Ymd } | null {
    if (!Number.isFinite(year) || year < 1970 || year > 2100) return null;
    if (!Number.isFinite(week) || week < 1 || week > 53) return null;

    const jan4: Ymd = { year, month: 1, day: 4 };
    const jan4Wd = new Date(Date.UTC(year, 0, 4, 12)).getUTCDay(); // 0=Sun
    const mondayOffset = jan4Wd === 0 ? -6 : 1 - jan4Wd;
    const mondayW1 = addDaysYmd(jan4, mondayOffset);
    const monday = addDaysYmd(mondayW1, (week - 1) * 7);
    const thursday = addDaysYmd(monday, 3);
    if (thursday.year !== year) return null;
    const sunday = addDaysYmd(monday, 6);
    return { monday, sunday };
}
