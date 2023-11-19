import { TIME_UNITS_PATTERN, parseTimeUnits, REGEX_PARTS } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = `(?:(?:приблизно|орієнтовно)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})${REGEX_PARTS.rightBoundary}`;

export default class UKTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    patternLeftBoundary(): string {
        return REGEX_PARTS.leftBoundary;
    }

    innerPattern(context: ParsingContext): RegExp {
        return context.option.forwardDate
            ? new RegExp(PATTERN, "i")
            : new RegExp(`(?:протягом|на протязі|протягом|упродовж|впродовж)\\s*${PATTERN}`, REGEX_PARTS.flags);
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
