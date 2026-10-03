import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

// 3 hari yang lalu  |  2 minggu lalu  |  setahun silam  |  5 menit sebelumnya
const PATTERN = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:yang\\s+)?(?:lalu|silam|sebelumnya)(?=\\W|$)`, "i");

export default class IDTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const duration = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, reverseDuration(duration));
    }
}
