import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ISOFormatParser from "../../common/parsers/ISOFormatParser";
import FITimeExpressionParser from "./parsers/FITimeExpressionParser";
import FIWeekdayParser from "./parsers/FIWeekdayParser";
import FIMonthNameLittleEndianParser from "./parsers/FIMonthNameLittleEndianParser";
import FITimeUnitCasualRelativeFormatParser from "./parsers/FITimeUnitCasualRelativeFormatParser";
import FITimeUnitAgoFormatParser from "./parsers/FITimeUnitAgoFormatParser";
import FITimeUnitWithinFormatParser from "./parsers/FITimeUnitWithinFormatParser";
import FICasualDateParser from "./parsers/FICasualDateParser";
import FICasualTimeParser from "./parsers/FICasualTimeParser";
import FIMergeDateRangeRefiner from "./refiners/FIMergeDateRangeRefiner";
import FIMergeDateTimeRefiner from "./refiners/FIMergeDateTimeRefiner";

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
    option.parsers.unshift(new FICasualTimeParser());
    option.parsers.unshift(new FICasualDateParser());
    option.parsers.unshift(new FITimeUnitCasualRelativeFormatParser());
    return option;
}

export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new ISOFormatParser(),
                new SlashDateFormatParser(littleEndian),
                new FITimeExpressionParser(),
                new FIMonthNameLittleEndianParser(),
                new FIWeekdayParser(),
                new FITimeUnitWithinFormatParser(),
                new FITimeUnitAgoFormatParser(),
            ],
            refiners: [new FIMergeDateRangeRefiner(), new FIMergeDateTimeRefiner()],
        },
        strictMode
    );
}
