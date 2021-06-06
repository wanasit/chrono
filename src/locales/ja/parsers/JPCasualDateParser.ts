import { Parser, ParsingContext } from "../../../chrono";
import dayjs from "dayjs";
import { Meridiem } from "../../../index";
import * as references from "../../../common/casualReferences";

const PATTERN = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;

export default class JPCasualDateParser implements Parser {
    pattern() {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        const text = match[0];

        const date = dayjs(context.refDate);
        const components = context.createParsingComponents();

        switch (text) {
            case "昨日":
                return references.yesterday(context.reference);

            case "明日":
                return references.tomorrow(context.reference);

            case "今日":
            case "当日":
                return references.today(context.reference);
        }

        if (text == "今夜" || text == "今夕" || text == "今晩") {
            components.imply("hour", 22);
            components.assign("meridiem", Meridiem.PM);
        } else if (text.match("今朝")) {
            components.imply("hour", 6);
            components.assign("meridiem", Meridiem.AM);
        }

        components.assign("day", date.date());
        components.assign("month", date.month() + 1);
        components.assign("year", date.year());
        return components;
    }
}
