/*
  
*/

import { MergingRefiner } from "../abstractRefiners";
import { ParsingResult } from "../../results";

/**
 * Merge weekday component into more completed data
 * - [Sunday] [12/7/2014] => [Sunday 12/7/2014]
 * - [Tuesday], [January 13, 2012] => [Sunday 12/7/2014]
 */
export default class MergeWeekdayComponentRefiner extends MergingRefiner {
    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult {
        const newResult = nextResult.clone();
        newResult.index = currentResult.index;
        newResult.text = currentResult.text + textBetween + newResult.text;

        newResult.start.assign("weekday", currentResult.start.get("weekday"));
        if (newResult.end) {
            newResult.end.assign("weekday", currentResult.start.get("weekday"));
        }

        return newResult;
    }

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        const weekdayThenNormalDate =
            currentResult.start.isOnlyWeekdayComponent() &&
            !currentResult.start.isCertain("hour") &&
            nextResult.start.isCertain("day");
        return weekdayThenNormalDate && textBetween.match(/^,?\s*$/) != null;
    }
}
