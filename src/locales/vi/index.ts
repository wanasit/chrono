/**
 * Chrono components for Vietnamese support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */
import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import ISOFormatParser from "../../common/parsers/ISOFormatParser";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import VIStandardParser from "./parsers/VIStandardParser";
import VIMonthYearParser from "./parsers/VIMonthYearParser";
import VIYearParser from "./parsers/VIYearParser";
import VICasualDateParser from "./parsers/VICasualDateParser";
import VICasualTimeParser from "./parsers/VICasualTimeParser";
import VIWeekdayParser from "./parsers/VIWeekdayParser";
import VITimeExpressionParser from "./parsers/VITimeExpressionParser";
import VITimeUnitAgoFormatParser from "./parsers/VITimeUnitAgoFormatParser";
import VITimeUnitLaterFormatParser from "./parsers/VITimeUnitLaterFormatParser";
import VITimeUnitWithinFormatParser from "./parsers/VITimeUnitWithinFormatParser";
import VITimeUnitCasualRelativeFormatParser from "./parsers/VITimeUnitCasualRelativeFormatParser";
import VIMergeDateRangeRefiner from "./refiners/VIMergeDateRangeRefiner";
import VIMergeDateTimeRefiner from "./refiners/VIMergeDateTimeRefiner";
import VIMergeWeekdayComponentRefiner from "./refiners/VIMergeWeekdayComponentRefiner";

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
    option.parsers.unshift(new VICasualTimeParser());
    option.parsers.unshift(new VICasualDateParser());
    option.parsers.unshift(new VITimeUnitCasualRelativeFormatParser());
    return option;
}

export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new ISOFormatParser(),
                new SlashDateFormatParser(littleEndian),
                new VIStandardParser(),
                new VIMonthYearParser(),
                new VIYearParser(),
                new VIWeekdayParser(),
                new VITimeExpressionParser(),
                new VITimeUnitAgoFormatParser(strictMode),
                new VITimeUnitLaterFormatParser(strictMode),
                new VITimeUnitWithinFormatParser(strictMode),
            ],
            refiners: [
                new VIMergeWeekdayComponentRefiner(),
                new VIMergeDateRangeRefiner(),
                new VIMergeDateTimeRefiner(),
            ],
        },
        strictMode
    );
}
