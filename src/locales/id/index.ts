/**
 * Chrono components for Indonesian support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import IDCasualDateParser from "./parsers/IDCasualDateParser";
import IDCasualTimeParser from "./parsers/IDCasualTimeParser";
import IDMonthNameLittleEndianParser from "./parsers/IDMonthNameLittleEndianParser";
import IDMonthNameParser from "./parsers/IDMonthNameParser";
import IDMonthNameMiddleEndianParser from "./parsers/IDMonthNameMiddleEndianParser";
import IDWeekdayParser from "./parsers/IDWeekdayParser";
import IDTimeExpressionParser from "./parsers/IDTimeExpressionParser";
import IDTimeUnitAgoFormatParser from "./parsers/IDTimeUnitAgoFormatParser";
import IDTimeUnitLaterFormatParser from "./parsers/IDTimeUnitLaterFormatParser";
import IDTimeUnitWithinFormatParser from "./parsers/IDTimeUnitWithinFormatParser";
import IDRelativeDateFormatParser from "./parsers/IDRelativeDateFormatParser";
import IDMergeDateRangeRefiner from "./refiners/IDMergeDateRangeRefiner";
import IDMergeDateTimeRefiner from "./refiners/IDMergeDateTimeRefiner";

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
 * Create a default *casual* {@Link Configuration} for Indonesian chrono.
 * It calls {@Link createConfiguration} and includes additional parsers.
 */
export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new IDCasualDateParser());
    option.parsers.unshift(new IDCasualTimeParser());
    option.parsers.unshift(new IDMonthNameParser());
    option.parsers.unshift(new IDRelativeDateFormatParser());
    return option;
}

/**
 * Create a default {@Link Configuration} for Indonesian chrono
 *
 * @param strictMode If the timeunit mentioning should be strict, not casual
 * @param littleEndian If format should be date-first/littleEndian (e.g. 17/08/1945), which is the Indonesian default
 */
export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(littleEndian),
                new IDMonthNameLittleEndianParser(),
                new IDMonthNameMiddleEndianParser(),
                new IDWeekdayParser(),
                new IDTimeExpressionParser(strictMode),
                new IDTimeUnitWithinFormatParser(),
                new IDTimeUnitAgoFormatParser(),
                new IDTimeUnitLaterFormatParser(),
            ],
            refiners: [new IDMergeDateTimeRefiner(), new IDMergeDateRangeRefiner()],
        },
        strictMode
    );
}
