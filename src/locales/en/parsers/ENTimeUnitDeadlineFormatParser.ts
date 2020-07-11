import {TIME_UNITS_PATTERN, parseTimeUnits} from '../constants';
import {ParsingContext} from "../../../chrono";
import {ParsingComponents} from "../../../results";
import {AbstractParserWithWordBoundaryChecking} from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    `(?:within|in|\\+)\\s*` +
    '(' + TIME_UNITS_PATTERN + ')' +
    `(?=\\W|$)`, 'i'
);

const STRICT_PATTERN = new RegExp(
    `(?:within|in)\\s*` +
    '(' + TIME_UNITS_PATTERN + ')' +
    `(?=\\W|$)`, 'i'
);

export default class ENTimeUnitDeadlineFormatParser extends AbstractParserWithWordBoundaryChecking {

    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromRefDate(context.refDate, timeUnits);
    }
}
