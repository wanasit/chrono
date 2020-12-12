import { Parser, ParsingContext } from "../../chrono";
import { ParsingResult } from "../../results";
import { findMostLikelyADYear, findYearClosestToRef } from "../../calculation/years";

/**
 * Date format with slash "/" (or dot ".") between numbers.
 * For examples:
 * - 7/10
 * - 7/12/2020
 * - 7.12.2020
 */
const PATTERN = new RegExp(
    "([^\\d]|^)" +
        "([0-3]{0,1}[0-9]{1})[\\/\\.\\-]([0-3]{0,1}[0-9]{1})" +
        "(?:[\\/\\.\\-]([0-9]{4}|[0-9]{2}))?" +
        "(\\W|$)",
    "i"
);

const OPENING_GROUP = 1;
const ENDING_GROUP = 5;

const FIRST_NUMBERS_GROUP = 2;
const SECOND_NUMBERS_GROUP = 3;

const YEAR_GROUP = 4;

export default class SlashDateFormatParser implements Parser {
    groupNumberMonth: number;
    groupNumberDay: number;

    constructor(littleEndian: boolean) {
        this.groupNumberMonth = littleEndian ? SECOND_NUMBERS_GROUP : FIRST_NUMBERS_GROUP;
        this.groupNumberDay = littleEndian ? FIRST_NUMBERS_GROUP : SECOND_NUMBERS_GROUP;
    }

    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        if (match[OPENING_GROUP] == "/" || match[ENDING_GROUP] == "/") {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length;
            return;
        }

        const index = match.index + match[OPENING_GROUP].length;
        const text = match[0].substr(
            match[OPENING_GROUP].length,
            match[0].length - match[OPENING_GROUP].length - match[ENDING_GROUP].length
        );

        // '1.12', '1.12.12' is more like a version numbers
        if (text.match(/^\d\.\d$/) || text.match(/^\d\.\d{1,2}\.\d{1,2}\s*$/)) {
            return;
        }

        // MM/dd -> OK
        // MM.dd -> NG
        if (!match[YEAR_GROUP] && match[0].indexOf("/") < 0) {
            return;
        }

        const result = context.createParsingResult(index, text);
        let month = parseInt(match[this.groupNumberMonth]);
        let day = parseInt(match[this.groupNumberDay]);

        if (month < 1 || month > 12) {
            if (month > 12) {
                if (day >= 1 && day <= 12 && month <= 31) {
                    [day, month] = [month, day];
                } else {
                    return null;
                }
            }
        }

        if (day < 1 || day > 31) {
            return null;
        }

        result.start.assign("day", day);
        result.start.assign("month", month);

        if (match[YEAR_GROUP]) {
            const rawYearNumber = parseInt(match[YEAR_GROUP]);
            const year = findMostLikelyADYear(rawYearNumber);
            result.start.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.refDate, day, month);
            result.start.imply("year", year);
        }

        return result;
    }
}
