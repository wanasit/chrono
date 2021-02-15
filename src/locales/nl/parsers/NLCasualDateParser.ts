import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as references from "../../../common/casualReferences";

export default class NLCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(nu|vandaag|morgen|morgend|gisteren)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "nu":
                return references.now(context.refDate);

            case "vandaag":
                return references.today(context.refDate);

            case "morgen":
            case "morgend":
                return references.tomorrow(context.refDate);

            case "gisteren":
                return references.yesterday(context.refDate);
        }

        return component;
    }
}
