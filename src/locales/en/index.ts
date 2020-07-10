

import ENTimeUnitDeadlineFormatParser from "./parsers/ENTimeUnitDeadlineFormatParser";
import ENMonthNameLittleEndianParser from "./parsers/ENMonthNameLittleEndianParser";
import ENMonthNameMiddleEndianParser from "./parsers/ENMonthNameMiddleEndianParser";
import ENMonthNameParser from "./parsers/ENMonthNameParser";
import ENSlashDateFormatParser from "./parsers/ENSlashDateFormatParser";
import ENSlashDateFormatStartWithYearParser from "./parsers/ENSlashDateFormatStartWithYearParser";
import ENSlashMonthFormatParser from "./parsers/ENSlashMonthFormatParser";
import ENTimeExpressionParser from "./parsers/ENTimeExpressionParser";
import ENTimeUnitAgoFormatParser from "./parsers/ENTimeUnitAgoFormatParser";
import ENTimeUnitLaterFormatParser from "./parsers/ENTimeUnitLaterFormatParser";
import ENMergeDateRangeRefiner from "./refiners/ENMergeDateRangeRefiner";
import ENMergeDateTimeRefiner from "./refiners/ENMergeDateTimeRefiner";

import {includeCommonConfiguration} from "../../configurations";
import ENCasualDateParser from "./parsers/ENCasualDateParser";
import ENCasualTimeParser from "./parsers/ENCasualTimeParser";
import ENWeekdayParser from "./parsers/ENWeekdayParser";
import ENRelativeDateFormatParser from "./parsers/ENRelativeDateFormatParser";

import {ParsedResult, ParsingOption} from "../../index";
import {Chrono, Configuration} from "../../chrono";
import {createParserWithWordBoundaryDetection as withWordBoundary} from "../../utils/ParserWithWordEndingDetection";

// Shortcuts
export const casual = new Chrono(createCasualConfiguration(false))
export const strict = new Chrono(createConfiguration(true, false))

export const GB = new Chrono(createConfiguration(false, true))

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption) : Date {
    return casual.parseDate(text, ref, option);
}

export function createCasualConfiguration(littleEndian = false) : Configuration {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(withWordBoundary(new ENCasualDateParser()));
    option.parsers.unshift(withWordBoundary(new ENCasualTimeParser()));
    option.parsers.unshift(withWordBoundary(new ENWeekdayParser()));
    option.parsers.unshift(withWordBoundary(new ENRelativeDateFormatParser()));
    return option;
}

export function createConfiguration(strictMode= true, littleEndian = false) : Configuration {
    return includeCommonConfiguration({
        parsers: [
            withWordBoundary(new ENTimeUnitDeadlineFormatParser(strictMode)),
            withWordBoundary(new ENMonthNameLittleEndianParser()),
            withWordBoundary(new ENMonthNameMiddleEndianParser()),
            withWordBoundary(new ENMonthNameParser()),
            new ENSlashDateFormatParser(littleEndian),
            withWordBoundary(new ENSlashDateFormatStartWithYearParser()),
            withWordBoundary(new ENSlashMonthFormatParser()),
            new ENTimeExpressionParser(),
            withWordBoundary(new ENTimeUnitAgoFormatParser(strictMode)),
            withWordBoundary(new ENTimeUnitLaterFormatParser(strictMode)),
        ],
        refiners: [
            new ENMergeDateTimeRefiner(),
            new ENMergeDateRangeRefiner()
        ]
    });
}

