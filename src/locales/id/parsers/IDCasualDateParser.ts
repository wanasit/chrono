import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as references from "../../../common/casualReferences";

const PATTERN =
    /(sekarang|saat\s+ini|hari\s+ini|kemarin\s+lusa|kemarin|besok\s+lusa|besok|lusa|nanti\s+malam|malam\s+ini|tadi\s+malam|semalam)(?=\W|$)/i;

export default class IDCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const lowerText = match[1].toLowerCase().replace(/\s+/g, " ");
        switch (lowerText) {
            case "sekarang":
            case "saat ini":
                return references.now(context.reference);
            case "hari ini":
                return references.today(context.reference);
            case "kemarin":
                return references.yesterday(context.reference);
            case "kemarin lusa":
                return references.theDayBefore(context.reference, 2);
            case "besok":
                return references.tomorrow(context.reference);
            case "lusa":
            case "besok lusa":
                return references.theDayAfter(context.reference, 2);
            case "nanti malam":
            case "malam ini":
                return references.tonight(context.reference);
            case "tadi malam":
            case "semalam":
                return references.lastNight(context.reference);
        }
        return context.createParsingComponents();
    }
}
