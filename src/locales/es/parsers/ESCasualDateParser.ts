import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as references from "../../../common/casualReferences";

export default class ESCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(ahora|hoy|mañana|manana|ayer)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult | null {
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        if (
            (lowerText === "mañana" || lowerText === "manana") &&
            context.text.substring(0, match.index).match(/(?:^|[^\p{L}\p{N}\p{M}_])(?:a|en)\s+la\s*$/iu)
        ) {
            return null;
        }

        switch (lowerText) {
            case "ahora":
                return references.now(context.reference);

            case "hoy":
                return references.today(context.reference);

            case "mañana":
            case "manana":
                return references.tomorrow(context.reference);

            case "ayer":
                return references.yesterday(context.reference);
        }

        return component;
    }
}
