import { Parser, ParsingContext } from "../../../chrono";
import { convertJapaneseYear, ERA_PATTERN, toHankaku } from "../constants";
import { findYearClosestToRef } from "../../../calculation/years";

const PATTERN = new RegExp(
    `(?:(?:([同今本])|((${ERA_PATTERN})?([0-9０-９]{1,4}|元)))年[の\\s]*)?` +
        "([0-9０-９]{1,2})月\\s*([0-9０-９]{1,2})日",
    "i"
);

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
            components.assign("year", context.reference.getDateWithAdjustedTimezone().getFullYear());
        }

        if (match[TYPICAL_YEAR_GROUP]) {
            const yearNumText = match[YEAR_NUMBER_GROUP];

            components.assign("year", convertJapaneseYear(yearNumText, match[ERA_GROUP]));
        } else {
            const year = findYearClosestToRef(context.refDate, day, month);
            components.imply("year", year);
        }

        return components;
    }
}
