import {ParsingContext, Refiner} from "../chrono";
import {ParsingResult} from "../results";

export abstract class Filter implements Refiner {

    abstract isValid(context: ParsingContext, result: ParsingResult): boolean;

    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        return results.filter(r => this.isValid(context, r));
    }
}

export abstract class MergingRefiner implements Refiner {

    abstract shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean;

    abstract mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult;

    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {

        if (results.length < 2) {
            return results;
        }

        const mergedResults = [];
        let curResult = results[0];
        let nextResult = null;

        for (let i=1; i<results.length; i++){
            nextResult = results[i];

            const textBetween = context.text.substring(curResult.index + curResult.text.length, nextResult.index);
            if (this.shouldMergeResults(textBetween, curResult, nextResult)) {
                const left = curResult;
                const right = nextResult;
                const mergedResult = this.mergeResults(textBetween, left, right);

                context.debug(() => {
                    console.log(`${this.constructor.name} merged ${left} and ${right} into ${mergedResult}`)
                    console.log(mergedResult)
                })

                curResult = mergedResult;
                nextResult = null;
            }

            mergedResults.push(curResult);
        }

        if (nextResult != null) {
            mergedResults.push(nextResult);
        }

        return mergedResults;
    }
}