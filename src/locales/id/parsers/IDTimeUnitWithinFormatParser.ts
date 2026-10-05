import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// dalam 3 hari  |  dalam waktu 2 minggu  |  dalam sejam
const PATTERN = new RegExp(`(?:dalam\\s+(?:waktu\\s+)?)(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");

export default class IDTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const duration = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
