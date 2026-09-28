/**
 * Chrono components for Japanese support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import JPStandardParser from "./parsers/JPStandardParser";
import JPMergeDateRangeRefiner from "./refiners/JPMergeDateRangeRefiner";
import JPCasualDateParser from "./parsers/JPCasualDateParser";
import JPDayPartParser from "./parsers/JPDayPartParser";
import JPWeekdayParser from "./parsers/JPWeekdayParser";
import JPSlashDateFormatParser from "./parsers/JPSlashDateFormatParser";
import JPTimeExpressionParser from "./parsers/JPTimeExpressionParser";
import JPHolidayParser from "./parsers/JPHolidayParser";
import JPMonthNameParser from "./parsers/JPMonthNameParser";
import JPRelativeDateFormatParser from "./parsers/JPRelativeDateFormatParser";
import JPMergeDateTimeRefiner from "./refiners/JPMergeDateTimeRefiner";
import JPMergeMonthYearRefiner from "./refiners/JPMergeMonthYearRefiner";
import JPMergeDayPartRefiner from "./refiners/JPMergeDayPartRefiner";
import JPBlockDoubleYearFilter from "./refiners/JPBlockDoubleYearFilter";
import JPBlockDatePartStrictFilter from "./refiners/JPBlockDatePartStrictFilter";

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
    option.parsers.unshift(new JPHolidayParser());
    option.parsers.unshift(new JPRelativeDateFormatParser());
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
                new JPMonthNameParser(strictMode),
                new JPWeekdayParser(),
                new JPWeekdayWithParenthesesParser(),
                new JPSlashDateFormatParser(),
                new JPDayPartParser(strictMode),
                new JPTimeExpressionParser(),
            ],
            refiners: [
                new JPMergeWeekdayComponentRefiner(), // Note: should be before JPMergeDateTimeRefiner and JPMergeDateRangeRefiner
                new JPMergeMonthYearRefiner(),
                new JPMergeDayPartRefiner(),

                new JPMergeDateTimeRefiner(),
                new JPMergeDateRangeRefiner(),
                new JPBlockDoubleYearFilter(),
            ],
        },
        strictMode
    );

    // Note: Remove because it is not used in Japanese grammar
    configuration.refiners = configuration.refiners.filter(
        (refiner) => !(refiner instanceof MergeWeekdayComponentRefiner)
    );
    if (strictMode) {
        configuration.refiners.push(new JPBlockDatePartStrictFilter());
    }

    return configuration;
}
