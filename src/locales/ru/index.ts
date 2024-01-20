/**
 * Chrono components for Russian support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import RUTimeUnitWithinFormatParser from "./parsers/RUTimeUnitWithinFormatParser";
import RUMonthNameLittleEndianParser from "./parsers/RUMonthNameLittleEndianParser";
import RUMonthNameParser from "./parsers/RUMonthNameParser";
import RUTimeExpressionParser from "./parsers/RUTimeExpressionParser";
import RUTimeUnitAgoFormatParser from "./parsers/RUTimeUnitAgoFormatParser";
import RUMergeDateRangeRefiner from "./refiners/RUMergeDateRangeRefiner";
import RUMergeDateTimeRefiner from "./refiners/RUMergeDateTimeRefiner";

import { includeCommonConfiguration } from "../../configurations";
import RUCasualDateParser from "./parsers/RUCasualDateParser";
import RUCasualTimeParser from "./parsers/RUCasualTimeParser";
import RUWeekdayParser from "./parsers/RUWeekdayParser";
import RURelativeDateFormatParser from "./parsers/RURelativeDateFormatParser";

import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import RUTimeUnitCasualRelativeFormatParser from "./parsers/RUTimeUnitCasualRelativeFormatParser";

export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

/**
 * Chrono object configured for parsing *casual* Russian
 */
export const casual = new Chrono(createCasualConfiguration());

/**
 * Chrono object configured for parsing *strict* Russian
 */
export const strict = new Chrono(createConfiguration(true));

/**
 * A shortcut for ru.casual.parse()
 */
export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for ru.casual.parseDate()
 */
export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

/**
 * Create a default *casual* {@Link Configuration} for Russian chrono.
 * It calls {@Link createConfiguration} and includes additional parsers.
 */
export function createCasualConfiguration(): Configuration {
    const option = createConfiguration(false);
    option.parsers.unshift(new RUCasualDateParser());
    option.parsers.unshift(new RUCasualTimeParser());
    option.parsers.unshift(new RUMonthNameParser());
    option.parsers.unshift(new RURelativeDateFormatParser());
    option.parsers.unshift(new RUTimeUnitCasualRelativeFormatParser());
    return option;
}

/**
 * Create a default {@Link Configuration} for Russian chrono
 *
 * @param strictMode If the timeunit mentioning should be strict, not casual
 */
export function createConfiguration(strictMode = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(true),
                new RUTimeUnitWithinFormatParser(),
                new RUMonthNameLittleEndianParser(),
                new RUWeekdayParser(),
                new RUTimeExpressionParser(strictMode),
                new RUTimeUnitAgoFormatParser(),
            ],
            refiners: [new RUMergeDateTimeRefiner(), new RUMergeDateRangeRefiner()],
        },
        strictMode
    );
}
