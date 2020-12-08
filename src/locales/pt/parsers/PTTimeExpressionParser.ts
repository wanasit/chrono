import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

export default class PTTimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string {
        return "(?:(?:ao?|às?|das|da|de|do)\\s*)?";
    }

    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|a(?:o)?|\\?)\\s*";
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
