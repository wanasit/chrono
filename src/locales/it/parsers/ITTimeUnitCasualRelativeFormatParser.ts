import { TIME_UNITS_PATTERN, parseTimeUnits } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

const PATTERN = new RegExp(
    `(queste|ultime|passate|scorse|prossime|dopo|\\+|-)\\s*(${TIME_UNITS_PATTERN})` +
    "(?:(passate|scorse|dopo|\\+|-)\\s*?)?" +
    "(?=\\W|$)",
    "i"
    );

export default class ITTimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const prefix = match[1].toLowerCase();
        let timeUnits = parseTimeUnits(match[2]);
        switch (prefix) {
            case "ultime":
            case "scorse":
            case "-":
                timeUnits = reverseTimeUnits(timeUnits);
                break;
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
