/**
 * Chrono components for zh support
 */

import { Chrono, Configuration } from "../../../chrono";
import ExtractTimezoneOffsetRefiner from "../../../common/refiners/ExtractTimezoneOffsetRefiner";
import { includeCommonConfiguration } from "../../../configurations";
import { ParsedResult, ParsingOption } from "../../../index";
import ZHHansCasualDateParser from "./parsers/ZHHansCasualDateParser";
import ZHHansDateParser from "./parsers/ZHHansDateParser";
import ZHHansDeadlineFormatParser from "./parsers/ZHHansDeadlineFormatParser";
import ZHHansRelationWeekdayParser from "./parsers/ZHHansRelationWeekdayParser";
import ZHHansTimeExpressionParser from "./parsers/ZHHansTimeExpressionParser";
import ZHHansWeekdayParser from "./parsers/ZHHansWeekdayParser";
import ZHHansMergeDateRangeRefiner from "./refiners/ZHHansMergeDateRangeRefiner";
import ZHHansMergeDateTimeRefiner from "./refiners/ZHHansMergeDateTimeRefiner";

// Shortcuts
export const hans = new Chrono(createCasualConfiguration());

export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration());

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption): Date {
    return casual.parseDate(text, ref, option);
}

/**
 * @ignore (to be documented later)
 */
export function createCasualConfiguration(): Configuration {
    const option = createConfiguration();
    option.parsers.unshift(new ZHHansCasualDateParser());
    return option;
}

/**
 * @ignore (to be documented later)
 */
export function createConfiguration(): Configuration {
    const configuration = includeCommonConfiguration({
        parsers: [
            new ZHHansDateParser(),
            new ZHHansRelationWeekdayParser(),
            new ZHHansWeekdayParser(),
            new ZHHansTimeExpressionParser(),
            new ZHHansDeadlineFormatParser(),
        ],
        refiners: [new ZHHansMergeDateRangeRefiner(), new ZHHansMergeDateTimeRefiner()],
    });

    // REMOVE ExtractTimezoneOffsetRefiner
    configuration.refiners = configuration.refiners.filter(
        (refiner) => !(refiner instanceof ExtractTimezoneOffsetRefiner)
    );

    return configuration;
}
