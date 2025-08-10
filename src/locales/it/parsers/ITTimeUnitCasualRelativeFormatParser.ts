import { TIME_UNITS_PATTERN, parseDuration } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

const PATTERN = new RegExp(
    `(questo|ultimo|passato|prossimo|dopo|questa|ultima|passata|prossima|\\+|-)\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`,
    "i"
);

export default class ENTimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const prefix = match[1].toLowerCase();
        let timeUnits = parseDuration(match[2]);
        switch (prefix) {
            case "last":
            case "past":
            case "-":
                timeUnits = reverseDuration(timeUnits);
                break;
        }

        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
