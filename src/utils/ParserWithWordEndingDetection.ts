import {Parser, ParsingContext} from "../chrono";

export function createParserWithWordBoundaryDetection(parser: Parser) : ParserWithWordEndingDetection {
    return new ParserWithWordEndingDetection(parser)
}

export class ParserWithWordEndingDetection implements Parser {

    private original: Parser;

    constructor(parser: Parser) {
        this.original = parser;
    }

    pattern(context: ParsingContext): RegExp {
        const originalPattern = this.original.pattern(context);
        return new RegExp(`(\\W|^)${originalPattern.source}`, originalPattern.flags);
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {

        const header = match[1]
        match.index = match.index + header.length
        match[0] = match[0].substring(header.length)
        for (let i=2; i<match.length; i++) {
            match[i-1] = match[i]
        }

        return this.original.extract(context, match)
    }
}

