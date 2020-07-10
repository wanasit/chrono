import {Parser, ParsingContext} from "../../../chrono";
import {ParsingComponents, ParsingResult} from "../../../results";
import dayjs from "dayjs";
import {Meridiem} from "../../../index";
import {AbstractParserWithWordBoundaryChecking} from "../../../common/parsers/AbstractParserWithWordBoundary";

export default class ENCasualDateParser extends AbstractParserWithWordBoundaryChecking {

    innerPattern(context: ParsingContext): RegExp {
        return /(now|today|tonight|last\s*night|tomorrow|tmr|yesterday)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {

        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents()

        if(lowerText == 'tonight'){
            // Normally means this coming midnight
            component.imply('hour', 22);
            component.imply('meridiem', Meridiem.PM);

        } else if (/^tomorrow|^tmr/.test(lowerText)) {
            // Check not "Tomorrow" on late night
            if(targetDate.hour() > 1) {
                targetDate = targetDate.add(1, 'day');
            }

        } else if (/^yesterday/.test(lowerText)) {

            targetDate = targetDate.add(-1, 'day');

        } else if(lowerText.match(/last\s*night/)) {

            component.imply('hour', 0);
            if (targetDate.hour() > 6) {
                targetDate = targetDate.add(-1, 'day');
            }

        } else if (lowerText.match("now")) {
            component.assign('hour', targetDate.hour());
            component.assign('minute', targetDate.minute());
            component.assign('second', targetDate.second());
            component.assign('millisecond', targetDate.millisecond());
        }

        component.assign('day', targetDate.date())
        component.assign('month', targetDate.month() + 1)
        component.assign('year', targetDate.year())
        return component;
    }
}