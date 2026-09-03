import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

export default class ARTimeUnitLaterFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(?:(?:بعد)\\s*(${TIME_UNITS_PATTERN})(?:\\s*من\\s*الآن)?|(${TIME_UNITS_PATTERN})\\s*(?:من\\s*الآن|لاحقاً|لاحقا))`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const timeUnitsText = match[1] || match[2];
        const timeUnits = parseDuration(timeUnitsText);

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
