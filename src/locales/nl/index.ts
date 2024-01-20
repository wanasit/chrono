/**
 * Chrono components for Dutch support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import NLMergeDateRangeRefiner from "./refiners/NLMergeDateRangeRefiner";
import NLMergeDateTimeRefiner from "./refiners/NLMergeDateTimeRefiner";
import NLCasualDateParser from "./parsers/NLCasualDateParser";
import NLCasualTimeParser from "./parsers/NLCasualTimeParser";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import NLTimeUnitWithinFormatParser from "./parsers/NLTimeUnitWithinFormatParser";
import NLWeekdayParser from "./parsers/NLWeekdayParser";
import NLMonthNameMiddleEndianParser from "./parsers/NLMonthNameMiddleEndianParser";
import NLMonthNameParser from "./parsers/NLMonthNameParser";
import NLSlashMonthFormatParser from "./parsers/NLSlashMonthFormatParser";
import NLTimeExpressionParser from "./parsers/NLTimeExpressionParser";
import NLCasualYearMonthDayParser from "./parsers/NLCasualYearMonthDayParser";
import NLCasualDateTimeParser from "./parsers/NLCasualDateTimeParser";
import NLTimeUnitCasualRelativeFormatParser from "./parsers/NLTimeUnitCasualRelativeFormatParser";
import NLRelativeDateFormatParser from "./parsers/NLRelativeDateFormatParser";
import NLTimeUnitAgoFormatParser from "./parsers/NLTimeUnitAgoFormatParser";
import NLTimeUnitLaterFormatParser from "./parsers/NLTimeUnitLaterFormatParser";

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

export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new NLCasualDateParser());
    option.parsers.unshift(new NLCasualTimeParser());
    option.parsers.unshift(new NLCasualDateTimeParser());
    option.parsers.unshift(new NLMonthNameParser());
    option.parsers.unshift(new NLRelativeDateFormatParser());
    option.parsers.unshift(new NLTimeUnitCasualRelativeFormatParser());
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
                new NLTimeUnitWithinFormatParser(),
                new NLMonthNameMiddleEndianParser(),
                new NLMonthNameParser(),
                new NLWeekdayParser(),
                new NLCasualYearMonthDayParser(),
                new NLSlashMonthFormatParser(),
                new NLTimeExpressionParser(strictMode),
                new NLTimeUnitAgoFormatParser(strictMode),
                new NLTimeUnitLaterFormatParser(strictMode),
            ],
            refiners: [new NLMergeDateTimeRefiner(), new NLMergeDateRangeRefiner()],
        },
        strictMode
    );
}
