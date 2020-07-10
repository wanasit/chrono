import {Parser, ParsingContext} from "../../../chrono";
import {ParsingComponents} from "../../../results";
import {WEEKDAY_DICTIONARY} from "../constants";
import dayjs, {Dayjs} from "dayjs";
import {matchAnyPattern} from "../../../utils/pattern";
import {AbstractParserWithWordBoundaryChecking} from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:on\\s*?)?' +
    '(?:(this|last|past|next)\\s*)?' +
    `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(this|last|past|next)\\s*week)?' +
    '(?=\\W|$)', 'i');

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_GROUP = 3;

export default class ENWeekdayParser extends AbstractParserWithWordBoundaryChecking {

    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {

        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const offset = WEEKDAY_DICTIONARY[dayOfWeek];
        if (offset === undefined) {
            return null;
        }

        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let modifier = prefix || postfix;
        modifier = modifier || '';
        modifier = modifier.toLowerCase();

        const date = this.extractWeekday(context.refDate, offset, modifier);
        return context.createParsingComponents()
            .assign('weekday', offset)
            .imply('day', date.date())
            .imply('month', date.month() + 1)
            .imply('year', date.year());
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
