import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { YEAR_PATTERN, parseYear } from "../constants";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// năm 1975  |  năm 43 TCN  |  179 TCN (bare BC year without năm prefix)
const PATTERN = new RegExp(
    "(?:\\bnăm\\s*(" + YEAR_PATTERN + ")|\\b([0-9]{1,4})\\s*(TCN))(?=\\W|$)",
    "i"
);

const YEAR_WITH_NAM_GROUP = 1; // năm YYYY or năm YYYY TCN
const BARE_BC_YEAR_GROUP = 2;  // bare YYYY in "YYYY TCN"
const BARE_BC_SUFFIX_GROUP = 3; // "TCN" in bare form

export default class VIYearParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        let yearText: string;
        if (match[YEAR_WITH_NAM_GROUP]) {
            yearText = match[YEAR_WITH_NAM_GROUP];
        } else {
            yearText = match[BARE_BC_YEAR_GROUP] + " " + match[BARE_BC_SUFFIX_GROUP];
        }
        const result = context.createParsingResult(match.index, match[0]);
        result.start.assign("year", parseYear(yearText));
        result.start.imply("month", 1);
        result.start.imply("day", 1);
        return result;
    }
}
