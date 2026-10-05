import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import * as references from "../../../common/casualReferences";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

export default class ARCasualDateParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(الآن|الان|حالياً|حاليا|اليوم|أول\\s*(?:من\\s*)?أمس|اول\\s*(?:من\\s*)?امس|أول\\s*(?:من\\s*)?البارحة|اول\\s*(?:من\\s*)?البارحة|قبل\\s*(?:من\\s*)?أمس|قبل\\s*(?:من\\s*)?امس|أمس|امس|البارحة|بعد\\s*غد(?:اً|ا)?|بعد\\s*بكر[ةا]|غداً|غدا|بكر[ةا])`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const lowerText = match[1].toLowerCase();
        const component = context.createParsingComponents();

        if (lowerText === "الآن" || lowerText === "الان" || lowerText === "حالياً" || lowerText === "حاليا") {
            return references.now(context.reference);
        }

        if (lowerText === "اليوم") {
            return references.today(context.reference);
        }

        if (
            lowerText.match(/أول\s*(?:من\s*)?أمس/) ||
            lowerText.match(/اول\s*(?:من\s*)?امس/) ||
            lowerText.match(/أول\s*(?:من\s*)?البارحة/) ||
            lowerText.match(/اول\s*(?:من\s*)?البارحة/) ||
            lowerText.match(/قبل\s*(?:من\s*)?أمس/) ||
            lowerText.match(/قبل\s*(?:من\s*)?امس/)
        ) {
            return references.theDayBefore(context.reference, 2);
        }

        if (lowerText === "أمس" || lowerText === "امس" || lowerText === "البارحة") {
            return references.yesterday(context.reference);
        }

        if (lowerText.match(/بعد\s*غد/) || lowerText.match(/بعد\s*بكر/)) {
            return references.theDayAfter(context.reference, 2);
        }

        if (lowerText === "غداً" || lowerText === "غدا" || lowerText.match(/^بكر[ةا]$/)) {
            return references.tomorrow(context.reference);
        }

        return component;
    }
}
