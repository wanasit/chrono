import dayjs, { Dayjs } from "dayjs";

export function toDayJSWeekday(refDate: Date, offset: number, modifier?: "this" | "next" | "last"): Dayjs {
    if (!modifier) {
        return toDayJSClosestWeekday(refDate, offset);
    }

    let date = dayjs(refDate);
    switch (modifier) {
        case "this":
            date = date.day(offset);
            break;

        case "next":
            date = date.day(offset + 7);
            break;

        case "last":
            date = date.day(offset - 7);
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
