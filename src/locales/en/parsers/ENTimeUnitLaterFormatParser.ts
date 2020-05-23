import {Parser, ParsingContext} from "../../../chrono";
import {
    createComponentRelativeFromRefDate,
    extractDateJSTimeUnitValues,
    TIME_UNIT_PATTERN,
    TIME_UNIT_STRICT_PATTERN
} from "../constants";


const PATTERN = new RegExp('' +
    '(?<=\\W|^)' +
    '(' + TIME_UNIT_PATTERN + ')' +
    '(later|after|from now|henceforth|forward|out)' +
    '(?=(?:\\W|$))',
'i');

const STRICT_PATTERN = new RegExp('' +
    '(?<=\\W|^)' +
    '(' + TIME_UNIT_STRICT_PATTERN + ')' +
    '(later|from now)' +
    '(?=(?:\\W|$))',
'i');

const GROUP_NUM_SUFFIX = 2
const GROUP_NUM_TIMEUNITS = 1

export default class ENTimeUnitLaterFormatParser implements Parser {

    constructor(private strictMode: boolean) {}

    pattern(): RegExp { return this.strictMode ? STRICT_PATTERN : PATTERN; }

    extract(context: ParsingContext, match: RegExpMatchArray) {

        const suffix = match[GROUP_NUM_SUFFIX].toLowerCase().trim();
        if (!suffix) {
            return null;
        }

        const fragments = extractDateJSTimeUnitValues(match[GROUP_NUM_TIMEUNITS]);
        return createComponentRelativeFromRefDate(context.refDate, fragments);
    }
}
