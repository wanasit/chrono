import {TIME_UNITS_PATTERN, parseTimeUnits} from '../constants';
import {Parser, ParsingContext} from "../../../chrono";
import {ParsingComponents} from "../../../results";

const PATTERN = new RegExp(`(?<=\\W|^)` +
    `(?:within|in)\\s*` +
    '(' + TIME_UNITS_PATTERN + ')' +
    `(?=\\W|$)`, 'i'
);

const STRICT_PATTERN = new RegExp('(?<=\\W|^)' +
    `(?:within|in)\\s*` +
    '(' + TIME_UNITS_PATTERN + ')' +
    `(?=\\W|$)`, 'i'
);

export default class ENTimeUnitDeadlineFormatParser implements Parser {
    constructor(private strictMode: boolean) {}

    pattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromRefDate(context.refDate, timeUnits);
    }
}
