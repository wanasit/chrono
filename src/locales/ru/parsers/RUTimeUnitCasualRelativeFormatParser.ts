import { TIME_UNITS_PATTERN, parseTimeUnits, REGEX_PARTS } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

const PATTERN = new RegExp(
    `(эти|последние|прошлые|следующие|после|спустя|через|\\+|-)\\s*(${TIME_UNITS_PATTERN})${REGEX_PARTS.rightBoundary}`,
    REGEX_PARTS.flags
);

export default class RUTimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary(): string {
        return REGEX_PARTS.leftBoundary;
    }

    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const prefix = match[1].toLowerCase();
        let timeUnits = parseTimeUnits(match[2]);
        switch (prefix) {
            case "последние":
            case "прошлые":
            case "-":
                timeUnits = reverseTimeUnits(timeUnits);
                break;
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
