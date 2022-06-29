import { TIME_UNITS_PATTERN, parseTimeUnits, REGEX_PARTS } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = `(?:(?:около|примерно)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})${REGEX_PARTS.rightBoundary}`;
const PATTERN_WITH_PREFIX = new RegExp(`(?:в течение|в течении)\\s*${PATTERN}`, REGEX_PARTS.flags);

const PATTERN_WITHOUT_PREFIX = new RegExp(PATTERN, "i");

export default class RUTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary(): string {
        return REGEX_PARTS.leftBoundary;
    }

    innerPattern(context: ParsingContext): RegExp {
        return context.option.forwardDate ? PATTERN_WITHOUT_PREFIX : PATTERN_WITH_PREFIX;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
