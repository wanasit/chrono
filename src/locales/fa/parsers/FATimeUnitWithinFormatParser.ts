import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

import { TIME_UNIT_DICTIONARY, NUMBER_PATTERN, parseDuration } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";

const TIME_UNITS_PATTERN = `(${NUMBER_PATTERN})\\s{0,5}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})`;
const PATTERN = new RegExp(`(در|طی|ظرف|تا)\\s{0,3}${TIME_UNITS_PATTERN}(?=\\W|$)`, "i");

export default class FATimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        // Groups: 1=preposition, 2=number, 3=unit
        const timeUnitMatch = match[2] + " " + match[3];
        const duration = parseDuration(timeUnitMatch);
        if (!duration) {
            return null;
        }

        // Create the result with proper text capture including the preposition
        const result = ParsingComponents.createRelativeFromReference(context.reference, duration);
        result.addTag("parser/FATimeUnitWithinFormatParser");

        // Ensure we capture the full match including the preposition
        return result;
    }
}
