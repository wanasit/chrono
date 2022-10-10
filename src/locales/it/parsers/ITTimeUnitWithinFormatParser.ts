import { TIME_UNITS_PATTERN, parseTimeUnits } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

export default class ITTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return new RegExp(
        "(?:per|più\\s*o\\s*meno|intorno|orientativamente|approssimativamente|verso|circa|tra)\\s*" +
            "(?:(\\w*le|circa)\\s*?)?" +
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
