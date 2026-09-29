import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// 3 hari lagi  |  2 minggu kemudian  |  sebulan setelahnya  |  5 hari ke depan
const PATTERN = new RegExp(
    `(${TIME_UNITS_PATTERN})\\s{0,5}(?:lagi|kemudian|setelahnya|sesudahnya|mendatang|ke\\s*depan)(?=\\W|$)`,
    "i"
);

export default class IDTimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const duration = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
