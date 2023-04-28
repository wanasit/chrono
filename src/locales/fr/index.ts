/**
 * Chrono components for French support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import FRCasualDateParser from "./parsers/FRCasualDateParser";
import FRCasualTimeParser from "./parsers/FRCasualTimeParser";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import FRTimeExpressionParser from "./parsers/FRTimeExpressionParser";
import FRMergeDateTimeRefiner from "./refiners/FRMergeDateTimeRefiner";
import FRMergeDateRangeRefiner from "./refiners/FRMergeDateRangeRefiner";
import FRWeekdayParser from "./parsers/FRWeekdayParser";
import FRSpecificTimeExpressionParser from "./parsers/FRSpecificTimeExpressionParser";
import FRMonthNameLittleEndianParser from "./parsers/FRMonthNameLittleEndianParser";
import FRTimeUnitAgoFormatParser from "./parsers/FRTimeUnitAgoFormatParser";
import FRTimeUnitWithinFormatParser from "./parsers/FRTimeUnitWithinFormatParser";
import FRTimeUnitRelativeFormatParser from "./parsers/FRTimeUnitRelativeFormatParser";

export { Chrono, Parser, Refiner, ParsingResult };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

// Shortcuts
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration(true));

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

/**
 * @ignore (to be documented later)
 */
export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new FRCasualDateParser());
    option.parsers.unshift(new FRCasualTimeParser());
    option.parsers.unshift(new FRTimeUnitRelativeFormatParser());
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
                new FRMonthNameLittleEndianParser(),
                new FRTimeExpressionParser(),
                new FRSpecificTimeExpressionParser(),
                new FRTimeUnitAgoFormatParser(),
                new FRTimeUnitWithinFormatParser(),
                new FRWeekdayParser(),
            ],
            refiners: [new FRMergeDateTimeRefiner(), new FRMergeDateRangeRefiner()],
        },
        strictMode
    );
}
