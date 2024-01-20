/**
 * Chrono components for Spanish support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ESWeekdayParser from "./parsers/ESWeekdayParser";
import ESTimeExpressionParser from "./parsers/ESTimeExpressionParser";
import ESMergeDateTimeRefiner from "./refiners/ESMergeDateTimeRefiner";
import ESMergeDateRangeRefiner from "./refiners/ESMergeDateRangeRefiner";
import ESMonthNameLittleEndianParser from "./parsers/ESMonthNameLittleEndianParser";
import ESCasualDateParser from "./parsers/ESCasualDateParser";
import ESCasualTimeParser from "./parsers/ESCasualTimeParser";
import ESTimeUnitWithinFormatParser from "./parsers/ESTimeUnitWithinFormatParser";

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
export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.push(new ESCasualDateParser());
    option.parsers.push(new ESCasualTimeParser());
    return option;
}

/**
 * @ignore (to be documented later)
 */
export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(littleEndian),
                new ESWeekdayParser(),
                new ESTimeExpressionParser(),
                new ESMonthNameLittleEndianParser(),
                new ESTimeUnitWithinFormatParser(),
            ],
            refiners: [new ESMergeDateTimeRefiner(), new ESMergeDateRangeRefiner()],
        },
        strictMode
    );
}
