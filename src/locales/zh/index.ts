import { includeCommonConfiguration } from "../../configurations";
import { Chrono, Configuration, Parser, Refiner } from "../../chrono";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results";
import { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday } from "../../types";
import ExtractTimezoneOffsetRefiner from "../../common/refiners/ExtractTimezoneOffsetRefiner";

import ZHHansCasualDateParser from "./hans/parsers/ZHHansCasualDateParser";
import ZHHansDateParser from "./hans/parsers/ZHHansDateParser";
import ZHHansDeadlineFormatParser from "./hans/parsers/ZHHansDeadlineFormatParser";
import ZHHansRelationWeekdayParser from "./hans/parsers/ZHHansRelationWeekdayParser";
import ZHHansTimeExpressionParser from "./hans/parsers/ZHHansTimeExpressionParser";
import ZHHansWeekdayParser from "./hans/parsers/ZHHansWeekdayParser";

import ZHHantCasualDateParser from "./hant/parsers/ZHHantCasualDateParser";
import ZHHantDateParser from "./hant/parsers/ZHHantDateParser";
import ZHHantDeadlineFormatParser from "./hant/parsers/ZHHantDeadlineFormatParser";
import ZHHantRelationWeekdayParser from "./hant/parsers/ZHHantRelationWeekdayParser";
import ZHHantTimeExpressionParser from "./hant/parsers/ZHHantTimeExpressionParser";
import ZHHantWeekdayParser from "./hant/parsers/ZHHantWeekdayParser";
import ZHHantMergeDateRangeRefiner from "./hant/refiners/ZHHantMergeDateRangeRefiner";
import ZHHantMergeDateTimeRefiner from "./hant/refiners/ZHHantMergeDateTimeRefiner";

export * as hant from "./hant";
export * as hans from "./hans";
export { Chrono, Parser, Refiner, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Component, ParsedResult, ParsingOption, ParsingReference, Meridiem, Weekday };

export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration());

export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date {
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
            new ZHHansDateParser(),
            new ZHHantRelationWeekdayParser(),
            new ZHHansRelationWeekdayParser(),
            new ZHHantWeekdayParser(),
            new ZHHansWeekdayParser(),
            new ZHHantTimeExpressionParser(),
            new ZHHansTimeExpressionParser(),
            new ZHHantDeadlineFormatParser(),
            new ZHHansDeadlineFormatParser(),
        ],
        refiners: [new ZHHantMergeDateRangeRefiner(), new ZHHantMergeDateTimeRefiner()],
    });

    // REMOVE ExtractTimezoneOffsetRefiner
    configuration.refiners = configuration.refiners.filter(
        (refiner) => !(refiner instanceof ExtractTimezoneOffsetRefiner)
    );

    return configuration;
}
