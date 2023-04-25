import { Weekday } from "../../types";
import { ParsingComponents, ReferenceWithTimezone } from "../../results";
import { addImpliedTimeUnits } from "../../utils/timeunits";

/**
 * Returns the parsing components at the weekday (considering the modifier). The time and timezone is assume to be
 * similar to the reference.
 * @param reference
 * @param weekday
 * @param modifier "this", "next", "last" modifier word. If empty, returns the weekday closest to the `refDate`.
 */
export function createParsingComponentsAtWeekday(
    reference: ReferenceWithTimezone,
    weekday: Weekday,
    modifier?: "this" | "next" | "last"
): ParsingComponents {
    const refDate = reference.getDateWithAdjustedTimezone();
    const daysToWeekday = getDaysToWeekday(refDate, weekday, modifier);

    let components = new ParsingComponents(reference);
    components = addImpliedTimeUnits(components, { "day": daysToWeekday });
    components.assign("weekday", weekday);

    return components;
}

/**
 * Returns number of days from refDate to the weekday. The refDate date and timezone information is used.
 * @param refDate
 * @param weekday
 * @param modifier "this", "next", "last" modifier word. If empty, returns the weekday closest to the `refDate`.
 */
export function getDaysToWeekday(refDate: Date, weekday: Weekday, modifier?: "this" | "next" | "last"): number {
    const refWeekday = refDate.getDay() as Weekday;
    switch (modifier) {
        case "this":
            return getDaysForwardToWeekday(refDate, weekday);
        case "last":
            return getBackwardDaysToWeekday(refDate, weekday);
        case "next":
            // From Sunday, the next Sunday is 7 days later.
            // Otherwise, next Mon is 1 days later, next Tues is 2 days later, and so on..., (return enum value)
            if (refWeekday == Weekday.SUNDAY) {
                return weekday == Weekday.SUNDAY ? 7 : weekday;
            }
            // From Saturday, the next Saturday is 7 days later, the next Sunday is 8-days later.
            // Otherwise, next Mon is (1 + 1) days later, next Tues is (1 + 2) days later, and so on...,
            // (return, 2 + [enum value] days)
            if (refWeekday == Weekday.SATURDAY) {
                if (weekday == Weekday.SATURDAY) return 7;
                if (weekday == Weekday.SUNDAY) return 8;
                return 1 + weekday;
            }
            // From weekdays, next Mon is the following week's Mon, next Tues the following week's Tues, and so on...
            // If the week's weekday already passed (weekday < refWeekday), we simply count forward to next week
            // (similar to 'this'). Otherwise, count forward to this week, then add another 7 days.
            if (weekday < refWeekday && weekday != Weekday.SUNDAY) {
                return getDaysForwardToWeekday(refDate, weekday);
            } else {
                return getDaysForwardToWeekday(refDate, weekday) + 7;
            }
    }
    return getDaysToWeekdayClosest(refDate, weekday);
}

export function getDaysToWeekdayClosest(refDate: Date, weekday: Weekday): number {
    const backward = getBackwardDaysToWeekday(refDate, weekday);
    const forward = getDaysForwardToWeekday(refDate, weekday);

    return forward < -backward ? forward : backward;
}

export function getDaysForwardToWeekday(refDate: Date, weekday: Weekday): number {
    const refWeekday = refDate.getDay();
    let forwardCount = weekday - refWeekday;
    if (forwardCount < 0) {
        forwardCount += 7;
    }
    return forwardCount;
}

export function getBackwardDaysToWeekday(refDate: Date, weekday: Weekday): number {
    const refWeekday = refDate.getDay();
    let backwardCount = weekday - refWeekday;
    if (backwardCount >= 0) {
        backwardCount -= 7;
    }
    return backwardCount;
}
