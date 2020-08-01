import { OpUnitType } from "dayjs";

export type TimeUnits = { [c in OpUnitType]?: number };

export function reverseTimeUnits(timeUnits: TimeUnits): TimeUnits {
    const reversed = {};
    for (const key in timeUnits) {
        // noinspection JSUnfilteredForInLoop
        reversed[key] = -timeUnits[key];
    }

    return reversed;
}
