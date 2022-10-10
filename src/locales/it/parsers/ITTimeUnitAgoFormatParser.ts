import { ParsingContext } from "../../../chrono";
import { parseTimeUnits, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

export default class ITTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(): RegExp {
        return new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:fa|prima|precedente)(?=(?:\\W|$))`, "i");
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const timeUnits = parseTimeUnits(match[1]);
        const outputTimeUnits = reverseTimeUnits(timeUnits);

        return ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
    }
}
