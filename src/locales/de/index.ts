import { includeCommonConfiguration } from "../../configurations";
import { ParsedResult, ParsingOption } from "../../index";
import { Chrono, Configuration } from "../../chrono";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ISOFormatParser from "../../common/parsers/ISOFormatParser";
import DETimeExpressionParser from "./parsers/DETimeExpressionParser";
import DEWeekdayParser from "./parsers/DEWeekdayParser";
import DEMergeDateRangeRefiner from "./refiners/DEMergeDateRangeRefiner";
import DEMergeDateTimeRefiner from "./refiners/DEMergeDateTimeRefiner";
import DECasualDateParser from "./parsers/DECasualDateParser";
import DECasualTimeParser from "./parsers/DECasualTimeParser";
import DEMonthNameLittleEndianParser from "./parsers/DEMonthNameLittleEndianParser";

// Shortcuts
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration(true));

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new DECasualTimeParser());
    option.parsers.unshift(new DECasualDateParser());
    return option;
}

export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new ISOFormatParser(),
                new SlashDateFormatParser(littleEndian),
                new DETimeExpressionParser(),
                new DEMonthNameLittleEndianParser(),
                new DEWeekdayParser(),
            ],
            refiners: [new DEMergeDateRangeRefiner(), new DEMergeDateTimeRefiner()],
        },
        strictMode
    );
}
