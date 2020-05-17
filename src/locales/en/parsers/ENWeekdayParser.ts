import {Parser, ParsingContext} from "../../../chrono";
import {ParsingComponents} from "../../../results";
import {WEEKDAY_OFFSET, WEEKDAY_PATTERN} from "../constants";
import dayjs from "dayjs";

const PATTERN = new RegExp('(?<=\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:on\\s*?)?' +
    '(?:(this|last|past|next)\\s*)?' +
    `(${WEEKDAY_PATTERN})` +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(this|last|past|next)\\s*week)?' +
    '(?=\\W|$)', 'i');

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_GROUP = 3;

export default class ENWeekdayParser implements Parser {

    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {

        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const offset = WEEKDAY_OFFSET[dayOfWeek];
        if (offset === undefined) {
            return null;
        }

        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let modifier = prefix || postfix;
        modifier = modifier || '';
        modifier = modifier.toLowerCase();

        const date = this.extractWeekday(context.refDate, offset, modifier);

        const components = context.createParsingComponents()
            .assign('weekday', offset);

        if (modifier) {
            components.assign('day', date.date());
            components.assign('month', date.month() + 1);
            components.assign('year', date.year());
        } else {
            components.imply('day', date.date());
            components.imply('month', date.month() + 1);
            components.imply('year', date.year());
        }

        return components;
    }

    private extractWeekday(refDate: Date, offset, modifier?: string) : Dayjs {
        let date = dayjs(refDate);
        const refOffset = date.day();

        if(modifier == 'last' || modifier == 'past') {
            date = date.day(offset - 7);
        } else if(modifier == 'next') {
            date = date.day(offset + 7);
        } else if(modifier == 'this') {
            date = date.day(offset);
        } else {
            if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
                date = date.day(offset - 7);
            } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
                date = date.day(offset + 7);
            } else {
                date = date.day(offset);
            }
        }

        return date;
    }
}
