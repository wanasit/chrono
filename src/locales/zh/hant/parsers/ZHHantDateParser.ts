import dayjs from "dayjs";
import { ParsingContext } from "../../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../../common/parsers/AbstractParserWithWordBoundary";
import { NUMBER, zhStringToNumber, zhStringToYear } from "../constants";

const YEAR_GROUP = 1;
const MONTH_GROUP = 2;
const DAY_GROUP = 3;

export default class ZHHantDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        // prettier-ignore
        return new RegExp(
            "(" +
                "\\d{2,4}|" +
                "[" + Object.keys(NUMBER).join("") + "]{4}|" +
                "[" + Object.keys(NUMBER).join("") + "]{2}" +
            ")?"+
            "(?:\\s*)" +
            "(?:年)?" +
            "(?:[\\s|,|，]*)" +

            "(" +
                "\\d{1,2}|"+
                "[" +Object.keys(NUMBER).join("") +"]{1,2}"+
            ")" +
            "(?:\\s*)" +
            "(?:月)" +
            "(?:\\s*)" +
            "(" + 
                "\\d{1,2}|" +
                "[" + Object.keys(NUMBER).join("") + "]{1,2}" +
            ")?" +
            "(?:\\s*)" +
            "(?:日|號)?"
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const startMoment = dayjs(context.refDate);
        const result = context.createParsingResult(match.index, match[0]);

        //Month
        let month = parseInt(match[MONTH_GROUP]);
        if (isNaN(month)) month = zhStringToNumber(match[MONTH_GROUP]);
        result.start.assign("month", month);

        //Day
        if (match[DAY_GROUP]) {
            let day = parseInt(match[DAY_GROUP]);
            if (isNaN(day)) day = zhStringToNumber(match[DAY_GROUP]);
            result.start.assign("day", day);
        } else {
            result.start.imply("day", startMoment.date());
        }

        //Year
        if (match[YEAR_GROUP]) {
            let year = parseInt(match[YEAR_GROUP]);
            if (isNaN(year)) year = zhStringToYear(match[YEAR_GROUP]);
            result.start.assign("year", year);
        } else {
            result.start.imply("year", startMoment.year());
        }

        return result;
    }
}
