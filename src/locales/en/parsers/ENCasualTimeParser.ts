import { ParsingContext } from "../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as casualReferences from "../../../common/casualReferences";

const PATTERN = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|midday|noon)(?=\W|$)/i;

export default class ENCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        switch (match[1].toLowerCase()) {
            case "afternoon":
                return casualReferences.afternoon(context.reference);
            case "evening":
            case "night":
                return casualReferences.evening(context.reference);
            case "midnight":
                return casualReferences.midnight(context.reference);
            case "morning":
                return casualReferences.morning(context.reference);
            case "noon":
            case "midday":
                return casualReferences.noon(context.reference);
        }
        return null;
    }
}
