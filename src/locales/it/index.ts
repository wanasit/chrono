/**
 * Chrono components for Italian support (*parsers*, *refiners*, and *configuration*)
 *
 * @module
 */

import { includeCommonConfiguration } from "../../configurations";
import { ParsedResult, ParsingOption } from "../../index";
import { Chrono, Configuration } from "../../chrono";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ITMergeDateRangeRefiner from "./refiners/ITMergeDateRangeRefiner";
import ITMergeRelativeDateRefiner from "./refiners/ITMergeRelativeDateRefiner";
import ITMergeDateTimeRefiner from "./refiners/ITMergeDateTimeRefiner";
import ITCasualDateParser from "./parsers/ITCasualDateParser";
import ITCasualTimeParser from "./parsers/ITCasualTimeParser";
import ITTimeUnitWithinFormatParser from "./parsers/ITTimeUnitWithinFormatParser";
import ITMonthNameParser from "./parsers/ITMonthNameParser";
import ITCasualYearMonthDayParser from "./parsers/ITCasualYearMonthDayParser";
import ITSlashMonthFormatParser from "./parsers/ITSlashMonthFormatParser";
import ITTimeExpressionParser from "./parsers/ITTimeExpressionParser";
import ITTimeUnitAgoFormatParser from "./parsers/ITTimeUnitAgoFormatParser";
import ITTimeUnitLaterFormatParser from "./parsers/ITTimeUnitLaterFormatParser";
import ITRelativeDateFormatParser from "./parsers/ITRelativeDateFormatParser";
import ITTimeUnitCasualRelativeFormatParser from "./parsers/ITTimeUnitCasualRelativeFormatParser";
import ITWeekdayParser from "./parsers/ITWeekdayParser";
import ITMonthNameLittleEndianParser from "./parsers/ITMonthNameLittleEndianParser";

/**
 * Chrono object configured for parsing *casual* and *strict* Italian
 */
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration(true));

/**
 * Chrono object configured for parsing Italian
 */
export const IT = new Chrono(createConfiguration(false, true));

/**
 * A shortcut for it.casual.parse()
 */
export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

/**
 * A shortcut for it.casual.parseDate()
 */
export function parseDate(text: string, ref?: Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

/**
 * Create a default *casual* {@Link Configuration} for Italian chrono.
 * It calls {@Link createConfiguration} and includes additional parsers.
 */
export function createCasualConfiguration(littleEndian = true): Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new ITCasualDateParser());
    option.parsers.unshift(new ITCasualTimeParser());
    option.parsers.unshift(new ITMonthNameParser());
    option.parsers.unshift(new ITRelativeDateFormatParser());
    option.parsers.unshift(new ITTimeUnitCasualRelativeFormatParser());
    return option;
}

/**
 * Create a default {@Link Configuration} for Italian chrono
 *
 * @param strictMode If the timeunit mentioning should be strict, not casual
 * @param littleEndian If format should be date-first/littleEndian (e.g. en_UK), not month-first/middleEndian (e.g. en_US)
 */
export function createConfiguration(strictMode = true, littleEndian = true): Configuration {
    return includeCommonConfiguration(
        {
            parsers: [
                new SlashDateFormatParser(littleEndian),
                new ITTimeUnitWithinFormatParser(),
                new ITMonthNameLittleEndianParser(),
                new ITWeekdayParser(),
                new ITCasualYearMonthDayParser(),
                new ITSlashMonthFormatParser(),
                new ITTimeExpressionParser(strictMode),
                new ITTimeUnitAgoFormatParser(strictMode),
                new ITTimeUnitLaterFormatParser(strictMode),
            ],
            refiners: [new ITMergeRelativeDateRefiner(), new ITMergeDateTimeRefiner(), new ITMergeDateRangeRefiner()],
        },
        strictMode
    );
}
