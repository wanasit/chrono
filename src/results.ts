import { Component, ParsedComponents, ParsedResult, ParsingReference } from "./index";

import quarterOfYear from "dayjs/plugin/quarterOfYear";
import dayjs, { OpUnitType, QUnitType } from "dayjs";
import { assignSimilarDate, assignSimilarTime, implySimilarTime } from "./utils/dayjs";
import { toTimezoneOffset } from "./timezone";
dayjs.extend(quarterOfYear);

export class ReferenceWithTimezone {
    readonly instant: Date;
    readonly timezoneOffset: number;

    constructor(input?: ParsingReference | Date) {
        input = input ?? new Date();
        if (input instanceof Date) {
            this.instant = input;
            this.timezoneOffset = -input.getTimezoneOffset();
        } else {
            this.instant = input.instant ?? new Date();
            this.timezoneOffset = toTimezoneOffset(input.timezone ?? -this.instant.getTimezoneOffset());
        }
    }
}

export class ParsingComponents implements ParsedComponents {
    private knownValues: { [c in Component]?: number };
    private impliedValues: { [c in Component]?: number };
    private reference: ReferenceWithTimezone;

    constructor(reference: ReferenceWithTimezone, knownComponents?: { [c in Component]?: number }) {
        this.reference = reference;
        this.knownValues = {};
        this.impliedValues = {};
        if (knownComponents) {
            for (const key in knownComponents) {
                this.knownValues[key as Component] = knownComponents[key as Component];
            }
        }

        const refDayJs = dayjs(reference.instant);
        this.imply("day", refDayJs.date());
        this.imply("month", refDayJs.month() + 1);
        this.imply("year", refDayJs.year());
        this.imply("hour", 12);
        this.imply("minute", 0);
        this.imply("second", 0);
        this.imply("millisecond", 0);
    }

    get(component: Component): number | null {
        if (component in this.knownValues) {
            return this.knownValues[component];
        }

        if (component in this.impliedValues) {
            return this.impliedValues[component];
        }

        return null;
    }

    isCertain(component: Component): boolean {
        return component in this.knownValues;
    }

    getCertainComponents(): Array<Component> {
        return Object.keys(this.knownValues) as Array<Component>;
    }

    imply(component: Component, value: number): ParsingComponents {
        if (component in this.knownValues) {
            return this;
        }
        this.impliedValues[component] = value;
        return this;
    }

    assign(component: Component, value: number): ParsingComponents {
        this.knownValues[component] = value;
        delete this.impliedValues[component];
        return this;
    }

    delete(component: Component) {
        delete this.knownValues[component];
        delete this.impliedValues[component];
    }

    clone(): ParsingComponents {
        const component = new ParsingComponents(this.reference);
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

    isOnlyDate(): boolean {
        return !this.isCertain("hour") && !this.isCertain("minute") && !this.isCertain("second");
    }

    isOnlyTime(): boolean {
        return !this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
    }

    isOnlyWeekdayComponent(): boolean {
        return this.isCertain("weekday") && !this.isCertain("day") && !this.isCertain("month");
    }

    isOnlyDayMonthComponent(): boolean {
        return this.isCertain("day") && this.isCertain("month") && !this.isCertain("year");
    }

    isValidDate(): boolean {
        const date = this.dateWithoutTimezoneAdjustment();

        if (date.getFullYear() !== this.get("year")) return false;
        if (date.getMonth() !== this.get("month") - 1) return false;
        if (date.getDate() !== this.get("day")) return false;
        if (this.get("hour") != null && date.getHours() != this.get("hour")) return false;
        if (this.get("minute") != null && date.getMinutes() != this.get("minute")) return false;

        return true;
    }

    toString() {
        return `[ParsingComponents {knownValues: ${JSON.stringify(this.knownValues)}, impliedValues: ${JSON.stringify(
            this.impliedValues
        )}}]`;
    }

    dayjs() {
        return dayjs(this.date());
    }

    date(): Date {
        const date = this.dateWithoutTimezoneAdjustment();
        return new Date(date.getTime() + this.getSystemTimezoneAdjustmentMinute() * 60000);
    }

    private dateWithoutTimezoneAdjustment() {
        const date = new Date(
            this.get("year"),
            this.get("month") - 1,
            this.get("day"),
            this.get("hour"),
            this.get("minute"),
            this.get("second"),
            this.get("millisecond")
        );

        date.setFullYear(this.get("year"));
        return date;
    }

    private getSystemTimezoneAdjustmentMinute() {
        const currentTimezoneOffset = -new Date().getTimezoneOffset();
        const targetTimezoneOffset = this.get("timezoneOffset") ?? this.reference.timezoneOffset;

        return currentTimezoneOffset - targetTimezoneOffset;
    }

    static createRelativeFromRefInstant(
        refInstant: Date,
        fragments: { [c in OpUnitType | QUnitType]?: number }
    ): ParsingComponents {
        let date = dayjs(refInstant);
        for (const key in fragments) {
            date = date.add(fragments[key as OpUnitType], key as OpUnitType);
        }

        const reference = new ReferenceWithTimezone(refInstant);
        const components = new ParsingComponents(reference);
        if (fragments["hour"] || fragments["minute"] || fragments["second"]) {
            assignSimilarTime(components, date);
            assignSimilarDate(components, date);
            components.assign("timezoneOffset", -refInstant.getTimezoneOffset());
        } else {
            implySimilarTime(components, date);
            components.imply("timezoneOffset", -refInstant.getTimezoneOffset());

            if (fragments["d"]) {
                components.assign("day", date.date());
                components.assign("month", date.month() + 1);
                components.assign("year", date.year());
            } else {
                if (fragments["week"]) {
                    components.imply("weekday", date.day());
                }

                components.imply("day", date.date());
                if (fragments["month"]) {
                    components.assign("month", date.month() + 1);
                    components.assign("year", date.year());
                } else {
                    components.imply("month", date.month() + 1);
                    if (fragments["year"]) {
                        components.assign("year", date.year());
                    } else {
                        components.imply("year", date.year());
                    }
                }
            }
        }

        return components;
    }
}

export class ParsingResult implements ParsedResult {
    refDate: Date;
    index: number;
    text: string;

    reference: ReferenceWithTimezone;

    start: ParsingComponents;
    end?: ParsingComponents;

    constructor(
        reference: ReferenceWithTimezone,
        index: number,
        text: string,
        start?: ParsingComponents,
        end?: ParsingComponents
    ) {
        this.reference = reference;
        this.refDate = reference.instant;
        this.index = index;
        this.text = text;
        this.start = start || new ParsingComponents(reference);
        this.end = end;
    }

    clone() {
        const result = new ParsingResult(this.reference, this.index, this.text);
        result.start = this.start ? this.start.clone() : null;
        result.end = this.end ? this.end.clone() : null;
        return result;
    }

    date(): Date {
        return this.start.date();
    }

    toString() {
        return `[ParsingResult {index: ${this.index}, text: '${this.text}', ...}]`;
    }
}
