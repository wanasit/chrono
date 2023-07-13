/**
 * Chrono components for Ukrainian support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import UKTimeUnitWithinFormatParser from "./parsers/UKTimeUnitWithinFormatParser";
import UKMonthNameLittleEndianParser from "./parsers/UKMonthNameLittleEndianParser";
import UkMonthNameParser from "./parsers/UKMonthNameParser";
import UKTimeExpressionParser from "./parsers/UKTimeExpressionParser";
import UKTimeUnitAgoFormatParser from "./parsers/UKTimeUnitAgoFormatParser";
import UKMergeDateRangeRefiner from "./refiners/UKMergeDateRangeRefiner";
import UKMergeDateTimeRefiner from "./refiners/UKMergeDateTimeRefiner";

import { includeCommonConfiguration } from "../../configurations";
import UKCasualDateParser from "./parsers/UKCasualDateParser";
import UKCasualTimeParser from "./parsers/UKCasualTimeParser";
import UKWeekdayParser from "./parsers/UKWeekdayParser";
import UKRelativeDateFormatParser from "./parsers/UKRelativeDateFormatParser";

import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import UKTimeUnitCasualRelativeFormatParser from "./parsers/UKTimeUnitCasualRelativeFormatParser";
import ISOFormatParser from "../../common/parsers/ISOFormatParser";

export { Chrono, Parser, Refiner, ParsingResult };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

/**
 * Chrono object configured for parsing *casual* Ukrainian
 */
export const casual = new Chrono(createCasualConfiguration());

/**
 * Chrono object configured for parsing *strict* Ukrainian
 */
export const strict = new Chrono(createConfiguration(true));

/**
 * Create a default *casual* {@Link Configuration} for Ukrainian chrono.
 * It calls {@Link createConfiguration} and includes additional parsers.
 */
export function createCasualConfiguration(): Configuration {
    const option = createConfiguration(false);
    option.parsers.unshift(new UKCasualDateParser());
    option.parsers.unshift(new UKCasualTimeParser());
    option.parsers.unshift(new UkMonthNameParser());
    option.parsers.unshift(new UKRelativeDateFormatParser());
    option.parsers.unshift(new UKTimeUnitCasualRelativeFormatParser());
    return option;
}

/**
 * Create a default {@Link Configuration} for Ukrainian chrono
 *
 * @param strictMode If the timeunit mentioning should be strict, not casual
 */
export function createConfiguration(strictMode: boolean): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new ISOFormatParser(),
                new SlashDateFormatParser(true),
                new UKTimeUnitWithinFormatParser(),
                new UKMonthNameLittleEndianParser(),
                new UKWeekdayParser(),
                new UKTimeExpressionParser(strictMode),
                new UKTimeUnitAgoFormatParser(),
            ],
            refiners: [new UKMergeDateTimeRefiner(), new UKMergeDateRangeRefiner()],
        },
        strictMode
    );
}

/**
 * A shortcut for uk.casual.parse()
 */
export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for uk.casual.parseDate()
 */
export function parseDate(text: string, ref?: Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}
