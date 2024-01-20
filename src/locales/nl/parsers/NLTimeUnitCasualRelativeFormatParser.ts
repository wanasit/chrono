import { TIME_UNITS_PATTERN, parseTimeUnits } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

const PATTERN = new RegExp(
    `(dit|deze|vorig|afgelopen|(?:aan)?komend|over|\\+|-)e?\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`,
    "i"
);

const PREFIX_WORD_GROUP = 1;
const TIME_UNIT_WORD_GROUP = 2;

export default class NLTimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const prefix = match[PREFIX_WORD_GROUP].toLowerCase();
        let timeUnits = parseTimeUnits(match[TIME_UNIT_WORD_GROUP]);
        switch (prefix) {
            case "vorig":
            case "afgelopen":
            case "-":
                timeUnits = reverseTimeUnits(timeUnits);
                break;
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
