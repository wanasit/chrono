import {Parser, ParsingContext} from "../../../chrono";
import dayjs from "dayjs";
import {Meridiem} from "../../../index";


const PATTERN = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;

export default class JPCasualDateParser implements Parser {

    pattern() {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {

        const text = match[0];

        let date = dayjs(context.refDate);
        const components = context.createParsingComponents()

        if(text == '今夜' || text == '今夕' || text == '今晩'){

            components.imply('hour', 22);
            components.assign('meridiem', Meridiem.PM);

        } else if (text.match("今朝")) {

            components.imply('hour', 6);
            components.assign('meridiem', Meridiem.AM);

        } else if(text == '明日'){

            if(date.hour() > 4) { // Check not "Tomorrow" on late night
                date = date.add(1, 'day');
            }

        } else if(text == '昨日') {

            date = date.add(-1, 'day');
        }

        components.assign('day', date.date())
        components.assign('month', date.month() + 1)
        components.assign('year', date.year())
        return components;
    }
}

