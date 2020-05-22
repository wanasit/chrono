import {INTEGER_WORDS, INTEGER_WORDS_PATTERN} from "../constants";
import {Parser, ParsingContext} from "../../../chrono";
import {ParsingComponents, ParsingResult} from "../../../results";
import dayjs from "dayjs";


const PATTERN = new RegExp('(?<=\\W|^)' +
    '(this|next|last|past)\\s*' +
    '('+ INTEGER_WORDS_PATTERN + '|[0-9]+|few|half(?:\\s*an?)?)?\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?)(?=\\s*)' +
    '(?=\\W|$)', 'i'
);

const MODIFIER_WORD_GROUP = 1;
const MULTIPLIER_WORD_GROUP = 2;
const RELATIVE_WORD_GROUP = 3;

export default class ENRelativeDateFormatParser implements Parser {

    pattern(): RegExp {return PATTERN; }
    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        if (match[MODIFIER_WORD_GROUP].toLowerCase().match(/^this/)) {
            if (match[MULTIPLIER_WORD_GROUP]) {
                return null;
            }

            return this.extractThisReference(context, match[RELATIVE_WORD_GROUP]);
        }

        const modifier = match[MODIFIER_WORD_GROUP].toLowerCase().match(/^next/) ? 1 : -1;
        const num = match[MULTIPLIER_WORD_GROUP] || '';
        let parsedNum: number;
        if (INTEGER_WORDS[num] !== undefined) {
            parsedNum = INTEGER_WORDS[num];
        } else if (num === ''){
            parsedNum = 1;
        } else if (num.match(/few/i)){
            parsedNum = 3;
        } else if (num.match(/half/i)) {
            parsedNum = 0.5;
        } else {
            parsedNum = parseInt(num);
        }
        parsedNum *= modifier;

        const unitWord = match[RELATIVE_WORD_GROUP].toLowerCase()

        if (unitWord.match(/day|week|month|year/i)) {
            return this.extractDateReference(context, unitWord, parsedNum);
        } else {
            return this.extractTimeReference(context, unitWord, parsedNum)
        }
    }

    extractTimeReference(context: ParsingContext, timeUnitWord: string, num: number) {
        const components = context.createParsingComponents()
        let date = dayjs(context.refDate);

        if (timeUnitWord.match(/hour/i)) {

            date = date.add(num, 'hour');
            components.imply('minute', date.minute());
            components.imply('second', date.second());

        } else if (timeUnitWord.match(/min/i)) {

            date = date.add(num, 'minute');
            components.assign('minute', date.minute());
            components.imply('second', date.second());

        } else if (timeUnitWord.match(/second/i)) {

            date = date.add(num, 'second');
            components.assign('second', date.second());
            components.assign('minute', date.minute());
        }

        components.assign('hour', date.hour());
        components.assign('year', date.year());
        components.assign('month', date.month() + 1);
        components.assign('day', date.date());

        return components;
    }

    extractDateReference(context: ParsingContext, dateUnitWord: string, num: number) {
        const components = context.createParsingComponents()
        let date = dayjs(context.refDate);

        if (dateUnitWord.match(/day/i)) {
            date = date.add(num, 'd');
            components.assign('year', date.year());
            components.assign('month', date.month() + 1);
            components.assign('day', date.date());
        } else if (dateUnitWord.match(/week/i)) {
            date = date.add(num * 7, 'd');
            // We don't know the exact date for next/last week so we imply them
            components.imply('day', date.date());
            components.imply('month', date.month() + 1);
            components.imply('year', date.year());
        } else if (dateUnitWord.match(/month/i)) {
            date = date.add(num, 'month');
            // We don't know the exact day for next/last month
            components.imply('day', date.date());
            components.assign('year', date.year());
            components.assign('month', date.month() + 1);
        } else if (dateUnitWord.match(/year/i)) {
            date = date.add(num, 'year');
            // We don't know the exact day for month on next/last year
            components.imply('day', date.date());
            components.imply('month', date.month() + 1);
            components.assign('year', date.year());
        }

        return components;
    }

    extractThisReference(context: ParsingContext, relativeWord: string) {
        const components = context.createParsingComponents()
        let date = dayjs(context.refDate);

        // This week
        if (relativeWord.match(/week/i)) {
            date = date.add(-date.get('d'), 'd');
            components.imply('day', date.date());
            components.imply('month', date.month() + 1);
            components.imply('year', date.year());
        }

        // This month
        else if (relativeWord.match(/month/i)) {
            date = date.add(-date.date() + 1, 'd');
            components.imply('day', date.date());
            components.assign('year', date.year());
            components.assign('month', date.month() + 1);
        }

        // This year
        else if (relativeWord.match(/year/i)) {
            date = date.add(-date.date() + 1, 'd');
            date = date.add(-date.month(), 'month');

            components.imply('day', date.date());
            components.imply('month', date.month() + 1);
            components.assign('year', date.year());
        }

        return components;
    }
}
