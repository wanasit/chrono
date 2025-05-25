import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingResult } from "../../../results";

/**
 * Merge weekday component into more completed data
 * - [2014/7/12], [(土)] => [2014/7/12 (土)]
 * - [7月12日], [土曜日] => [7月12日 土曜日]
 * The difference between the original MergeWeekdayComponentRefiner and the JP one is the order of date and weekday.
 */
export default class JPMergeWeekdayComponentRefiner extends MergingRefiner {
    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult {
        const newResult = currentResult.clone();
        newResult.text = currentResult.text + textBetween + nextResult.text;

        newResult.start.assign("weekday", nextResult.start.get("weekday"));
        if (newResult.end) {
            newResult.end.assign("weekday", nextResult.start.get("weekday"));
        }

        return newResult;
    }

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        const normalDateThenWeekday =
            currentResult.start.isCertain("day") &&
            nextResult.start.isOnlyWeekdayComponent() &&
            !nextResult.start.isCertain("hour");
        return normalDateThenWeekday && textBetween.match(/^[,、の]?\s*$/) !== null;
    }
}
