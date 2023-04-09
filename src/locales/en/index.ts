/**
 * Chrono components for English support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import ENTimeUnitWithinFormatParser from "./parsers/ENTimeUnitWithinFormatParser";
import ENMonthNameLittleEndianParser from "./parsers/ENMonthNameLittleEndianParser";
import ENMonthNameMiddleEndianParser from "./parsers/ENMonthNameMiddleEndianParser";
import ENMonthNameParser from "./parsers/ENMonthNameParser";
import ENCasualYearMonthDayParser from "./parsers/ENCasualYearMonthDayParser";
import ENSlashMonthFormatParser from "./parsers/ENSlashMonthFormatParser";
import ENTimeExpressionParser from "./parsers/ENTimeExpressionParser";
import ENTimeUnitAgoFormatParser from "./parsers/ENTimeUnitAgoFormatParser";
import ENTimeUnitLaterFormatParser from "./parsers/ENTimeUnitLaterFormatParser";
import ENMergeDateRangeRefiner from "./refiners/ENMergeDateRangeRefiner";
import ENMergeDateTimeRefiner from "./refiners/ENMergeDateTimeRefiner";

import { includeCommonConfiguration } from "../../configurations";
import ENCasualDateParser from "./parsers/ENCasualDateParser";
import ENCasualTimeParser from "./parsers/ENCasualTimeParser";
import ENWeekdayParser from "./parsers/ENWeekdayParser";
import ENRelativeDateFormatParser from "./parsers/ENRelativeDateFormatParser";

import { ParsedResult, ParsingOption } from "../../index";
import { Chrono, Configuration } from "../../chrono";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ENTimeUnitCasualRelativeFormatParser from "./parsers/ENTimeUnitCasualRelativeFormatParser";
import ENMergeRelativeDateRefiner from "./refiners/ENMergeRelativeDateRefiner";

/**
 * Chrono object configured for parsing *casual* English
 */
export const casual = new Chrono(createCasualConfiguration(false));

/**
 * Chrono object configured for parsing *strict* English
 */
export const strict = new Chrono(createConfiguration(true, false));

/**
 * Chrono object configured for parsing *UK-style* English
 */
export const GB = new Chrono(createConfiguration(false, true));

/**
 * A shortcut for en.casual.parse()
 */
export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for en.casual.parseDate()
 */
export function parseDate(text: string, ref?: Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

/**
 * Create a default *casual* {@Link Configuration} for English chrono.
 * It calls {@Link createConfiguration} and includes additional parsers.
 */
export function createCasualConfiguration(littleEndian = false): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new ENCasualDateParser());
    option.parsers.unshift(new ENCasualTimeParser());
    option.parsers.unshift(new ENMonthNameParser());
    option.parsers.unshift(new ENRelativeDateFormatParser());
    option.parsers.unshift(new ENTimeUnitCasualRelativeFormatParser());
    return option;
}

/**
 * Create a default {@Link Configuration} for English chrono
 *
 * @param strictMode If the timeunit mentioning should be strict, not casual
 * @param littleEndian If format should be date-first/littleEndian (e.g. en_UK), not month-first/middleEndian (e.g. en_US)
 */
export function createConfiguration(strictMode = true, littleEndian = false): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(littleEndian),
                new ENTimeUnitWithinFormatParser(strictMode),
                new ENMonthNameLittleEndianParser(),
                new ENMonthNameMiddleEndianParser(),
                new ENWeekdayParser(),
                new ENCasualYearMonthDayParser(),
                new ENSlashMonthFormatParser(),
                new ENTimeExpressionParser(strictMode),
                new ENTimeUnitAgoFormatParser(strictMode),
                new ENTimeUnitLaterFormatParser(strictMode),
            ],
            refiners: [new ENMergeRelativeDateRefiner(), new ENMergeDateTimeRefiner(), new ENMergeDateRangeRefiner()],
        },
        strictMode
    );
}
