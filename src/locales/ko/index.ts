/**
 * Chrono components for Korean support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import KOCasualDateParser from "./parsers/KOCasualDateParser";
import KOWeekdayParser from "./parsers/KOWeekdayParser";
import KOStandardParser from "./parsers/KOStandardParser";
import KOTimeExpressionParser from "./parsers/KOTimeExpressionParser";
import KOMergeDateTimeRefiner from "./refiners/KOMergeDateTimeRefiner";
import KOMergeDateRangeRefiner from "./refiners/KOMergeDateRangeRefiner";

import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import { includeCommonConfiguration } from "../../configurations";

export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

// Shortcuts
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration(true));

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
    const option = createConfiguration(false);
    option.parsers.unshift(new KOCasualDateParser());
    return option;
}

/**
 * @ignore (to be documented later)
 */
export function createConfiguration(strictMode = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [new KOStandardParser(), new KOWeekdayParser(), new KOTimeExpressionParser()],
            refiners: [new KOMergeDateTimeRefiner(), new KOMergeDateRangeRefiner()],
        },
        strictMode
    );
}
