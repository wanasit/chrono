import {INTEGER_WORDS_PATTERN, INTEGER_WORDS} from '../constants'
import {Parser, ParsingContext} from "../../../chrono";
import {ParsingComponents} from "../../../results";
import dayjs from "dayjs";

const PATTERN = new RegExp(`(?<=\\W|^)` +
    `(?:within|in)\\s*` +
    `(${INTEGER_WORDS_PATTERN}|[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*` +
    `(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)\\s*` +
    `(?=\\W|$)`, 'i'
);

const STRICT_PATTERN = new RegExp('(?<=\\W|^)' +
    `(?:within|in)\\s*` +
    `(${INTEGER_WORDS_PATTERN}|[0-9]+|an?)\\s*` +
    `(seconds?|minutes?|hours?|days?)\\s*` +
    `(?=\\W|$)`, 'i'
);

export default class ENDeadlineFormatParser implements Parser {
    constructor(private strictMode: boolean) {}

    pattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const components = context.createParsingComponents()

        const numPart: string = match[1].toLowerCase();
        const componentPart: string = match[2].toLocaleLowerCase()

        let number: number;
        if (INTEGER_WORDS[numPart] !== undefined) {
            number = INTEGER_WORDS[numPart];
        } else if (numPart === 'a' || numPart === 'an'){
            number = 1;
        } else if (numPart.match(/few/i)){
            number = 3;
        } else if (numPart.match(/half/i)) {
            number = 0.5;
        } else {
            number = parseInt(numPart);
        }

        let date = dayjs(context.refDate);
        if (componentPart.match(/day/i)) {
            date = date.add(number, 'd');

        } else if (componentPart.match(/week/i)) {
            date = date.add(number * 7, 'd');

        } else if (componentPart.match(/month/i)) {
            date = date.add(number, 'month');

        } else if (componentPart.match(/year/i)) {
            date = date.add(number, 'year');

        } else if (componentPart.match(/hour/i)) {
            date = date.add(number, 'hour');

        } else if (componentPart.match(/min/i)) {
            date = date.add(number, 'minute');

        } else if (componentPart.match(/second/i)) {
            date = date.add(number, 'second');
        }

        components.imply('year', date.year());
        components.imply('month', date.month() + 1);
        components.imply('day', date.date());
        components.imply('hour', date.hour());
        components.imply('minute', date.minute());
        components.imply('second', date.second());
        return components;
    }
};
