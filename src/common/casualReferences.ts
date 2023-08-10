import { ParsingComponents, ReferenceWithTimezone } from "../results";
import dayjs from "dayjs";
import {
    assignSimilarDate,
    assignSimilarTime,
    implySimilarDate,
    implySimilarTime,
    implyTheNextDay,
} from "../utils/dayjs";
import { Meridiem } from "../types";

export function now(reference: ReferenceWithTimezone, casualText?: string): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {}, casualText);
    assignSimilarDate(component, targetDate);
    assignSimilarTime(component, targetDate);
    if (reference.timezoneOffset !== null) {
        component.assign("timezoneOffset", targetDate.utcOffset());
    }
    return component;
}

export function today(reference: ReferenceWithTimezone, casualText?: string): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {}, casualText);
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    return component;
}

/**
 * The previous day. Imply the same time.
 */
export function yesterday(reference: ReferenceWithTimezone, casualText?: string): ParsingComponents {
    return theDayBefore(reference, 1, casualText);
}

export function theDayBefore(reference: ReferenceWithTimezone, numDay: number, casualText?: string): ParsingComponents {
    return theDayAfter(reference, -numDay, casualText);
}

/**
 * The following day with dayjs.assignTheNextDay()
 */
export function tomorrow(reference: ReferenceWithTimezone, casualText?: string): ParsingComponents {
    return theDayAfter(reference, 1, casualText);
}

export function theDayAfter(reference: ReferenceWithTimezone, nDays: number, casualText?: string): ParsingComponents {
    let targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {}, casualText);
    targetDate = targetDate.add(nDays, "day");
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    return component;
}

export function tonight(reference: ReferenceWithTimezone, implyHour = 22, casualText?: string): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {}, casualText);
    component.imply("hour", implyHour);
    component.imply("meridiem", Meridiem.PM);
    assignSimilarDate(component, targetDate);
    return component;
}

export function lastNight(reference: ReferenceWithTimezone, implyHour = 0): ParsingComponents {
    let targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    if (targetDate.hour() < 6) {
        targetDate = targetDate.add(-1, "day");
    }
    assignSimilarDate(component, targetDate);
    component.imply("hour", implyHour);
    return component;
}

export function evening(reference: ReferenceWithTimezone, implyHour = 20): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.PM);
    component.imply("hour", implyHour);
    return component;
}

export function yesterdayEvening(reference: ReferenceWithTimezone, implyHour = 20): ParsingComponents {
    let targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    targetDate = targetDate.add(-1, "day");
    assignSimilarDate(component, targetDate);
    component.imply("hour", implyHour);
    component.imply("meridiem", Meridiem.PM);
    return component;
}

export function midnight(reference: ReferenceWithTimezone): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    const targetDate = dayjs(reference.instant);
    if (targetDate.hour() > 2) {
        // Unless it's very early morning (0~2AM), we assume the midnight is the coming midnight.
        // Thus, increasing the day by 1.
        implyTheNextDay(component, targetDate);
    }
    component.assign("hour", 0);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    return component;
}

export function morning(reference: ReferenceWithTimezone, implyHour = 6): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.AM);
    component.imply("hour", implyHour);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    return component;
}

export function afternoon(reference: ReferenceWithTimezone, implyHour = 15): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.PM);
    component.imply("hour", implyHour);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    return component;
}

export function noon(reference: ReferenceWithTimezone): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.AM);
    component.imply("hour", 12);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    return component;
}
