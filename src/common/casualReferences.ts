import { ParsingComponents, ReferenceWithTimezone } from "../results";
import dayjs from "dayjs";
import { assignSimilarDate, assignSimilarTime, implySimilarTime } from "../utils/dayjs";
import { Meridiem } from "../index";

export function now(reference: ReferenceWithTimezone): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    assignSimilarTime(component, targetDate);
    if (reference.timezoneOffset !== null) {
        component.assign("timezoneOffset", targetDate.utcOffset());
    }
    return component;
}

export function today(reference: ReferenceWithTimezone): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    return component;
}

/**
 * The previous day. Imply the same time.
 */
export function yesterday(reference: ReferenceWithTimezone): ParsingComponents {
    return theDayBefore(reference, 1);
}

export function theDayBefore(reference: ReferenceWithTimezone, numDay: number): ParsingComponents {
    return theDayAfter(reference, -numDay);
}

/**
 * The following day with dayjs.assignTheNextDay()
 */
export function tomorrow(reference: ReferenceWithTimezone): ParsingComponents {
    return theDayAfter(reference, 1);
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
    component.imply("hour", 0);
    component.imply("minute", 0);
    component.imply("second", 0);
    return component;
}

export function morning(reference: ReferenceWithTimezone, implyHour = 6): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.AM);
    component.imply("hour", implyHour);
    return component;
}

export function noon(reference: ReferenceWithTimezone): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    component.imply("meridiem", Meridiem.AM);
    component.imply("hour", 12);
    return component;
}
