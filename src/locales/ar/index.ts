/**
 * Chrono components for Arabic support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";

import ARCasualDateParser from "./parsers/ARCasualDateParser";
import ARCasualTimeParser from "./parsers/ARCasualTimeParser";
import ARWeekdayParser from "./parsers/ARWeekdayParser";
import ARMonthNameLittleEndianParser from "./parsers/ARMonthNameLittleEndianParser";
import ARMonthNameParser from "./parsers/ARMonthNameParser";
import ARTimeExpressionParser from "./parsers/ARTimeExpressionParser";
import ARTimeUnitAgoFormatParser from "./parsers/ARTimeUnitAgoFormatParser";
import ARTimeUnitLaterFormatParser from "./parsers/ARTimeUnitLaterFormatParser";
import ARTimeUnitWithinFormatParser from "./parsers/ARTimeUnitWithinFormatParser";
import ARRelativeDateFormatParser from "./parsers/ARRelativeDateFormatParser";

import ARMergeDateTimeRefiner from "./refiners/ARMergeDateTimeRefiner";
import ARMergeDateRangeRefiner from "./refiners/ARMergeDateRangeRefiner";

export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

/**
 * Chrono object configured for parsing *casual* Arabic
 */
export const casual = new Chrono(createCasualConfiguration());

/**
 * Chrono object configured for parsing *strict* Arabic
 */
export const strict = new Chrono(createConfiguration(true));

/**
 * A shortcut for ar.casual.parse()
 */
export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for ar.casual.parseDate()
 */
export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date | null {
    return casual.parseDate(text, ref, option);
}

/**
 * Create a default *casual* {@link Configuration} for Arabic chrono.
 */
export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new ARCasualDateParser());
    option.parsers.unshift(new ARCasualTimeParser());
    option.parsers.unshift(new ARMonthNameParser());
    option.parsers.unshift(new ARRelativeDateFormatParser());
    return option;
}

/**
 * Create a default {@link Configuration} for Arabic chrono
 */
export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(littleEndian),
                new ARTimeUnitWithinFormatParser(),
                new ARMonthNameLittleEndianParser(),
                new ARWeekdayParser(),
                new ARTimeExpressionParser(strictMode),
                new ARTimeUnitAgoFormatParser(),
                new ARTimeUnitLaterFormatParser(),
            ],
            refiners: [new ARMergeDateTimeRefiner(), new ARMergeDateRangeRefiner()],
        },
        strictMode
    );
}
