import { DebugConsume, DebugHandler } from "./debugging";

export interface ParsingOption {
    /**
     * To parse only forward dates (the results should be after the reference date).
     * This effects date/time implication (e.g. weekday or time mentioning)
     */
    forwardDate?: boolean;

    /**
     * Additional timezone keywords for the parsers to recognize.
     * Any value provided will override the default handling of that value.
     */
    timezones?: TimezoneAbbrMap;

    /**
     * Internal debug event handler.
     * @internal
     */
    debug?: DebugHandler | DebugConsume;
}

/**
 * Some timezone abbreviations are ambiguous in that they refer to different offsets
 * depending on the time of year — daylight savings time (DST), or non-DST. This interface
 * allows defining such timezones
 */
export interface AmbiguousTimezoneMap {
    timezoneOffsetDuringDst: number;
    timezoneOffsetNonDst: number;
    /**
     * Return the start date of DST for the given year.
     * timezone.ts contains helper methods for common such rules.
     */
    dstStart: (year: number) => Date;
    /**
     * Return the end date of DST for the given year.
     * timezone.ts contains helper methods for common such rules.
     */
    dstEnd: (year: number) => Date;
}

/**
 * A map describing how timezone abbreviations should map to time offsets.
 * Supports both unambigous mappings abbreviation => offset,
 * and ambiguous mappings, where the offset will depend on whether the
 * time in question is during daylight savings time or not.
 */
export type TimezoneAbbrMap = { [key: string]: number | AmbiguousTimezoneMap };

export interface ParsingReference {
    /**
     * Reference date. The instant (JavaScript Date object) when the input is written or mention.
     * This effect date/time implication (e.g. weekday or time mentioning).
     * (default = now)
     */
    instant?: Date;

    /**
     * Reference timezone. The timezone where the input is written or mention.
     * Date/time implication will account the difference between input timezone and the current system timezone.
     * (default = current timezone)
     */
    timezone?: string | number;
}

/**
 * Parsed result or final output.
 * Each result object represents a date/time (or date/time-range) mentioning in the input.
 */
export interface ParsedResult {
    readonly refDate: Date;
    readonly index: number;
    readonly text: string;

    readonly start: ParsedComponents;
    readonly end?: ParsedComponents;

    /**
     * Create a javascript date object (from the result.start).
     */
    date(): Date;
}

/**
 * A collection of parsed date/time components (e.g. day, hour, minute, ..., etc).
 *
 * Each parsed component has three different levels of certainty.
 * - *Certain* (or *Known*): The component is directly mentioned and parsed.
 * - *Implied*: The component is not directly mentioned, but implied by other parsed information.
 * - *Unknown*: Completely no mention of the component.
 */
export interface ParsedComponents {
    /**
     * Check the component certainly if the component is *Certain* (or *Known*)
     */
    isCertain(component: Component): boolean;

    /**
     * Get the component value for either *Certain* or *Implied* value.
     */
    get(component: Component): number | null;

    /**
     * @return a javascript date object.
     */
    date(): Date;
}

export type Component =
    | "year"
    | "month"
    | "day"
    | "weekday"
    | "hour"
    | "minute"
    | "second"
    | "millisecond"
    | "meridiem"
    | "timezoneOffset";

export enum Meridiem {
    AM = 0,
    PM = 1,
}

export enum Weekday {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
}

export enum Month {
    JANUARY = 1,
    FEBRUARY = 2,
    MARCH = 3,
    APRIL = 4,
    MAY = 5,
    JUNE = 6,
    JULY = 7,
    AUGUST = 8,
    SEPTEMBER = 9,
    OCTOBER = 10,
    NOVEMBER = 11,
    DECEMBER = 12,
}
