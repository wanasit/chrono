import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

export default class ARTimeUnitWithinFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(?:في\\s*خلال|في\\s*غضون|في\\s*ظرف|خلال)\\s*(${TIME_UNITS_PATTERN})`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
