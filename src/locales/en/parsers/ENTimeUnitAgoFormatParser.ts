import {Parser, ParsingContext} from "../../../chrono";
import {extractDateJSTimeUnitValues, TIME_UNIT_PATTERN, TIME_UNIT_STRICT_PATTERN} from "../constants";
import {ParsingResult} from "../../../results";
import dayjs from "dayjs";


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
        context.debug(() => {
            console.log(`${JSON.stringify(fragments)}`)
        })
        let date = dayjs(context.refDate);
        for (const key in fragments) {
            date = date.add(-fragments[key], key);
        }

        const components = context.createParsingComponents();
        if (fragments['hour'] > 0 || fragments['minute'] > 0 || fragments['second'] > 0) {
            components.assign('hour', date.hour());
            components.assign('minute', date.minute());
            components.assign('second', date.second());
        }

        if (fragments['d'] > 0 || fragments['month'] > 0 || fragments['year'] > 0) {
            components.assign('day', date.date());
            components.assign('month', date.month() + 1);
            components.assign('year', date.year());
        } else {
            if (fragments['week'] > 0) {
                components.imply('weekday', date.day());
            }

            components.imply('day', date.date());
            components.imply('month', date.month() + 1);
            components.imply('year', date.year());
        }

        return components;
    }
}
