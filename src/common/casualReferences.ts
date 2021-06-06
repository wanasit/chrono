import { ParsingComponents, ReferenceWithTimezone } from "../results";
import dayjs from "dayjs";
import { assignSimilarDate, assignSimilarTime, assignTheNextDay, implySimilarTime } from "../utils/dayjs";
import { Meridiem } from "../index";

export function now(reference: ReferenceWithTimezone): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    assignSimilarDate(component, targetDate);
    assignSimilarTime(component, targetDate);
    component.assign("timezoneOffset", targetDate.utcOffset());
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
    let targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    targetDate = targetDate.add(-1, "day");
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    return component;
}

/**
 * The following day with dayjs.assignTheNextDay()
 */
export function tomorrow(reference: ReferenceWithTimezone): ParsingComponents {
    const targetDate = dayjs(reference.instant);
    const component = new ParsingComponents(reference, {});
    assignTheNextDay(component, targetDate);
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
