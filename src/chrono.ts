import {ParsingComponents, ParsingResult} from "./results";
import {Component, ParsedResult, ParsingOption} from "./index";
import {AsyncDebugBlock, DebugHandler} from "./debugging";
import {createCasualConfiguration} from './locales/en';

export interface Configuration {
    parsers: Parser[],
    refiners: Refiner[]
}

export interface Parser {
    pattern(context: ParsingContext): RegExp,
    extract(context: ParsingContext, match: RegExpMatchArray):
        (ParsingComponents | ParsingResult | {[c in Component]?: number} | null)
}

export interface Refiner {
    refine: (context: ParsingContext, results: ParsingResult[]) => ParsingResult[]
}

export class Chrono {
    parsers: Array<Parser>
    refiners: Array<Refiner>

    constructor(configuration?: Configuration) {
        configuration = configuration || createCasualConfiguration();
        this.parsers = [...configuration.parsers];
        this.refiners = [...configuration.refiners];
    }

    parseDate(text, refDate?, opt?): Date {
        const results = this.parse(text, refDate, opt);
        return (results.length > 0) ? results[0].start.date() : null;
    }

    parse(text: string, refDate?: Date, opt?: ParsingOption): ParsedResult[] {
        const context = new ParsingContext(text,
            refDate || new Date(),
            opt || {})

        let results = [];
        this.parsers.forEach((parser) => {
            const parsedResults = Chrono.executeParser(context, parser);
            results = results.concat(parsedResults);
        });

        results.sort((a, b) => {
            return a.index - b.index;
        });

        this.refiners.forEach(function (refiner) {
            results = refiner.refine(context, results);
        });

        return results;
    }

    clone() : Chrono{
        return new Chrono({
            parsers: [...this.parsers],
            refiners: [...this.refiners]
        })
    }

    private static executeParser(context: ParsingContext, parser: Parser) {
        const results = [];
        const pattern = parser.pattern(context);

        const originalText = context.text;
        let remainingText = context.text;
        let match = pattern.exec(remainingText);

        while (match) {

            // Calculate match index on the full text;
            const index = match.index + originalText.length - remainingText.length
            match.index = index;

            const result = parser.extract(context, match);
            if (!result) {
                // If fail, move on by 1
                remainingText = originalText.substring(match.index + 1);
                match = pattern.exec(remainingText);
                continue;
            }

            let parsedResult: ParsingResult = null;
            if (result instanceof ParsingResult) {
                parsedResult = result;
            } else if (result instanceof ParsingComponents) {
                parsedResult = context.createParsingResult(match.index, match[0])
                parsedResult.start = result
            } else {
                parsedResult = context.createParsingResult(match.index, match[0], result)
            }

            context.debug(() =>
                console.log(`${parser.constructor.name} extracted result ${parsedResult}`))

            results.push(parsedResult);
            remainingText = originalText.substring(index + parsedResult.text.length);
            match = pattern.exec(remainingText);
        }

        return results;
    }
}

export class ParsingContext implements DebugHandler {
    constructor(
        readonly text: string,
        readonly refDate: Date,
        readonly option: ParsingOption
    ) {}

    createParsingComponents(components?: {[c in Component]?: number}) : ParsingComponents {
        return new ParsingComponents(this.refDate, components)
    }

    createParsingResult(
        index: number, textOrEndIndex: number | string,
        startComponents?: {[c in Component]?: number},
        endComponents?: {[c in Component]?: number}
    ) : ParsingResult {

        const text = (typeof textOrEndIndex === 'string') ? textOrEndIndex :
            this.text.substring(index, textOrEndIndex)

        const start = startComponents ? this.createParsingComponents(startComponents) : null
        const end = endComponents ? this.createParsingComponents(endComponents) : null

        return new ParsingResult(this.refDate, index, text, start, end)
    }

    debug(block: AsyncDebugBlock): void {
        if (this.option.debug) {
            if (this.option.debug instanceof Function) {
                this.option.debug(block)
            } else {
                const handler: DebugHandler = <DebugHandler>this.option.debug;
                handler.debug(block)
            }
        }
    }
}
