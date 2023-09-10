import { Component, ParsedComponents, ParsedResult, ParsingReference } from "./types";

import quarterOfYear from "dayjs/plugin/quarterOfYear";
import dayjs, { QUnitType } from "dayjs";
import { assignSimilarDate, assignSimilarTime, implySimilarTime } from "./utils/dayjs";
import { toTimezoneOffset } from "./timezone";
dayjs.extend(quarterOfYear);

export class ReferenceWithTimezone {
    readonly instant: Date;
    readonly timezoneOffset?: number | null;

    constructor(input?: ParsingReference | Date) {
        input = input ?? new Date();
        if (input instanceof Date) {
            this.instant = input;
        } else {
            this.instant = input.instant ?? new Date();
            this.timezoneOffset = toTimezoneOffset(input.timezone, this.instant);
        }
    }

    /**
     * Returns a JS date (system timezone) with the { year, month, day, hour, minute, second } equal to the reference.
     * The output's instant is NOT the reference's instant when the reference's and system's timezone are different.
     */
    getDateWithAdjustedTimezone() {
        return new Date(this.instant.getTime() + this.getSystemTimezoneAdjustmentMinute(this.instant) * 60000);
    }

    /**
     * Returns the number minutes difference between the JS date's timezone and the reference timezone.
     * @param date
     * @param overrideTimezoneOffset
     */
    getSystemTimezoneAdjustmentMinute(date?: Date, overrideTimezoneOffset?: number): number {
        if (!date || date.getTime() < 0) {
            // Javascript date timezone calculation got effect when the time epoch < 0
            // e.g. new Date('Tue Feb 02 1300 00:00:00 GMT+0900 (JST)') => Tue Feb 02 1300 00:18:59 GMT+0918 (JST)
            date = new Date();
        }

        const currentTimezoneOffset = -date.getTimezoneOffset();
        const targetTimezoneOffset = overrideTimezoneOffset ?? this.timezoneOffset ?? currentTimezoneOffset;
        return currentTimezoneOffset - targetTimezoneOffset;
    }
}

export class ParsingComponents implements ParsedComponents {
    private knownValues: { [c in Component]?: number };
    private impliedValues: { [c in Component]?: number };
    private reference: ReferenceWithTimezone;
    private _tags = new Set<string>();

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

    isDateWithUnknownYear(): boolean {
        return this.isCertain("month") && !this.isCertain("year");
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
        return `[ParsingComponents {
            tags: ${JSON.stringify(Array.from(this._tags).sort())}, 
            knownValues: ${JSON.stringify(this.knownValues)}, 
            impliedValues: ${JSON.stringify(this.impliedValues)}}, 
            reference: ${JSON.stringify(this.reference)}]`;
    }

    dayjs() {
        return dayjs(this.date());
    }

    date(): Date {
        const date = this.dateWithoutTimezoneAdjustment();
        const timezoneAdjustment = this.reference.getSystemTimezoneAdjustmentMinute(date, this.get("timezoneOffset"));
        return new Date(date.getTime() + timezoneAdjustment * 60000);
    }

    addTag(tag: string): ParsingComponents {
        this._tags.add(tag);
        return this;
    }

    addTags(tags: string[] | Set<string>): ParsingComponents {
        for (const tag of tags) {
            this._tags.add(tag);
        }
        return this;
    }

    tags(): Set<string> {
        return new Set(this._tags);
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

    static createRelativeFromReference(
        reference: ReferenceWithTimezone,
        fragments: { [c in QUnitType]?: number }
    ): ParsingComponents {
        let date = dayjs(reference.instant);
        for (const key in fragments) {
            date = date.add(fragments[key as QUnitType], key as QUnitType);
        }

        const components = new ParsingComponents(reference);
        if (fragments["hour"] || fragments["minute"] || fragments["second"]) {
            assignSimilarTime(components, date);
            assignSimilarDate(components, date);
            if (reference.timezoneOffset !== null) {
                components.assign("timezoneOffset", -reference.instant.getTimezoneOffset());
            }
        } else {
            implySimilarTime(components, date);
            if (reference.timezoneOffset !== null) {
                components.imply("timezoneOffset", -reference.instant.getTimezoneOffset());
            }

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

    tags(): Set<string> {
        const combinedTags: Set<string> = new Set(this.start.tags());
        if (this.end) {
            for (const tag of this.end.tags()) {
                combinedTags.add(tag);
            }
        }
        return combinedTags;
    }

    toString() {
        const tags = Array.from(this.tags()).sort();
        return `[ParsingResult {index: ${this.index}, text: '${this.text}', tags: ${JSON.stringify(tags)} ...}]`;
    }
}
