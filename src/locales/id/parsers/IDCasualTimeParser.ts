import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as casualReferences from "../../../common/casualReferences";

// pagi  |  siang  |  sore  |  petang  |  malam  |  tengah malam  |  tengah hari  |  pagi ini
const PATTERN =
    /(?:(?:pada|di)\s+)?(tengah\s+malam|tengah\s+hari|pagi|siang|sore|petang|malam(?!\s+ini))(?:\s+ini)?(?=\W|$)/i;

export default class IDCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        switch (match[1].toLowerCase().replace(/\s+/g, " ")) {
            case "pagi":
                return casualReferences.morning(context.reference);
            case "siang":
            case "tengah hari":
                return casualReferences.noon(context.reference);
            case "sore":
            case "petang":
                return casualReferences.afternoon(context.reference);
            case "malam":
                return casualReferences.evening(context.reference);
            case "tengah malam":
                return casualReferences.midnight(context.reference);
        }
        return null;
    }
}
