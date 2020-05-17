/*

*/


import {MergingRefiner} from "../abstractRefiners";
import {ParsingResult} from "../../results";
import {mergeDateTimeResult} from "../../calculation/mergingCalculation";


export default abstract class ENMergeDateTimeRefiner extends MergingRefiner {

    abstract patternBetween: () => RegExp

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        return (currentResult.start.isOnlyDate() && nextResult.start.isOnlyTime())
            && textBetween.match(this.patternBetween()) != null;
    }

    mergeResults(textBetween: string, dateResult: ParsingResult, timeResult: ParsingResult): ParsingResult {
        return mergeDateTimeResult(textBetween, dateResult, timeResult);
    }
}

