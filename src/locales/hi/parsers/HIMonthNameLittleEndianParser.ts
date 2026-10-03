import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";

import { findYearClosestToRef } from "../../../calculation/years";

import {
    MONTH_DICTIONARY,
    MONTH_PATTERN,
    ORDINAL_NUMBER_PATTERN,
    parseOrdinalNumberPattern,
    YEAR_PATTERN,
    parseYear,
} from "../constants";

import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = new RegExp(
    `(${ORDINAL_NUMBER_PATTERN})\\s*` + `(${MONTH_PATTERN})` + `(?:\\s*(${YEAR_PATTERN}))?` + `(?=\\W|$)`,
    "i"
);

const DATE_GROUP = 1;
const MONTH_NAME_GROUP = 2;
const YEAR_GROUP = 3;

export default class HIMonthNameLittleEndianParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const result = context.createParsingResult(match.index!, match[0]);

        const day = parseOrdinalNumberPattern(match[DATE_GROUP]);

        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP]]!;

        result.start.assign("day", day);
        result.start.assign("month", month);

        if (match[YEAR_GROUP]) {
            result.start.assign("year", parseYear(match[YEAR_GROUP]));
        } else {
            const year = findYearClosestToRef(context.refDate, day, month);

            result.start.imply("year", year);
        }

        return result;
    }
}
