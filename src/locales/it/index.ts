/**
 * Chrono components for Italian support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { Chrono, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";

import ITDefaultConfiguration from "./configuration";

export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

export const configuration = new ITDefaultConfiguration();

/**
 * Chrono object configured for parsing *casual* Italian
 */
export const casual = new Chrono(configuration.createCasualConfiguration());

/**
 * Chrono object configured for parsing *strict* Italian
 */
export const strict = new Chrono(configuration.createConfiguration(true));

/**
 * A shortcut for it.casual.parse()
 */
export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for it.casual.parseDate()
 */
export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}
