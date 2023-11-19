import { TIME_UNITS_PATTERN, parseTimeUnits, REGEX_PARTS } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = `(?:(?:около|примерно)\\s*(?:~\\s*)?)?(${TIME_UNITS_PATTERN})${REGEX_PARTS.rightBoundary}`;

export default class RUTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    private readonly patternWithPrefix: RegExp;
    private readonly patternWithoutPrefix: RegExp;

    constructor() {
        super();
        this.patternWithPrefix = new RegExp(`(?:в течение|в течении)\\s*${PATTERN}`, REGEX_PARTS.flags);
        this.patternWithoutPrefix = new RegExp(PATTERN, REGEX_PARTS.flags);
    }

    patternLeftBoundary(): string {
        return REGEX_PARTS.leftBoundary;
    }

    innerPattern(context: ParsingContext): RegExp {
        return context.option.forwardDate ? this.patternWithoutPrefix : this.patternWithPrefix;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
