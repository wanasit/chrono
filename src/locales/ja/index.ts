/**
 * Chrono components for Japanese support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import JPStandardParser from "./parsers/JPStandardParser";
import JPMergeDateRangeRefiner from "./refiners/JPMergeDateRangeRefiner";
import JPCasualDateParser from "./parsers/JPCasualDateParser";
import JPWeekdayParser from "./parsers/JPWeekdayParser";
import JPSlashDateFormatParser from "./parsers/JPSlashDateFormatParser";
import JPTimeExpressionParser from "./parsers/JPTimeExpressionParser";
import JPMergeDateTimeRefiner from "./refiners/JPMergeDateTimeRefiner";

import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import JPMergeWeekdayComponentRefiner from "./refiners/JPMergeWeekdayComponentRefiner";
import JPWeekdayWithParenthesesParser from "./parsers/JPWeekdayWithParenthesesParser";
import { includeCommonConfiguration } from "../../configurations";
import MergeWeekdayComponentRefiner from "../../common/refiners/MergeWeekdayComponentRefiner";

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
    option.parsers.unshift(new JPCasualDateParser());
    return option;
}

/**
 * @ignore (to be documented later)
 */
export function createConfiguration(strictMode = true): Configuration {
    const configuration = includeCommonConfiguration(
        {
            parsers: [
                new JPStandardParser(),
                new JPWeekdayParser(),
                new JPWeekdayWithParenthesesParser(),
                new JPSlashDateFormatParser(),
                new JPTimeExpressionParser(),
            ],
            refiners: [
                new JPMergeWeekdayComponentRefiner(), // Note: should be before JPMergeDateTimeRefiner and JPMergeDateRangeRefiner
                new JPMergeDateTimeRefiner(),
                new JPMergeDateRangeRefiner(),
            ],
        },
        strictMode
    );

    // Note: Remove because it is not used in Japanese grammar
    configuration.refiners = configuration.refiners.filter(
        (refiner) => !(refiner instanceof MergeWeekdayComponentRefiner)
    );

    return configuration;
}
