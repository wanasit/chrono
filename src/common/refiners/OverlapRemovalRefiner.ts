/*
  
*/

import { ParsingContext, Refiner } from "../../chrono";
import { ParsingResult } from "../../results";

export default class OverlapRemovalRefiner implements Refiner {
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        if (results.length < 2) {
            return results;
        }

        const filteredResults = [];
        let prevResult = results[0];
        for (let i = 1; i < results.length; i++) {
            const result = results[i];
            if (result.index >= prevResult.index + prevResult.text.length) {
                filteredResults.push(prevResult);
                prevResult = result;
                continue;
            }

            // If overlap, compare the length and discard the shorter one
            let kept = null;
            let removed = null;
            if (result.text.length > prevResult.text.length) {
                kept = result;
                removed = prevResult;
            } else {
                kept = prevResult;
                removed = result;
            }
            context.debug(() => {
                console.log(`${this.constructor.name} remove ${removed} by ${kept}`);
            });
            prevResult = kept;
        }

        // The last one
        if (prevResult != null) {
            filteredResults.push(prevResult);
        }

        return filteredResults;
    }
}
