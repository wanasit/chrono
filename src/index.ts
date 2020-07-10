import {DebugHandler, DebugConsume} from "./debugging";
import * as en from './locales/en';

export {Chrono} from './chrono';
export const strict = en.strict;
export const casual = en.casual;

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption) : Date {
    return casual.parseDate(text, ref, option);
}

export interface ParsingOption {
    forwardDate?: boolean
    debug?: DebugHandler | DebugConsume
    timezones?: {string: number}
}

export interface ParsedResult {
    readonly refDate: Date
    readonly index: number
    readonly text: string

    readonly start: ParsedComponents
    readonly end?: ParsedComponents

    readonly date: () => Date
}

export interface ParsedComponents {
    readonly isCertain: (c: Component) => boolean
    readonly get: (c: Component) => number | undefined
    readonly date: () => Date
}

export type Component =
    'year' | 'month' | 'day' | 'weekday' |
    'hour' | 'minute' | 'second' | 'millisecond' | 'meridiem' |
    'timezoneOffset';

export enum Meridiem {
    AM = 0,
    PM = 1
}

// export * as xx from './locales/xx'
export * as en from './locales/en'
export * as ja from './locales/ja'

