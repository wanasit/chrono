import { TIME_UNITS_PATTERN, parseTimeUnits } from "../../en/constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

export default class ENTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return new RegExp(`(?:binnen|in)\\s*` + "(" + TIME_UNITS_PATTERN + ")" + `(?=\\W|$)`, "i");
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromRefDate(context.refDate, timeUnits);
    }
}
