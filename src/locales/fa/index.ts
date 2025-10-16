/**
 * Chrono components for Persian (Farsi) support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";

import FACasualDateParser from "./parsers/FACasualDateParser";
import FACasualTimeParser from "./parsers/FACasualTimeParser";
import FAWeekdayParser from "./parsers/FAWeekdayParser";
import FAMonthNameLittleEndianParser from "./parsers/FAMonthNameLittleEndianParser";
import FATimeExpressionParser from "./parsers/FATimeExpressionParser";
import FATimeUnitAgoFormatParser from "./parsers/FATimeUnitAgoFormatParser";
import FATimeUnitLaterFormatParser from "./parsers/FATimeUnitLaterFormatParser";
import FATimeUnitWithinFormatParser from "./parsers/FATimeUnitWithinFormatParser";
import FARelativeDateFormatParser from "./parsers/FARelativeDateFormatParser";
import FATimeUnitCasualRelativeFormatParser from "./parsers/FATimeUnitCasualRelativeFormatParser";
import FAMergeDateTimeRefiner from "./refiners/FAMergeDateTimeRefiner";
import FAMergeDateRangeRefiner from "./refiners/FAMergeDateRangeRefiner";

export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

/**
 * Chrono object configured for parsing *casual* Persian (Farsi)
 */
export const casual = new Chrono(createCasualConfiguration());

/**
 * Chrono object configured for parsing *strict* Persian (Farsi)
 */
export const strict = new Chrono(createConfiguration(true));

/**
 * A shortcut for fa.casual.parse()
 */
export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for fa.casual.parseDate()
 */
export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date | null {
    return casual.parseDate(text, ref, option);
}

/**
 * Create a casual configuration for Persian (Farsi)
 * Includes casual expressions, time units, and relative dates
 */
export function createCasualConfiguration(): Configuration {
    const option = createConfiguration(false);
    option.parsers.unshift(new FARelativeDateFormatParser());
    option.parsers.unshift(new FATimeUnitCasualRelativeFormatParser());
    option.parsers.unshift(new FACasualDateParser());
    option.parsers.unshift(new FACasualTimeParser());
    return option;
}

/**
 * Create a strict configuration for Persian (Farsi)
 *
 * @param strictMode If true, requires more explicit date/time formats
 */
export function createConfiguration(strictMode = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new FAMonthNameLittleEndianParser(),
                new FAWeekdayParser(),
                new FARelativeDateFormatParser(),
                new FATimeExpressionParser(),
                new FATimeUnitAgoFormatParser(),
                new FATimeUnitLaterFormatParser(),
                new FATimeUnitWithinFormatParser(),
            ],
            refiners: [new FAMergeDateTimeRefiner(), new FAMergeDateRangeRefiner()],
        },
        strictMode
    );
}
