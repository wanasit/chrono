import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { ParsingComponents } from "../../../results";
import { ParsingContext } from "../../../chrono";

export default class NLTimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string {
        return "(?:(?:om)\\s*)?";
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|om|\\?)\\s*";
    }

    primarySuffix(): string {
        return "(?:\\s*(?:uur))?(?!/)(?=\\W|$)";
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        // This looks more like a year e.g. 2020
        if (match[0].match(/^\s*\d{4}\s*$/)) {
            return null;
        }

        return super.extractPrimaryTimeComponents(context, match);
    }
}
