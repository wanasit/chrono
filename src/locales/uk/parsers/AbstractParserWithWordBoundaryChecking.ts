// noinspection DuplicatedCode

import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { REGEX_PARTS } from "../constants";
import { ParsingContext } from "../../../chrono";

export abstract class AbstractParserWithLeftBoundaryChecking extends AbstractParserWithWordBoundaryChecking {
    abstract innerPatternString(context: ParsingContext): string;

    patternLeftBoundary(): string {
        return REGEX_PARTS.leftBoundary;
    }

    innerPattern(context: ParsingContext): RegExp {
        return new RegExp(this.innerPatternString(context), REGEX_PARTS.flags);
    }

    innerPatternHasChange(context: ParsingContext, currentInnerPattern: RegExp): boolean {
        return false;
    }
}

export abstract class AbstractParserWithLeftRightBoundaryChecking extends AbstractParserWithLeftBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return new RegExp(`${this.innerPatternString(context)}${REGEX_PARTS.rightBoundary}`, REGEX_PARTS.flags);
    }
}
