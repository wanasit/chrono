import { OpUnitType, QUnitType } from "dayjs";
import { ParsingComponents } from "../results";

/**
 * @deprecated Use `calculation.duration.Duration`.
 */
export type TimeUnits = { [c in OpUnitType | QUnitType]?: number };

/**
 * @deprecated Use `calculation.duration.*`.
 */
export function reverseTimeUnits(timeUnits: TimeUnits): TimeUnits {
    const reversed = {};
    for (const key in timeUnits) {
        // noinspection JSUnfilteredForInLoop
        reversed[key] = -timeUnits[key];
    }

    return reversed as TimeUnits;
}
