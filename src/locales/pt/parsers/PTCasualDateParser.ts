import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as references from "../../../common/casualReferences";

export default class PTCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(agora|hoje|amanha|amanhã|ontem)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "agora":
                return references.now(context.reference);

            case "hoje":
                return references.today(context.reference);

            case "amanha":
            case "amanhã":
                return references.tomorrow(context.reference);

            case "ontem":
                return references.yesterday(context.reference);
        }

        return component;
    }
}
