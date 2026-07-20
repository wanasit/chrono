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
        // A relative-offset date (e.g. "in 3 weeks") already resolves its own day-of-week from
        // the computed date, so stamping the leading weekday onto it would contradict that date
        // (e.g. weekday=Saturday on a date that is a Wednesday). Only merge the weekday into an
        // explicitly stated date, where the user-supplied weekday is meant to label/disambiguate.
        const weekdayThenNormalDate =
            currentResult.start.isOnlyWeekdayComponent() &&
            !currentResult.start.isCertain("hour") &&
            nextResult.start.isCertain("day") &&
            !nextResult.start.tags().has("result/relativeDate");
        return weekdayThenNormalDate && textBetween.match(/^,?\s*$/) != null;
    }
}
