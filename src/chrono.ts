import { ReferenceWithTimezone, ParsingComponents, ParsingResult } from "./results";
import { Component, ParsedResult, ParsingOption, ParsingReference } from "./index";
import { AsyncDebugBlock, DebugHandler } from "./debugging";
import { createCasualConfiguration } from "./locales/en";

/**
 * Chrono configuration.
 * It is simply an ordered list of parsers and refiners
 */
export interface Configuration {
    parsers: Parser[];
    refiners: Refiner[];
}

/**
 * A abstraction for Chrono *Parser*.
 *
 * Each parser should recognize and handle a certain date format.
 * Chrono uses multiple parses (and refiners) together for parsing the input.
 *
 * The parser implementation must provide {@Link pattern | pattern()} for the date format.
 *
 * The {@Link extract | extract()} method is called with the pattern's *match*.
 * The matching and extracting is controlled and adjusted to avoid for overlapping results.
 */
export interface Parser {
    pattern(context: ParsingContext): RegExp;
    extract(
        context: ParsingContext,
        match: RegExpMatchArray
    ): ParsingComponents | ParsingResult | { [c in Component]?: number } | null;
}

/**
 * A abstraction for Chrono *Refiner*.
 *
 * Each refiner takes the list of results (from parsers or other refiners) and returns another list of results.
 * Chrono applies each refiner in order and return the output from the last refiner.
 */
export interface Refiner {
    refine: (context: ParsingContext, results: ParsingResult[]) => ParsingResult[];
}

/**
 * The Chrono object.
 */
export class Chrono {
    parsers: Array<Parser>;
    refiners: Array<Refiner>;

    constructor(configuration?: Configuration) {
        configuration = configuration || createCasualConfiguration();
        this.parsers = [...configuration.parsers];
        this.refiners = [...configuration.refiners];
    }

    /**
     * Create a shallow copy of the Chrono object with the same configuration (`parsers` and `refiners`)
     */
    clone(): Chrono {
        return new Chrono({
            parsers: [...this.parsers],
            refiners: [...this.refiners],
        });
    }

    /**
     * A shortcut for calling {@Link parse | parse() } then transform the result into Javascript's Date object
     * @return Date object created from the first parse result
     */
    parseDate(text: string, referenceDate?: ParsingReference | Date, option?: ParsingOption): Date | null {
        const results = this.parse(text, referenceDate, option);
        return results.length > 0 ? results[0].start.date() : null;
    }

    parse(text: string, referenceDate?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
        const context = new ParsingContext(text, referenceDate, option);

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

    private static executeParser(context: ParsingContext, parser: Parser) {
        const results = [];
        const pattern = parser.pattern(context);

        const originalText = context.text;
        let remainingText = context.text;
        let match = pattern.exec(remainingText);

        while (match) {
            // Calculate match index on the full text;
            const index = match.index + originalText.length - remainingText.length;
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
                parsedResult = context.createParsingResult(match.index, match[0]);
                parsedResult.start = result;
            } else {
                parsedResult = context.createParsingResult(match.index, match[0], result);
            }

            context.debug(() => console.log(`${parser.constructor.name} extracted result ${parsedResult}`));

            results.push(parsedResult);
            remainingText = originalText.substring(index + parsedResult.text.length);
            match = pattern.exec(remainingText);
        }

        return results;
    }
}

export class ParsingContext implements DebugHandler {
    readonly text: string;
    readonly option: ParsingOption;
    readonly reference: ReferenceWithTimezone;

    /**
     * @deprecated. Use reference.instant instead.
     */
    readonly refDate: Date;

    constructor(text: string, refDate?: ParsingReference | Date, option?: ParsingOption) {
        this.text = text;
        this.reference = new ReferenceWithTimezone(refDate);
        this.option = option ?? {};

        this.refDate = this.reference.instant;
    }

    createParsingComponents(components?: { [c in Component]?: number } | ParsingComponents): ParsingComponents {
        if (components instanceof ParsingComponents) {
            return components;
        }

        return new ParsingComponents(this.reference, components);
    }

    createParsingResult(
        index: number,
        textOrEndIndex: number | string,
        startComponents?: { [c in Component]?: number } | ParsingComponents,
        endComponents?: { [c in Component]?: number } | ParsingComponents
    ): ParsingResult {
        const text = typeof textOrEndIndex === "string" ? textOrEndIndex : this.text.substring(index, textOrEndIndex);

        const start = startComponents ? this.createParsingComponents(startComponents) : null;
        const end = endComponents ? this.createParsingComponents(endComponents) : null;

        return new ParsingResult(this.reference, index, text, start, end);
    }

    debug(block: AsyncDebugBlock): void {
        if (this.option.debug) {
            if (this.option.debug instanceof Function) {
                this.option.debug(block);
            } else {
                const handler: DebugHandler = <DebugHandler>this.option.debug;
                handler.debug(block);
            }
        }
    }
}
