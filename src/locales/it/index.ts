/**
 * Chrono components for Italian support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import ENTimeUnitWithinFormatParser from "./parsers/ITTimeUnitWithinFormatParser";
import ENMonthNameLittleEndianParser from "./parsers/ITMonthNameLittleEndianParser";
import ENMonthNameMiddleEndianParser from "./parsers/ITMonthNameMiddleEndianParser";
import ENMonthNameParser from "./parsers/ITMonthNameParser";
import ENCasualYearMonthDayParser from "./parsers/ITCasualYearMonthDayParser";
import ENSlashMonthFormatParser from "./parsers/ITSlashMonthFormatParser";
import ENTimeExpressionParser from "./parsers/ITTimeExpressionParser";
import ENTimeUnitAgoFormatParser from "./parsers/ITTimeUnitAgoFormatParser";
import ENTimeUnitLaterFormatParser from "./parsers/ITTimeUnitLaterFormatParser";
import ENMergeDateRangeRefiner from "./refiners/ITMergeDateRangeRefiner";
import ENMergeDateTimeRefiner from "./refiners/ITMergeDateTimeRefiner";

import { includeCommonConfiguration } from "../../configurations";
import ENCasualDateParser from "./parsers/ITCasualDateParser";
import ENCasualTimeParser from "./parsers/ITCasualTimeParser";
import ENWeekdayParser from "./parsers/ITWeekdayParser";
import ENRelativeDateFormatParser from "./parsers/ITRelativeDateFormatParser";

import { ParsedResult, ParsingOption } from "../../index";
import { Chrono, Configuration } from "../../chrono";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ENTimeUnitCasualRelativeFormatParser from "./parsers/ITTimeUnitCasualRelativeFormatParser";
import ENMergeRelativeDateRefiner from "./refiners/ITMergeRelativeDateRefiner";

/**
 * Chrono object configured for parsing *casual* Italian
 */
export const casual = new Chrono(createCasualConfiguration(false));

/**
 * Chrono object configured for parsing *strict* Italian
 */
export const strict = new Chrono(createConfiguration(true, false));

/**
 * Chrono object configured for parsing Italian
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
 * Create a default *casual* {@Link Configuration} for Italian chrono.
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
 * Create a default {@Link Configuration} for Italian chrono
 *
 * @param strictMode If the timeunit mentioning should be strict, not casual
 * @param littleEndian If format should be date-first/littleEndian (e.g. en_UK), not month-first/middleEndian (e.g. en_US)
 */
export function createConfiguration(strictMode = true, littleEndian = false): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(littleEndian),
                new ENTimeUnitWithinFormatParser(),
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
