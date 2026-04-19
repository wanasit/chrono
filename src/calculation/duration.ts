import { Timeunit } from "../types";

export type TimeunitShorten = "y" | "mo" | "M" | "w" | "d" | "h" | "m" | "s" | "ms";
export type TimeunitSpecial = "quarter";

/**
 * A type represent a directed time duration as a set of values by timeunits.
 * The positive values mean the time duration into the future.
 */
export type Duration = { [c in Timeunit | TimeunitSpecial | TimeunitShorten]?: number };

/**
 * An explicit empty duration (not just empty duration object).
 * This is defined as zero day and second.
 */
export const EmptyDuration = {
    day: 0,
    second: 0,
    millisecond: 0,
};

/**
 * Returns the date after adding the given `duration` to `ref`.
 * @param ref
 * @param duration
 */
export function addDuration(ref: Date, duration: Duration): Date {
    const date = new Date(ref);

    // Replace short timeunit keys with full timeunit keys (without mutating input)
    const normalizedDuration: Duration = { ...duration };
    if (normalizedDuration["y"]) {
        normalizedDuration["year"] = normalizedDuration["y"];
        delete normalizedDuration["y"];
    }
    if (normalizedDuration["mo"]) {
        normalizedDuration["month"] = normalizedDuration["mo"];
        delete normalizedDuration["mo"];
    }
    if (normalizedDuration["M"]) {
        normalizedDuration["month"] = normalizedDuration["M"];
        delete normalizedDuration["M"];
    }
    if (normalizedDuration["w"]) {
        normalizedDuration["week"] = normalizedDuration["w"];
        delete normalizedDuration["w"];
    }
    if (normalizedDuration["d"]) {
        normalizedDuration["day"] = normalizedDuration["d"];
        delete normalizedDuration["d"];
    }
    if (normalizedDuration["h"]) {
        normalizedDuration["hour"] = normalizedDuration["h"];
        delete normalizedDuration["h"];
    }
    if (normalizedDuration["m"]) {
        normalizedDuration["minute"] = normalizedDuration["m"];
        delete normalizedDuration["m"];
    }
    if (normalizedDuration["s"]) {
        normalizedDuration["second"] = normalizedDuration["s"];
        delete normalizedDuration["s"];
    }
    if (normalizedDuration["ms"]) {
        normalizedDuration["millisecond"] = normalizedDuration["ms"];
        delete normalizedDuration["ms"];
    }

    if ("year" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["year"]);
        date.setFullYear(date.getFullYear() + floor);
        const remainingFraction = normalizedDuration["year"] - floor;
        if (remainingFraction > 0) {
            normalizedDuration.month = normalizedDuration?.month ?? 0;
            normalizedDuration.month += remainingFraction * 12;
        }
    }
    if ("quarter" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["quarter"]);
        date.setMonth(date.getMonth() + floor * 3);
    }
    if ("month" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["month"]);
        date.setMonth(date.getMonth() + floor);
        const remainingFraction = normalizedDuration["month"] - floor;
        if (remainingFraction > 0) {
            normalizedDuration.week = normalizedDuration?.week ?? 0;
            normalizedDuration.week += remainingFraction * 4;
        }
    }
    if ("week" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["week"]);
        date.setDate(date.getDate() + floor * 7);
        const remainingFraction = normalizedDuration["week"] - floor;
        if (remainingFraction > 0) {
            normalizedDuration.day = normalizedDuration?.day ?? 0;
            normalizedDuration.day += Math.round(remainingFraction * 7);
        }
    }
    if ("day" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["day"]);
        date.setDate(date.getDate() + floor);
        const remainingFraction = normalizedDuration["day"] - floor;
        if (remainingFraction > 0) {
            normalizedDuration.hour = normalizedDuration?.hour ?? 0;
            normalizedDuration.hour += Math.round(remainingFraction * 24);
        }
    }
    if ("hour" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["hour"]);
        date.setHours(date.getHours() + floor);
        const remainingFraction = normalizedDuration["hour"] - floor;
        if (remainingFraction > 0) {
            normalizedDuration.minute = normalizedDuration?.minute ?? 0;
            normalizedDuration.minute += Math.round(remainingFraction * 60);
        }
    }
    if ("minute" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["minute"]);
        date.setMinutes(date.getMinutes() + floor);
        const remainingFraction = normalizedDuration["minute"] - floor;
        if (remainingFraction > 0) {
            normalizedDuration.second = normalizedDuration?.second ?? 0;
            normalizedDuration.second += Math.round(remainingFraction * 60);
        }
    }
    if ("second" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["second"]);
        date.setSeconds(date.getSeconds() + floor);
        const remainingFraction = normalizedDuration["second"] - floor;
        if (remainingFraction > 0) {
            normalizedDuration.millisecond = normalizedDuration?.millisecond ?? 0;
            normalizedDuration.millisecond += Math.round(remainingFraction * 1000);
        }
    }
    if ("millisecond" in normalizedDuration) {
        const floor = Math.floor(normalizedDuration["millisecond"]);
        date.setMilliseconds(date.getMilliseconds() + floor);
    }
    return date;
}

/**
 * Return the reversed duration (e.g. back into the past, instead of future)
 * @param duration
 */
export function reverseDuration(duration: Duration): Duration {
    const reversed = {};
    for (const key in duration) {
        // noinspection JSUnfilteredForInLoop
        reversed[key] = -duration[key];
    }
    return reversed as Duration;
}
