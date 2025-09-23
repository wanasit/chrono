import { ParsingComponents, ReferenceWithTimezone } from "../results";
import { assignSimilarDate, assignSimilarTime, implySimilarTime } from "../utils/dates";
import { Meridiem } from "../types";

export function now(reference: ReferenceWithTimezone): ParsingComponents {
    const targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    assignSimilarTime(component, targetDate);
    component.assign("timezoneOffset", reference.getTimezoneOffset());
    component.addTag("casualReference/now");
    return component;
}

export function today(reference: ReferenceWithTimezone): ParsingComponents {
    const targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    component.delete("meridiem");
    component.addTag("casualReference/today");
    return component;
}

export function yesterday(reference: ReferenceWithTimezone): ParsingComponents {
    return theDayBefore(reference, 1).addTag("casualReference/yesterday");
}

export function tomorrow(reference: ReferenceWithTimezone): ParsingComponents {
    return theDayAfter(reference, 1).addTag("casualReference/tomorrow");
}

export function theDayBefore(reference: ReferenceWithTimezone, numDay: number): ParsingComponents {
    return theDayAfter(reference, -numDay);
}

export function theDayAfter(reference: ReferenceWithTimezone, nDays: number): ParsingComponents {
    const targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    const newDate = new Date(targetDate.getTime());
    newDate.setDate(newDate.getDate() + nDays);

    assignSimilarDate(component, newDate);
    implySimilarTime(component, newDate);
    component.delete("meridiem");
    return component;
}

export function tonight(reference: ReferenceWithTimezone, implyHour = 22): ParsingComponents {
    const targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    component.imply("hour", implyHour);
    component.imply("meridiem", Meridiem.PM);
    component.addTag("casualReference/tonight");
    return component;
}

export function lastNight(reference: ReferenceWithTimezone, implyHour = 0): ParsingComponents {
    let targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    if (targetDate.getHours() < 6) {
        targetDate = new Date(targetDate.getTime() - 24 * 60 * 60 * 1000);
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
    let targetDate = reference.getDateWithAdjustedTimezone();
    const component = new ParsingComponents(reference, {});
    targetDate = new Date(targetDate.getTime() - 24 * 60 * 60 * 1000);
    assignSimilarDate(component, targetDate);
    component.imply("hour", implyHour);
    component.imply("meridiem", Meridiem.PM);
    component.addTag("casualReference/yesterday");
    component.addTag("casualReference/evening");
    return component;
}

export function midnight(reference: ReferenceWithTimezone): ParsingComponents {
    const component = new ParsingComponents(reference, {});
    if (reference.getDateWithAdjustedTimezone().getHours() > 2) {
        // Unless it's very early morning (0~2AM), we assume the midnight is the coming midnight.
        // Thus, increasing the day by 1.
        component.addDurationAsImplied({ day: 1 });
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
    component.assign("hour", 12);
    component.imply("minute", 0);
    component.imply("second", 0);
    component.imply("millisecond", 0);
    component.addTag("casualReference/noon");
    return component;
}
