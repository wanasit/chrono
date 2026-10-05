/*

*/

import { MergingRefiner } from "../abstractRefiners";
import { ParsingResult } from "../../results";
import { mergeDateTimeResult } from "../../calculation/mergingCalculation";

export default abstract class AbstractMergeDateTimeRefiner extends MergingRefiner {
    abstract patternBetween(): RegExp;

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        const isDateThenTime = currentResult.start.isOnlyDate() && nextResult.start.isOnlyTime();
        const isTimeThenDate = currentResult.start.isOnlyTime() && nextResult.start.isOnlyDate();

        // A bare ":" between a time-only result and a date-only result is only a real connector
        // in the "date:time" direction (e.g. "05/31/2024:14:15"). In the reverse direction, a lone
        // number like "24" immediately followed by ":" is far more likely to be a stray label or
        // count (e.g. "24: July 23, 2026") than someone writing a time using a colon with no minutes,
        // so don't let it swallow the date that follows.
        if (isTimeThenDate && textBetween.trim() === ":") {
            return false;
        }

        return (isDateThenTime || isTimeThenDate) && textBetween.match(this.patternBetween()) != null;
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult {
        const result = currentResult.start.isOnlyDate()
            ? mergeDateTimeResult(currentResult, nextResult)
            : mergeDateTimeResult(nextResult, currentResult);

        result.index = currentResult.index;
        result.text = currentResult.text + textBetween + nextResult.text;
        return result;
    }
}
