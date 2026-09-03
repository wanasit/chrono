import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";
import { reverseDuration } from "../../../calculation/duration";

export default class ARTimeUnitAgoFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(?:(?:منذ|قبل)\\s*(${TIME_UNITS_PATTERN})|(${TIME_UNITS_PATTERN})\\s*(?:مضت|سابقاً))`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const timeUnitsText = match[1] || match[2];
        const timeUnits = parseDuration(timeUnitsText);
        const outputTimeUnits = reverseDuration(timeUnits);

        return ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
    }
}
