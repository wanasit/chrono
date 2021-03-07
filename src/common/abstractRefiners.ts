import { ParsingContext, Refiner } from "../chrono";
import { ParsingResult } from "../results";

/**
 * A special type of {@link Refiner} to filter the results
 */
export abstract class Filter implements Refiner {
    abstract isValid(context: ParsingContext, result: ParsingResult): boolean;

    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        return results.filter((r) => this.isValid(context, r));
    }
}

/**
 * A special type of {@link Refiner} to merge consecutive results
 */
export abstract class MergingRefiner implements Refiner {
    abstract shouldMergeResults(
        textBetween: string,
        currentResult: ParsingResult,
        nextResult: ParsingResult,
        context: ParsingContext
    ): boolean;

    abstract mergeResults(
        textBetween: string,
        currentResult: ParsingResult,
        nextResult: ParsingResult,
        context: ParsingContext
    ): ParsingResult;

    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        if (results.length < 2) {
            return results;
        }

        const mergedResults: ParsingResult[] = [];
        let curResult = results[0];
        let nextResult = null;

        for (let i = 1; i < results.length; i++) {
            nextResult = results[i];

            const textBetween = context.text.substring(curResult.index + curResult.text.length, nextResult.index);
            if (!this.shouldMergeResults(textBetween, curResult, nextResult, context)) {
                mergedResults.push(curResult);
                curResult = nextResult;
            } else {
                const left = curResult;
                const right = nextResult;
                const mergedResult = this.mergeResults(textBetween, left, right, context);
                context.debug(() => {
                    console.log(`${this.constructor.name} merged ${left} and ${right} into ${mergedResult}`);
                });

                curResult = mergedResult;
            }
        }

        if (curResult != null) {
            mergedResults.push(curResult);
        }

        return mergedResults;
    }
}
