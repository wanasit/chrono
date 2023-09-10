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

export function now(reference: ReferenceWithTimezone): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    assignSimilarTime(component, targetDate);
    if (reference.timezoneOffset !== null) {
        component.assign("timezoneOffset", targetDate.utcOffset());
    }
    component.addTag("casualReference/now");
    return component;
}

export function today(reference: ReferenceWithTimezone): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    component.addTag("casualReference/today");
    return component;
}

/**
 * The previous day. Imply the same time.
 */
export function yesterday(reference: ReferenceWithTimezone): ParsingComponents {
    return theDayBefore(reference, 1).addTag("casualReference/yesterday");
}

export function theDayBefore(reference: ReferenceWithTimezone, numDay: number): ParsingComponents {
    return theDayAfter(reference, -numDay);
}

/**
 * The following day with dayjs.assignTheNextDay()
 */
export function tomorrow(reference: ReferenceWithTimezone): ParsingComponents {
    return theDayAfter(reference, 1).addTag("casualReference/tomorrow");
}

export function theDayAfter(reference: ReferenceWithTimezone, nDays: number): ParsingComponents {
    let targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    targetDate = targetDate.add(nDays, "day");
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    return component;
}

export function tonight(reference: ReferenceWithTimezone, implyHour = 22): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    component.imply("hour", implyHour);
    component.imply("meridiem", Meridiem.PM);
    component.addTag("casualReference/tonight");
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
    component.addTag("casualReference/evening");
    return component;
}

export function yesterdayEvening(reference: ReferenceWithTimezone, implyHour = 20): ParsingComponents {
    let targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    targetDate = targetDate.add(-1, "day");
    assignSimilarDate(component, targetDate);
    component.imply("hour", implyHour);
    component.imply("meridiem", Meridiem.PM);
    component.addTag("casualReference/yesterday");
    component.addTag("casualReference/evening");
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
    component.addTag("casualReference/midnight");
    return component;
}

export function morning(reference: ReferenceWithTimezone, implyHour = 6): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.AM);
    component.imply("hour", implyHour);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    component.addTag("casualReference/morning");
    return component;
}

export function afternoon(reference: ReferenceWithTimezone, implyHour = 15): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.PM);
    component.imply("hour", implyHour);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    component.addTag("casualReference/afternoon");
    return component;
}

export function noon(reference: ReferenceWithTimezone): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.AM);
    component.imply("hour", 12);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    component.addTag("casualReference/noon");
    return component;
}
