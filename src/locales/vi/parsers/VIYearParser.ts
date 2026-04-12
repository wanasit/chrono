import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { YEAR_PATTERN, parseYear } from "../constants";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// năm 1975  |  năm 43 TCN
const PATTERN = new RegExp(
    "\\bnăm\\s*(" + YEAR_PATTERN + ")(?:\\s*(TCN))?(?=\\W|$)",
    "i"
);

const YEAR_GROUP = 1;
const BC_GROUP = 2;

export default class VIYearParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp { return PATTERN; }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        let yearText = match[YEAR_GROUP];
        if (match[BC_GROUP]) yearText += " " + match[BC_GROUP];
        const result = context.createParsingResult(match.index, match[0]);
        result.start.assign("year", parseYear(yearText));
        result.start.imply("month", 1);
        result.start.imply("day", 1);
        return result;
    }
}
