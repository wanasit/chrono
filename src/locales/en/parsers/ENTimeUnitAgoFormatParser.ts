import {Parser, ParsingContext} from "../../../chrono";
import {
    createComponentRelativeFromRefDate,
    extractDateJSTimeUnitValues,
    TIME_UNIT_PATTERN,
    TIME_UNIT_STRICT_PATTERN
} from "../constants";


const PATTERN = new RegExp('' +
    '(?<=\\W|^)' +
    '(?:within\\s*)?' +
    '(' + TIME_UNIT_PATTERN + ')' +
    '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');

const STRICT_PATTERN = new RegExp('' +
    '(?<=\\W|^)' +
    '(?:within\\s*)?' +
    '(' + TIME_UNIT_STRICT_PATTERN + ')' +
    'ago(?=(?:\\W|$))', 'i');

export default class ENTimeUnitAgoFormatParser implements Parser {

    constructor(private strictMode: boolean) {}

    pattern(): RegExp { return this.strictMode ? STRICT_PATTERN : PATTERN; }

    extract(context: ParsingContext, match: RegExpMatchArray) {

        const fragments = extractDateJSTimeUnitValues(match[1]);
        for (const key in fragments) {
            fragments[key] = -fragments[key];
        }

        return createComponentRelativeFromRefDate(context.refDate, fragments);
    }
}
