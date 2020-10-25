import { ParsingComponents } from "../results";
import dayjs from "dayjs";
import { assignSimilarDate, assignSimilarTime, assignTheNextDay, implySimilarTime } from "../utils/dayjs";
import { Meridiem } from "../index";

export function now(refDate: Date): ParsingComponents {
    const targetDate = dayjs(refDate);
    const component = new ParsingComponents(refDate, {});
    assignSimilarDate(component, targetDate);
    assignSimilarTime(component, targetDate);
    return component;
}

export function today(refDate: Date): ParsingComponents {
    const targetDate = dayjs(refDate);
    const component = new ParsingComponents(refDate, {});
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    return component;
}

/**
 * The previous day. Imply the same time.
 * @param refDate
 */
export function yesterday(refDate: Date): ParsingComponents {
    let targetDate = dayjs(refDate);
    const component = new ParsingComponents(refDate, {});
    targetDate = targetDate.add(-1, "day");
    assignSimilarDate(component, targetDate);
    implySimilarTime(component, targetDate);
    return component;
}

/**
 * The following day with dayjs.assignTheNextDay()
 * @param refDate
 */
export function tomorrow(refDate: Date): ParsingComponents {
    const targetDate = dayjs(refDate);
    const component = new ParsingComponents(refDate, {});
    assignTheNextDay(component, targetDate);
    return component;
}

export function tonight(refDate: Date, implyHour = 22): ParsingComponents {
    const targetDate = dayjs(refDate);
    const component = new ParsingComponents(refDate, {});
    component.imply("hour", implyHour);
    component.imply("meridiem", Meridiem.PM);
    assignSimilarDate(component, targetDate);
    return component;
}
