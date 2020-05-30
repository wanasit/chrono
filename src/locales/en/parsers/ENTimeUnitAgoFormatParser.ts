import {Parser, ParsingContext} from "../../../chrono";
import {
    parseTimeUnits,
    TIME_UNITS_PATTERN
} from "../constants";
import {ParsingComponents} from "../../../results";


const PATTERN = new RegExp('' +
    '(?<=\\W|^)' +
    '(?:within\\s*)?' +
    '(' + TIME_UNITS_PATTERN + ')' +
    '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');

const STRICT_PATTERN = new RegExp('' +
    '(?<=\\W|^)' +
    '(?:within\\s*)?' +
    '(' + TIME_UNITS_PATTERN + ')' +
    'ago(?=(?:\\W|$))', 'i');

export default class ENTimeUnitAgoFormatParser implements Parser {

    constructor(private strictMode: boolean) {}

    pattern(): RegExp { return this.strictMode ? STRICT_PATTERN : PATTERN; }

    extract(context: ParsingContext, match: RegExpMatchArray) {

        const fragments = parseTimeUnits(match[1]);
        for (const key in fragments) {
            fragments[key] = -fragments[key];
        }

        return ParsingComponents.createRelativeFromRefDate(context.refDate, fragments);
    }
}
