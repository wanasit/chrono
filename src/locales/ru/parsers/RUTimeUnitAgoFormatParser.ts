import { ParsingContext } from "../../../chrono";
import { parseTimeUnits, REGEX_PARTS, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

const PATTERN = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}назад(?=(?:\\W|$))`, REGEX_PARTS.flags);

export default class RUTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary(): string {
        return REGEX_PARTS.leftBoundary;
    }

    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const timeUnits = parseTimeUnits(match[1]);
        const outputTimeUnits = reverseTimeUnits(timeUnits);

        return ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
    }
}
