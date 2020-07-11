import {Parser, ParsingContext} from "../../../chrono";
import {
    parseTimeUnits,
    TIME_UNITS_PATTERN
} from "../constants";
import {ParsingComponents} from "../../../results";
import {AbstractParserWithWordBoundaryChecking} from "../../../common/parsers/AbstractParserWithWordBoundary";


const PATTERN = new RegExp('' +
    '(' + TIME_UNITS_PATTERN + ')' +
    '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');

const STRICT_PATTERN = new RegExp('' +
    '(' + TIME_UNITS_PATTERN + ')' +
    'ago(?=(?:\\W|$))', 'i');

export default class ENTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {

    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(): RegExp { return this.strictMode ? STRICT_PATTERN : PATTERN; }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {

        const fragments = parseTimeUnits(match[1]);
        for (const key in fragments) {
            fragments[key] = -fragments[key];
        }

        return ParsingComponents.createRelativeFromRefDate(context.refDate, fragments);
    }
}
