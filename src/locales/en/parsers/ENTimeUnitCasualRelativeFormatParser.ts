import { TIME_UNITS_PATTERN, parseTimeUnits, TIME_UNITS_NO_ABBR_PATTERN } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseTimeUnits } from "../../../utils/timeunits";

const PATTERN = new RegExp(`(this|last|past|next|after|\\+|-)\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
const PATTERN_NO_ABBR = new RegExp(
    `(this|last|past|next|after|\\+|-)\\s*(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`,
    "i"
);

export default class ENTimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private allowAbbreviations: boolean = true) {
        super();
    }

    innerPattern(): RegExp {
        return this.allowAbbreviations ? PATTERN : PATTERN_NO_ABBR;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const prefix = match[1].toLowerCase();
        let timeUnits = parseTimeUnits(match[2]);
        if (!timeUnits) {
            return null;
        }
        switch (prefix) {
            case "last":
            case "past":
            case "-":
                timeUnits = reverseTimeUnits(timeUnits);
                break;
        }
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
