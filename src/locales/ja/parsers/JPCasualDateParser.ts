import { Parser, ParsingContext } from "../../../chrono";
import dayjs from "dayjs";
import { Meridiem } from "../../../types";
import * as references from "../../../common/casualReferences";

const PATTERN = /今日|きょう|当日|とうじつ|昨日|きのう|明日|あした|今夜|こんや|今夕|こんゆう|今晩|こんばん|今朝|けさ/i;

function normalizeTextToKanji(text: string) {
    switch (text) {
        case "きょう":
            return "今日";
        case "とうじつ":
            return "当日";
        case "きのう":
            return "昨日";
        case "あした":
            return "明日";
        case "こんや":
            return "今夜";
        case "こんゆう":
            return "今夕";
        case "こんばん":
            return "今晩";
        case "けさ":
            return "今朝";
        default:
            return text;
    }
}

export default class JPCasualDateParser implements Parser {
    pattern() {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        const text = normalizeTextToKanji(match[0]);

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
