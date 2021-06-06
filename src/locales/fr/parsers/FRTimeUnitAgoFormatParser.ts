import { ParsingContext } from "../../../chrono";
import { parseTimeUnits, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

export default class FRTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor() {
        super();
    }

    innerPattern(): RegExp {
        return new RegExp(`il y a\\s*(${TIME_UNITS_PATTERN})(?=(?:\\W|$))`, "i");
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const timeUnits = parseTimeUnits(match[1]);
        const outputTimeUnits = reverseTimeUnits(timeUnits);

        return ParsingComponents.createRelativeFromRefInstant(context.refDate, outputTimeUnits);
    }
}
