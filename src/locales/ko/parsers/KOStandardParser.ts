import { Parser, ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";

/**
 * "2026년 11월 5일" (Nov 5, 2026), "11월 5일" (Nov 5). 년 = year, 월 = month, 일 = day.
 */
const PATTERN = /(?:(\d{4})\s*년\s*)?(\d{1,2})\s*월\s*(\d{1,2})\s*일/;
const YEAR_GROUP = 1;
const MONTH_GROUP = 2;
const DAY_GROUP = 3;

export default class KOStandardParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        const month = parseInt(match[MONTH_GROUP]);
        const day = parseInt(match[DAY_GROUP]);
        if (month < 1 || month > 12 || day < 1 || day > 31) {
            return null;
        }

        const components = context.createParsingComponents({ day, month });
        if (match[YEAR_GROUP]) {
            components.assign("year", parseInt(match[YEAR_GROUP]));
        } else {
            components.imply("year", findYearClosestToRef(context.refDate, day, month));
        }
        return components;
    }
}
