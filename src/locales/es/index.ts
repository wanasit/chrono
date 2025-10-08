/**
 * Chrono components for Spanish support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { Chrono, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";

import ESDefaultConfiguration from "./configuration";

export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

export const configuration = new ESDefaultConfiguration();

/**
 * Chrono object configured for parsing *casual* Spanish
 */
export const casual = new Chrono(configuration.createCasualConfiguration(true));

/**
 * Chrono object configured for parsing *strict* Spanish
 */
export const strict = new Chrono(configuration.createConfiguration(true, true));

/**
 * A shortcut for es.casual.parse()
 */
export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for es.casual.parseDate()
 */
export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}
