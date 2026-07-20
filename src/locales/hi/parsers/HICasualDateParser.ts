import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";

import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

import * as references from "../../../common/casualReferences";

export default class HICasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(अभी|आज|बीता\s*कल|आने\s*वाला\s*कल)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult | null {
        const lowerText = match[0].toLowerCase().replace(/\s+/g, " ");

        switch (lowerText) {
            case "अभी":
                return references.now(context.reference);

            case "आज":
                return references.today(context.reference);

            case "बीता कल":
                return references.yesterday(context.reference);

            case "आने वाला कल":
                return references.tomorrow(context.reference);
        }

        return null;
    }
}
