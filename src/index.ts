import { DebugHandler, DebugConsume } from "./debugging";
import * as en from "./locales/en";
import { Chrono, Parser, Refiner } from "./chrono";

export { en, Chrono, Parser, Refiner };

export interface ParsingOption {
    /**
     * To parse only forward dates (the results should be after the reference date).
     * This effects date/time implication (e.g. weekday or time mentioning)
     */
    forwardDate?: boolean;

    /**
     * Additional timezone keywords for the parsers to recognize
     */
    timezones?: { [tzKeyword: string]: number };

    /**
     * Internal debug event handler.
     * @internal
     */
    debug?: DebugHandler | DebugConsume;
}

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

// Export all locales
import * as de from "./locales/de";
import * as fr from "./locales/fr";
import * as ja from "./locales/ja";
import * as pt from "./locales/pt";
import * as nl from "./locales/nl";
export { de, fr, ja, pt, nl };

/**
 * A shortcut for {@link en | chrono.en.strict}
 */
export const strict = en.strict;

/**
 * A shortcut for {@link en | chrono.en.casual}
 */
export const casual = en.casual;

/**
 * A shortcut for {@link en | chrono.en.casual.parse()}
 */
export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for {@link en | chrono.en.casual.parseDate()}
 */
export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}
