import {Component, ParsedComponents, ParsedResult} from "./index";

import dayjs, {OpUnitType} from 'dayjs';

export class ParsingComponents implements ParsedComponents {
    private knownValues: {[c in Component]?: number}
    private impliedValues: {[c in Component]?: number}

    constructor(
        refDate: Date,
        knownComponents?: {[c in Component]?: number},
    ) {
        this.knownValues = {};
        this.impliedValues = {};
        if (knownComponents) {
            for (const key in knownComponents) {
                this.knownValues[key as Component] = knownComponents[key as Component];
            }
        }

        const refDayJs = dayjs(refDate);
        this.imply('day', refDayJs.date());
        this.imply('month', refDayJs.month() + 1);
        this.imply('year', refDayJs.year())
        this.imply('hour', 12);
        this.imply('minute', 0);
        this.imply('second', 0);
        this.imply('millisecond', 0);
    }

    get(component: Component) : (number | undefined) {

        if (component in this.knownValues) {
            return this.knownValues[component];
        }

        if (component in this.impliedValues) {
            return this.impliedValues[component];
        }

        return null;
    }

    date() : Date {
        return this.dayjs().toDate();
    }

    isCertain(component: Component) : boolean {
        return component in this.knownValues;
    }

    getCertainComponents() : Array<Component> {
        return Object.keys(this.knownValues) as Array<Component>
    }

    imply(component: Component, value: number) : ParsingComponents {
        if (component in this.knownValues) {
            return this;
        }
        this.impliedValues[component] = value;
        return this;
    }

    assign(component: Component, value: number) : ParsingComponents{
        this.knownValues[component] = value;
        delete this.impliedValues[component];
        return this;
    }

    clone() : ParsingComponents {
        const component = new ParsingComponents(new Date());
        component.knownValues = {};
        component.impliedValues = {};

        for (const key in this.knownValues) {
            component.knownValues[key as Component] = this.knownValues[key as Component];
        }

        for (const key in this.impliedValues) {
            component.impliedValues[key as Component] = this.impliedValues[key as Component];
        }

        return component;
    }

    isOnlyDate() : boolean {
        return !this.isCertain('hour') && !this.isCertain('minute') && !this.isCertain('second');
    }

    isOnlyTime() : boolean {
        return !this.isCertain('weekday') && !this.isCertain('day') && !this.isCertain('month');
    }

    isOnlyWeekdayComponent() : boolean {
        return this.isCertain('weekday') && !this.isCertain('day') && !this.isCertain('month');
    }

    isOnlyDayMonthComponent() : boolean {
        return this.isCertain('day') && this.isCertain('month') && !this.isCertain('year');
    }

    isValidDate() : boolean {
        let dateMoment = this.dayjs();
        if (this.isCertain('timezoneOffset')) {
            const adjustTimezoneOffset = this.get('timezoneOffset') - dateMoment.utcOffset();
            dateMoment = dateMoment.add(adjustTimezoneOffset, 'minute');
        }

        if (dateMoment.get('year') != this.get('year')) return false;
        if (dateMoment.get('month') != this.get('month')-1) return false;
        if (dateMoment.get('date') != this.get('day')) return false;
        if (this.get('hour') != null && dateMoment.get('hour') != this.get('hour')) return false;
        if (this.get('minute') != null && dateMoment.get('minute') != this.get('minute')) return false;

        return true;
    }

    dayjs() {
        let result = dayjs();

        result = result.year(this.get('year'));
        result = result.month(this.get('month') - 1);
        result = result.date(this.get('day'));
        result = result.hour(this.get('hour'));
        result = result.minute(this.get('minute'));
        result = result.second(this.get('second'));
        result = result.millisecond(this.get('millisecond'));

        // Javascript Date Object return minus timezone offset
        const currentTimezoneOffset = result.utcOffset();
        const targetTimezoneOffset = this.get('timezoneOffset') !== null ?
            this.get('timezoneOffset') : currentTimezoneOffset;

        const adjustTimezoneOffset = targetTimezoneOffset - currentTimezoneOffset;
        result = result.add(-adjustTimezoneOffset, 'minute');

        return result;
    }

    toString() {
        return `[ParsingComponents {knownValues: ${JSON.stringify(this.knownValues)}, impliedValues: ${JSON.stringify(this.impliedValues)}}]`;
    }


    static createRelativeFromRefDate(refDate:Date, fragments: {[c in OpUnitType]?: number}) : ParsingComponents{
        let date = dayjs(refDate);
        for (const key in fragments) {
            date = date.add(fragments[key as OpUnitType], key as OpUnitType);
        }

        const components = new ParsingComponents(refDate);
        if (fragments['hour'] || fragments['minute'] || fragments['second']) {
            components.assign('hour', date.hour());
            components.assign('minute', date.minute());
            components.assign('second', date.second());
        } else {
            components.imply('hour', date.hour());
            components.imply('minute', date.minute());
            components.imply('second', date.second());
        }

        if (fragments['d'] || fragments['month'] || fragments['year']) {
            components.assign('day', date.date());
            components.assign('month', date.month() + 1);
            components.assign('year', date.year());
        } else {
            if (fragments['week']) {
                components.imply('weekday', date.day());
            }

            components.imply('day', date.date());
            components.imply('month', date.month() + 1);
            components.imply('year', date.year());
        }

        return components;
    }
}

export class ParsingResult implements ParsedResult {

    refDate: Date;
    index: number;
    text: string;

    start: ParsingComponents;
    end?: ParsingComponents;

    constructor(
        refDate: Date,
        index: number,
        text: string,
        start?: ParsingComponents,
        end?: ParsingComponents,
    ) {
        this.refDate = refDate;
        this.index = index;
        this.text  = text;
        this.start = start || new ParsingComponents(this.refDate);
        this.end = end;
    }

    clone() {
        const result = new ParsingResult(this.refDate, this.index, this.text);
        result.start = this.start ? this.start.clone() : null;
        result.end = this.end ? this.end.clone() : null;
        return result
    }

    date(): Date {
        return this.start.date();
    }

    toString() {
        return `[ParsingResult {index: ${this.index}, text: '${this.text}', ...}]`;
    }
}