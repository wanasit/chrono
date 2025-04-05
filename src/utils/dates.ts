import { ParsingComponents } from "../results";

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
}
