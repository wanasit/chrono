import { includeCommonConfiguration } from "../../configurations";
import { ParsedResult, ParsingOption } from "../../index";
import { Chrono, Configuration } from "../../chrono";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ISOFormatParser from "../../common/parsers/ISOFormatParser";
import DETimeExpressionParser from "./parsers/DETimeExpressionParser";
import DEWeekdayParser from "./parsers/DEWeekdayParser";
import DESpecificTimeExpressionParser from "./parsers/DESpecificTimeExpressionParser";
import DEMergeDateRangeRefiner from "./refiners/DEMergeDateRangeRefiner";
import DEMergeDateTimeRefiner from "./refiners/DEMergeDateTimeRefiner";
import DECasualDateParser from "./parsers/DECasualDateParser";
import DECasualTimeParser from "./parsers/DECasualTimeParser";
import DEMonthNameLittleEndianParser from "./parsers/DEMonthNameLittleEndianParser";
import DETimeUnitRelativeFormatParser from "./parsers/DETimeUnitRelativeFormatParser";
import DETimeUnitWithinFormatParser from "./parsers/DETimeUnitWithinFormatParser";

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
    option.parsers.unshift(new DETimeUnitRelativeFormatParser());
    return option;
}

export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new ISOFormatParser(),
                new SlashDateFormatParser(littleEndian),
                new DETimeExpressionParser(),
                new DESpecificTimeExpressionParser(),
                new DEMonthNameLittleEndianParser(),
                new DEWeekdayParser(),
                new DETimeUnitWithinFormatParser(),
            ],
            refiners: [new DEMergeDateRangeRefiner(), new DEMergeDateTimeRefiner()],
        },
        strictMode
    );
}
