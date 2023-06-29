import { DebugHandler, DebugConsume } from "./debugging";
import * as en from "./locales/en";
import { Chrono, Parser, Refiner } from "./chrono";
import { ParsingResult } from "./results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "./types";

export { en, Chrono, Parser, Refiner, ParsingResult };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

// Export all locales
import * as de from "./locales/de";
import * as fr from "./locales/fr";
import * as ja from "./locales/ja";
import * as pt from "./locales/pt";
import * as nl from "./locales/nl";
import * as zh from "./locales/zh";
import * as ru from "./locales/ru";
import * as es from "./locales/es";
import * as uk from "./locales/uk";

export { de, fr, ja, pt, nl, zh, ru, es, uk };

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
