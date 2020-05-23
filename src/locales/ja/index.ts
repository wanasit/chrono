import JPStandardParser from "./parsers/JPStandardParser";
import JPMergeDateRangeRefiner from "./refiners/JPMergeDateRangeRefiner";
import JPCasualDateParser from "./parsers/JPCasualDateParser";

import {Chrono, Configuration} from "../../chrono";
import {ParsedResult, ParsingOption} from "../../index";

// Shortcuts
export const casual = new Chrono(createCasualConfiguration())
export const strict = new Chrono(createConfiguration())

export function parse(text: string, ref?: Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: Date, option?: ParsingOption) : Date {
    return casual.parseDate(text, ref, option);
}

export function createCasualConfiguration() : Configuration {
    const option = createConfiguration();
    option.parsers.unshift(new JPCasualDateParser());
    return option;
}

export function createConfiguration() : Configuration {
    return {
        parsers: [
            new JPStandardParser()
        ],
        refiners: [
            new JPMergeDateRangeRefiner()
        ]
    }
}