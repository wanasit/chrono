import { MONTH_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { matchAnyPattern } from "../../../utils/pattern";
import { YEAR_PATTERN, parseYear } from "../constants";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

const MONTH_NAME_GROUP = 1;
const YEAR_GROUP = 2;

export default class ARMonthNameParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return (
            `(?:(?:في|خلال)\\s*)?` +
            `(?:شهر\\s*)?` +
            `(${matchAnyPattern(MONTH_DICTIONARY)})` +
            `(?:` +
            `(?:\\s*(?:،|,)?\\s*(?:سنة|عام)?\\s*)` +
            `(${YEAR_PATTERN})` +
            `)?`
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        // If immediately preceded by a number, this was an invalid date (e.g. "32 يناير")
        if (context.text.substring(0, match.index).match(/[0-9٠-٩]+\s*$/)) {
            return null;
        }

        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        const month = MONTH_DICTIONARY[monthName];
        if (!month) {
            return null;
        }

        const result = context.createParsingResult(match.index, match[0]);
        result.start.imply("day", 1);
        result.start.assign("month", month);

        if (match[YEAR_GROUP]) {
            const year = parseYear(match[YEAR_GROUP]);
            result.start.assign("year", year);
        } else {
            const year = findYearClosestToRef(context.refDate, 1, month);
            result.start.imply("year", year);
        }

        return result;
    }
}
