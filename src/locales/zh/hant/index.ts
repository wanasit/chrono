/**
 * Chrono components for zh support
 * TODO: Complete general zh support (current support only zh-Hant)
 */

import { Chrono, Configuration } from "../../../chrono";
import ExtractTimezoneOffsetRefiner from "../../../common/refiners/ExtractTimezoneOffsetRefiner";
import { includeCommonConfiguration } from "../../../configurations";
import { ParsedResult, ParsingOption } from "../../../index";
import ZHHantCasualDateParser from "./parsers/ZHHantCasualDateParser";
import ZHHantDateParser from "./parsers/ZHHantDateParser";
import ZHHantDeadlineFormatParser from "./parsers/ZHHantDeadlineFormatParser";
import ZHHantRelationWeekdayParser from "./parsers/ZHHantRelationWeekdayParser";
import ZHHantTimeExpressionParser from "./parsers/ZHHantTimeExpressionParser";
import ZHHantWeekdayParser from "./parsers/ZHHantWeekdayParser";
import ZHHantMergeDateRangeRefiner from "./refiners/ZHHantMergeDateRangeRefiner";
import ZHHantMergeDateTimeRefiner from "./refiners/ZHHantMergeDateTimeRefiner";

// Shortcuts
export const hant = new Chrono(createCasualConfiguration());

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
    option.parsers.unshift(new ZHHantCasualDateParser());
    return option;
}

/**
 * @ignore (to be documented later)
 */
export function createConfiguration(): Configuration {
    const configuration = includeCommonConfiguration({
        parsers: [
            new ZHHantDateParser(),
            new ZHHantRelationWeekdayParser(),
            new ZHHantWeekdayParser(),
            new ZHHantTimeExpressionParser(),
            new ZHHantDeadlineFormatParser(),
        ],
        refiners: [new ZHHantMergeDateRangeRefiner(), new ZHHantMergeDateTimeRefiner()],
    });

    // REMOVE ExtractTimezoneOffsetRefiner
    configuration.refiners = configuration.refiners.filter(
        (refiner) => !(refiner instanceof ExtractTimezoneOffsetRefiner)
    );

    return configuration;
}
