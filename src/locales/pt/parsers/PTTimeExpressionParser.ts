import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

// A bare number followed by one of these units is a duration, e.g. "daqui a 2 semanas"
// or "prazo de 3 dias", not a time of day. "horas" is left out because "às 2 horas" is a time.
const FOLLOWING_DURATION_UNIT_PATTERN = /^\s*(?:segundos?|minutos?|dias?|semanas?|m[eê]s(?:es)?|anos?)(?=\W|$)/i;

export default class PTTimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string {
        return "(?:(?:ao?|às?|das|da|de|do)\\s*)?";
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|a(?:o)?|\\?)\\s*";
    }

    extractPrimaryTimeComponents(
        context: ParsingContext,
        match: RegExpMatchArray,
        strict = false
    ): null | ParsingComponents {
        if (match[0].match(/\s\d{1,2}$/) || match[0].match(/^\d{1,2}$/)) {
            const followingText = context.text.substring(match.index + match[0].length);
            if (followingText.match(FOLLOWING_DURATION_UNIT_PATTERN)) {
                return null;
            }
        }

        return super.extractPrimaryTimeComponents(context, match, strict);
    }

    // extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
    //     // This looks more like a year e.g. 2020
    //     // if (match[0].match(/^\s*\d{4}\s*$/)) {
    //     //     return null;
    //     // }
    //
    //     return super.extractPrimaryTimeComponents(context, match);
    // }
}
