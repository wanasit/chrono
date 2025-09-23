import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ISOFormatParser from "../../common/parsers/ISOFormatParser";
import SVWeekdayParser from "./parsers/SVWeekdayParser";
import SVMonthNameLittleEndianParser from "./parsers/SVMonthNameLittleEndianParser";
import SVTimeUnitCasualRelativeFormatParser from "./parsers/SVTimeUnitCasualRelativeFormatParser";
import SVCasualDateParser from "./parsers/SVCasualDateParser";

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
    option.parsers.unshift(new SVCasualDateParser());
    return option;
}

export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new ISOFormatParser(),
                new SlashDateFormatParser(littleEndian),
                new SVMonthNameLittleEndianParser(),
                new SVWeekdayParser(),
                new SVTimeUnitCasualRelativeFormatParser(),
            ],
            refiners: [],
        },
        strictMode
    );
}
