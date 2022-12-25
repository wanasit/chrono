import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

export default class ESTimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string {
        return "(?:(?:aslas|deslas|las?|al?|de|del)\\s*)?";
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|a(?:l)?|\\?)\\s*";
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
