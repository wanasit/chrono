import { ParsingComponents } from "../results";
import dayjs from "dayjs";

/**
 * Assign the next day or 'tomorrow'.
 * This includes checking for edge cases e.g. mentioned 'tomorrow' after midnight
 */
export function assignTheNextDay(component: ParsingComponents, targetDayJs: dayjs.Dayjs) {
    if (targetDayJs.hour() > 1) {
        targetDayJs = targetDayJs.add(1, "day");
        assignSimilarDate(component, targetDayJs);
        implySimilarTime(component, targetDayJs);
    } else {
        assignSimilarDate(component, targetDayJs);
        component.imply("hour", 12);
        component.imply("minute", 0);
        component.imply("second", 0);
    }
}

export function assignSimilarDate(component: ParsingComponents, targetDayJs: dayjs.Dayjs) {
    component.assign("day", targetDayJs.date());
    component.assign("month", targetDayJs.month() + 1);
    component.assign("year", targetDayJs.year());
}

export function assignSimilarTime(component: ParsingComponents, targetDayJs: dayjs.Dayjs) {
    component.assign("hour", targetDayJs.hour());
    component.assign("minute", targetDayJs.minute());
    component.assign("second", targetDayJs.second());
    component.assign("millisecond", targetDayJs.millisecond());
}

export function implySimilarTime(component: ParsingComponents, targetDayJs: dayjs.Dayjs) {
    component.imply("hour", targetDayJs.hour());
    component.imply("minute", targetDayJs.minute());
    component.imply("second", targetDayJs.second());
}
