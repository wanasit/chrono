import dayjs, { Dayjs } from "dayjs";

/**
 * Create DayJS instance for target day-of-week given the reference date and modifier word. The calculation should
 *  probably be locale specific, but this implementation assume English.
 *
 * @param refDate the reference date (instance)
 * @param dayOfWeek the target day-of-week (0-6, from Sunday=0).
 * @param modifier the "this", "next", "last" modifier word. If empty returns the target day-of-week closest to the ref
 * @deprecated
 * Todo: Refactor this to not depend on dayJS and use native dayOfWeek enum
 */
export function toDayJSWeekday(refDate: Date, dayOfWeek: number, modifier?: "this" | "next" | "last"): Dayjs {
    if (!modifier) {
        return toDayJSClosestWeekday(refDate, dayOfWeek);
    }

    const refDayJs = dayjs(refDate);
    let date = dayjs(refDate);
    switch (modifier) {
        case "this":
            // the first target day-of-week from reference going forward
            dayOfWeek = dayOfWeek >= date.day() ? dayOfWeek : dayOfWeek + 7;
            date = date.day(dayOfWeek);
            break;

        case "last":
            // the first target day-of-week from reference going backward
            dayOfWeek = dayOfWeek < date.day() ? dayOfWeek : dayOfWeek - 7;
            date = date.day(dayOfWeek);
            break;

        case "next":
            if (date.day() == 0) {
                // From Sunday, the next Sunday is 7 days later.
                // Otherwise, next Mon is the coming Mon, next Tues is the coming Tues, and so on..., (no dayOfWeek change)
                if (dayOfWeek == 0) {
                    return refDayJs.add(7, "day");
                }
            } else if (date.day() == 6) {
                // From Saturday, the next Saturday is 7 days later, the next Sunday is 8-days later.
                // Otherwise, next Mon is the following week's Mon, next Tues the following week's Tues, and so on...,
                // (thus, dayOfWeek +7)
                if (dayOfWeek == 6) {
                    return refDayJs.add(7, "day");
                } else if (dayOfWeek == 0) {
                    return refDayJs.add(8, "day");
                } else {
                    dayOfWeek += 7;
                }
            } else {
                // From weekdays, next Sunday is the Sunday AFTER following week's Sunday (offset + 14),
                // Otherwise, next Mon is the following week's Mon, next Tues the following week's Tues, and so on...,
                // (thus, offset +7)
                if (dayOfWeek == 0) {
                    dayOfWeek += 7;
                }
                dayOfWeek += 7;
            }
            date = date.day(dayOfWeek);
            break;
    }
    return date;
}

export function toDayJSClosestWeekday(refDate: Date, offset: number): Dayjs {
    let date = dayjs(refDate);
    const refOffset = date.day();
    if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
        date = date.day(offset - 7);
    } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
        date = date.day(offset + 7);
    } else {
        date = date.day(offset);
    }

    return date;
}
