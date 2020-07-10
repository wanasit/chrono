/*

*/


import {MergingRefiner} from "../abstractRefiners";
import {ParsingResult} from "../../results";
import {mergeDateTimeResult} from "../../calculation/mergingCalculation";


export default abstract class ENMergeDateTimeRefiner extends MergingRefiner {

    abstract patternBetween(): RegExp

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        return (
                (currentResult.start.isOnlyDate() && nextResult.start.isOnlyTime()) ||
                (nextResult.start.isOnlyDate() && currentResult.start.isOnlyTime())
            )
            && textBetween.match(this.patternBetween()) != null;
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult {

        const result = currentResult.start.isOnlyDate() ?
            mergeDateTimeResult(currentResult, nextResult):
            mergeDateTimeResult(nextResult, currentResult);

        result.index = currentResult.index;
        result.text = currentResult.text + textBetween + nextResult.text;
        return result;
    }
}

