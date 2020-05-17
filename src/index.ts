import {DebugHandler, DebugConsume} from "./debugging";
import * as en from './locales/en';

export {Chrono} from './chrono';
export const strict = en.strict;
export const casual = en.casual;

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse.apply(casual, arguments);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption) : Date {
    return casual.parseDate.apply(casual, arguments);
}

export interface ParsingOption {
    forwardDate?: boolean
    debug?: DebugHandler | DebugConsume
}

export interface ParsedResult {
    readonly refDate: Date
    readonly index: number
    readonly text: string

    readonly start: ParsedComponents
    readonly end?: ParsedComponents

    date: () => Date
}

export interface ParsedComponents {
    get: (c: Component) => string | number
    date: () => Date
}

export type Component =
    'year' | 'month' | 'day' | 'weekday' |
    'hour' | 'minute' | 'second' | 'millisecond' | 'meridiem' |
    'timezoneOffset'

// export * as xx from './locales/xx'
export * as en from './locales/en'
export * as ja from './locales/ja'

