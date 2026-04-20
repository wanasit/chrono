import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as references from "../../../common/casualReferences";

const PATTERN = /\b(hôm nay|hôm qua|hôm kia|ngày mai|ngày kia|bây giờ|lúc này)(?=\W|$)/i;

export default class VICasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        switch (match[1].toLowerCase()) {
            case "bây giờ":
            case "lúc này":
                return references.now(context.reference);
            case "hôm nay":
                return references.today(context.reference);
            case "hôm qua":
                return references.yesterday(context.reference);
            case "hôm kia":
                return references.theDayBefore(context.reference, 2);
            case "ngày mai":
                return references.tomorrow(context.reference);
            case "ngày kia":
                return references.theDayAfter(context.reference, 2);
        }
        return context.createParsingComponents();
    }
}
