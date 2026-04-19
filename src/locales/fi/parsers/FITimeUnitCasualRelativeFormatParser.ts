import { TIME_UNITS_PATTERN, parseDuration, TIME_UNITS_NO_ABBR_PATTERN } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

const PATTERN = new RegExp(
    `(seuraava|seuraavat|seuraavien|edellinen|edelliset|edellisten|viimeiset|viimeisten|kuluneet|kuluneiden|\\+|-)\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`,
    "i"
);
const PATTERN_NO_ABBR = new RegExp(
    `(seuraava|seuraavat|seuraavien|edellinen|edelliset|edellisten|viimeiset|viimeisten|kuluneet|kuluneiden|\\+|-)\\s*(${TIME_UNITS_NO_ABBR_PATTERN})(?=\\W|$)`,
    "i"
);

export default class FITimeUnitCasualRelativeFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private allowAbbreviations: boolean = true) {
        super();
    }

    innerPattern(): RegExp {
        return this.allowAbbreviations ? PATTERN : PATTERN_NO_ABBR;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const prefix = match[1].toLowerCase();
        let duration = parseDuration(match[2]);
        if (!duration) {
            return null;
        }

        switch (prefix) {
            case "edellinen":
            case "edelliset":
            case "edellisten":
            case "viimeiset":
            case "viimeisten":
            case "kuluneet":
            case "kuluneiden":
            case "-":
                duration = reverseDuration(duration);
                break;
        }

        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
