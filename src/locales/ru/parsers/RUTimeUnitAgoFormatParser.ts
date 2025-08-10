import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithLeftBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";
import { reverseDuration } from "../../../calculation/duration";

export default class RUTimeUnitAgoFormatParser extends AbstractParserWithLeftBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(${TIME_UNITS_PATTERN})\\s{0,5}назад(?=(?:\\W|$))`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const timeUnits = parseDuration(match[1]);
        const outputTimeUnits = reverseDuration(timeUnits);

        return ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
    }
}
