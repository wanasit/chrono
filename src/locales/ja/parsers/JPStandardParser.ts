import { Parser, ParsingContext } from "../../../chrono";
import { toHankaku } from "../constants";
import { findYearClosestToRef } from "../../../calculation/years";

import dayjs from "dayjs";

const PATTERN =
    /(?:(?:([同今本])|((昭和|平成|令和)?([0-9０-９]{1,4}|元)))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
const SPECIAL_YEAR_GROUP = 1;
const TYPICAL_YEAR_GROUP = 2;
const ERA_GROUP = 3;
const YEAR_NUMBER_GROUP = 4;
const MONTH_GROUP = 5;
const DAY_GROUP = 6;

export default class JPStandardParser implements Parser {
    pattern() {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        const month = parseInt(toHankaku(match[MONTH_GROUP]));
        const day = parseInt(toHankaku(match[DAY_GROUP]));
        const components = context.createParsingComponents({
            day: day,
            month: month,
        });

        if (match[SPECIAL_YEAR_GROUP] && match[SPECIAL_YEAR_GROUP].match("同|今|本")) {
            const moment = dayjs(context.refDate);
            components.assign("year", moment.year());
        }

        if (match[TYPICAL_YEAR_GROUP]) {
            const yearNumText = match[YEAR_NUMBER_GROUP];

            let year = yearNumText == "元" ? 1 : parseInt(toHankaku(yearNumText));
            if (match[ERA_GROUP] == "令和") {
                year += 2018;
            } else if (match[ERA_GROUP] == "平成") {
                year += 1988;
            } else if (match[ERA_GROUP] == "昭和") {
                year += 1925;
            }

            components.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.refDate, day, month);
            components.imply("year", year);
        }

        return components;
    }
}
