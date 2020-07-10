import {Parser, ParsingContext} from "../../chrono";
import {ParsingComponents, ParsingResult} from "../../results";
import {Component} from "../../index";

export abstract class AbstractParserWithWordBoundaryChecking implements Parser {

    abstract innerPattern(context: ParsingContext): RegExp;
    abstract innerExtract(context: ParsingContext, match: RegExpMatchArray):
        (ParsingComponents | ParsingResult | {[c in Component]?: number} | null)

    pattern(context: ParsingContext): RegExp {
        const innerPattern = this.innerPattern(context);
        return new RegExp(`(\\W|^)${innerPattern.source}`, innerPattern.flags);
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        const header = match[1]
        match.index = match.index + header.length
        match[0] = match[0].substring(header.length)
        for (let i=2; i<match.length; i++) {
            match[i-1] = match[i]
        }

        return this.innerExtract(context, match)
    }
}

