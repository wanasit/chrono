import {TIME_UNIT_PATTERN, extractDateJSTimeUnitValues, createComponentRelativeFromRefDate} from '../constants';
import {Parser, ParsingContext} from "../../../chrono";
import {ParsingComponents} from "../../../results";

const PATTERN = new RegExp(`(?<=\\W|^)` +
    `(?:within|in)\\s*` +
    '(' + TIME_UNIT_PATTERN + ')' +
    `(?=\\W|$)`, 'i'
);

const STRICT_PATTERN = new RegExp('(?<=\\W|^)' +
    `(?:within|in)\\s*` +
    '(' + TIME_UNIT_PATTERN + ')' +
    `(?=\\W|$)`, 'i'
);

export default class ENTimeUnitDeadlineFormatParser implements Parser {
    constructor(private strictMode: boolean) {}

    pattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const fragments = extractDateJSTimeUnitValues(match[1]);
        return createComponentRelativeFromRefDate(context.refDate, fragments);
    }
}
