import { TIME_UNITS_PATTERN, parseTimeUnits, REGEX_PARTS } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { reverseTimeUnits } from "../../../utils/timeunits";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

export default class UKTimeUnitCasualRelativeFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(ці|останні|минулі|майбутні|наступні|після|через|\\+|-)\\s*(${TIME_UNITS_PATTERN})`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const prefix = match[1].toLowerCase();
        let timeUnits = parseTimeUnits(match[3]);
        switch (prefix) {
            case "останні":
            case "минулі":
            case "-":
                timeUnits = reverseTimeUnits(timeUnits);
                break;
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
