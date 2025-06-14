import { ParsingComponents } from "../results";
import { Meridiem } from "../types";

/**
 * Assign (force update) the parsing component to the same day as the `target`.
 * @param component the component to be updated.
 * @param target the target date with timezone adjusted.
 */
export function assignSimilarDate(component: ParsingComponents, target: Date) {
    component.assign("day", target.getDate());
    component.assign("month", target.getMonth() + 1);
    component.assign("year", target.getFullYear());
}

/**
 * Assign (force update) the parsing component to the same time as the `target`.
 * @param component the component to be updated.
 * @param target the target date with timezone adjusted.
 */
export function assignSimilarTime(component: ParsingComponents, target: Date) {
    component.assign("hour", target.getHours());
    component.assign("minute", target.getMinutes());
    component.assign("second", target.getSeconds());
    component.assign("millisecond", target.getMilliseconds());
    component.assign("meridiem", target.getHours() < 12 ? Meridiem.AM : Meridiem.PM);
}

/**
 * Imply (weakly update) the parsing component to the same day as the `target`.
 * @param component the component to be updated.
 * @param target the target date with timezone adjusted.
 */
export function implySimilarDate(component: ParsingComponents, target: Date) {
    component.imply("day", target.getDate());
    component.imply("month", target.getMonth() + 1);
    component.imply("year", target.getFullYear());
}

/**
 * Imply (weakly update) the parsing component to the same time as the `target`.
 * @param component the component to be updated.
 * @param target the target date with timezone adjusted.
 */
export function implySimilarTime(component: ParsingComponents, target: Date) {
    component.imply("hour", target.getHours());
    component.imply("minute", target.getMinutes());
    component.imply("second", target.getSeconds());
    component.imply("millisecond", target.getMilliseconds());
    component.imply("meridiem", target.getHours() < 12 ? Meridiem.AM : Meridiem.PM);
}
