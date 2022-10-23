import { TIME_UNITS_PATTERN, parseTimeUnits } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

export default class ITTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return new RegExp(
        "(?:per\\s*le|più\\s*o\\s*meno\\s*alle|intorno\\s*alle|circa\\s*alle|fra)\\s*" +
            "(" + TIME_UNITS_PATTERN + ")" +
            "(?:(circa)\\s*?)?" +
            "(?=\\W|$)",
             "i"
         );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const timeUnits = parseTimeUnits(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
