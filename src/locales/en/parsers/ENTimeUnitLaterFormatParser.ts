import {Parser, ParsingContext} from "../../../chrono";
import {
    parseTimeUnits,
    TIME_UNITS_PATTERN
} from "../constants";
import {ParsingComponents} from "../../../results";


const PATTERN = new RegExp('' +
    '(' + TIME_UNITS_PATTERN + ')' +
    '(later|after|from now|henceforth|forward|out)' +
    '(?=(?:\\W|$))',
'i');

const STRICT_PATTERN = new RegExp('' +
    '(' + TIME_UNITS_PATTERN + ')' +
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

        const fragments = parseTimeUnits(match[GROUP_NUM_TIMEUNITS]);
        return ParsingComponents.createRelativeFromRefDate(context.refDate, fragments);
    }
}
