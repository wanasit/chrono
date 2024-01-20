/**
 * Chrono components for Japanese support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import JPStandardParser from "./parsers/JPStandardParser";
import JPMergeDateRangeRefiner from "./refiners/JPMergeDateRangeRefiner";
import JPCasualDateParser from "./parsers/JPCasualDateParser";

import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";

export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

// Shortcuts
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration());

export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

/**
 * @ignore (to be documented later)
 */
export function createCasualConfiguration(): Configuration {
    const option = createConfiguration();
    option.parsers.unshift(new JPCasualDateParser());
    return option;
}

/**
 * @ignore (to be documented later)
 */
export function createConfiguration(): Configuration {
    return {
        parsers: [new JPStandardParser()],
        refiners: [new JPMergeDateRangeRefiner()],
    };
}
