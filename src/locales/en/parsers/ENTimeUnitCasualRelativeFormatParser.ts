import { TIME_UNITS_PATTERN, parseTimeUnits, FULL_TIME_UNITS_PATTERN } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

const PATTERN = createRegExp(TIME_UNITS_PATTERN);
const FULL_PATTERN = createRegExp(FULL_TIME_UNITS_PATTERN);

function createRegExp(pattern: string): RegExp {
    return new RegExp(`(this|last|past|next|\\+|-)\\s*(${pattern})(?=\\W|$)`, "i");
}

export default class ENTimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return context.option.useShorts ? FULL_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const prefix = match[1].toLowerCase();
        let timeUnits = parseTimeUnits(match[2], context.option.useShorts);
        switch (prefix) {
            case "last":
            case "past":
            case "-":
                timeUnits = reverseTimeUnits(timeUnits);
                break;
        }

        return ParsingComponents.createRelativeFromRefDate(context.refDate, timeUnits);
    }
}
