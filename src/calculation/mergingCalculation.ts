import {ParsingComponents, ParsingResult} from "../results";

export function mergeDateTimeResult(
    textBetween: string,
    dateResult: ParsingResult,
    timeResult: ParsingResult): ParsingResult {

    const result = dateResult.clone();
    const beginDate = dateResult.start;
    const beginTime = timeResult.start;

    result.start = mergeDateTimeComponent(beginDate, beginTime);
    if (dateResult.end != null || timeResult.end != null) {
        const endDate   = dateResult.end == null ? dateResult.start : dateResult.end;
        const endTime   = timeResult.end == null ? timeResult.start : timeResult.end;
        const endDateTime = mergeDateTimeComponent(endDate, endTime);

        if (dateResult.end == null && endDateTime.date().getTime() < result.start .date().getTime()) {
            // Ex. 9pm - 1am
            if (endDateTime.isCertain('day')) {
                endDateTime.assign('day', endDateTime.get('day') + 1);
            } else {
                endDateTime.imply('day', endDateTime.get('day') + 1);
            }
        }

        result.end = endDateTime;
    }

    result.index = dateResult.index;
    result.text = dateResult.text + textBetween + timeResult.text;
    return result;
}

export function mergeDateTimeComponent(dateComponent: ParsingComponents, timeComponent: ParsingComponents): ParsingComponents {
    const dateTimeComponent = dateComponent.clone();

    if (timeComponent.isCertain('hour')) {
        dateTimeComponent.assign('hour', timeComponent.get('hour'));
        dateTimeComponent.assign('minute', timeComponent.get('minute'));

        if (timeComponent.isCertain('second')) {
            dateTimeComponent.assign('second', timeComponent.get('second'));

            if (timeComponent.isCertain('millisecond')) {
                dateTimeComponent.assign('millisecond', timeComponent.get('millisecond'));
            } else {
                dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
            }
        } else {
            dateTimeComponent.imply('second', timeComponent.get('second'));
            dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
        }

    } else {
        dateTimeComponent.imply('hour', timeComponent.get('hour'));
        dateTimeComponent.imply('minute', timeComponent.get('minute'));
        dateTimeComponent.imply('second', timeComponent.get('second'));
        dateTimeComponent.imply('millisecond', timeComponent.get('millisecond'));
    }

    if (timeComponent.isCertain('timezoneOffset')) {
        dateTimeComponent.assign('timezoneOffset', timeComponent.get('timezoneOffset'))
    }

    if (timeComponent.isCertain('meridiem')) {
        dateTimeComponent.assign('meridiem', timeComponent.get('meridiem'));
    } else if (
        timeComponent.get('meridiem') !== undefined &&
        dateTimeComponent.get('meridiem') === undefined
    ) {
        dateTimeComponent.imply('meridiem', timeComponent.get('meridiem'));
    }

    if (dateTimeComponent.get('meridiem') == 1 && dateTimeComponent.get('hour') < 12) {
        if (timeComponent.isCertain('hour')) {
            dateTimeComponent.assign('hour', dateTimeComponent.get('hour') + 12);
        } else {
            dateTimeComponent.imply('hour', dateTimeComponent.get('hour') + 12);
        }
    }

    return dateTimeComponent;
}

