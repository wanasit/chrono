import { TIME_UNITS_PATTERN, parseTimeUnits } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

export default class ESTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return new RegExp(`(?:en|por|durante|de|dentro de)\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
