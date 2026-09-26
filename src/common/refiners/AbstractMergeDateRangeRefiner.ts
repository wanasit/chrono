/*
  
*/

import { ParsingComponents, ParsingResult } from "../../results";
import { Component } from "../../types";
import { MergingRefiner } from "../abstractRefiners";
import { addDuration } from "../../calculation/duration";

export default abstract class AbstractMergeDateRangeRefiner extends MergingRefiner {
    abstract patternBetween(): RegExp;

    /**
     * Whether one side of the range takes a component that only the other side states ("Aug 10 - 15" gives
     * "15" its month).
     */
    protected shouldCopyComponent(key: Component, target: ParsingComponents): boolean {
        return !target.isCertain(key);
    }

    shouldMergeResults(textBetween, currentResult, nextResult): boolean {
        return !currentResult.end && !nextResult.end && textBetween.match(this.patternBetween()) != null;
    }

    mergeResults(textBetween, fromResult, toResult): ParsingResult {
        if (!fromResult.start.isOnlyWeekdayComponent() && !toResult.start.isOnlyWeekdayComponent()) {
            toResult.start.getCertainComponents().forEach((key) => {
                if (this.shouldCopyComponent(key, fromResult.start)) {
                    fromResult.start.imply(key, toResult.start.get(key));
                }
            });

            fromResult.start.getCertainComponents().forEach((key) => {
                if (this.shouldCopyComponent(key, toResult.start)) {
                    toResult.start.imply(key, fromResult.start.get(key));
                }
            });
        }
        if (fromResult.start.date() > toResult.start.date()) {
            let fromDate = fromResult.start.date();
            let toDate = toResult.start.date();

            if (toResult.start.isOnlyWeekdayComponent() && addDuration(toDate, { day: 7 }) > fromDate) {
                toDate = addDuration(toDate, { day: 7 });
                toResult.start.imply("day", toDate.getDate());
                toResult.start.imply("month", toDate.getMonth() + 1);
                toResult.start.imply("year", toDate.getFullYear());
            } else if (fromResult.start.isOnlyWeekdayComponent() && addDuration(fromDate, { day: -7 }) < toDate) {
                fromDate = addDuration(fromDate, { day: -7 });
                fromResult.start.imply("day", fromDate.getDate());
                fromResult.start.imply("month", fromDate.getMonth() + 1);
                fromResult.start.imply("year", fromDate.getFullYear());
            } else if (toResult.start.isDateWithUnknownYear() && addDuration(toDate, { year: 1 }) > fromDate) {
                toDate = addDuration(toDate, { year: 1 });
                toResult.start.imply("year", toDate.getFullYear());
            } else if (fromResult.start.isDateWithUnknownYear() && addDuration(fromDate, { year: -1 }) < toDate) {
                fromDate = addDuration(fromDate, { year: -1 });
                fromResult.start.imply("year", fromDate.getFullYear());
            } else {
                [toResult, fromResult] = [fromResult, toResult];
            }
        }
        const result = fromResult.clone();
        result.start = fromResult.start;
        result.end = toResult.start;
        result.index = Math.min(fromResult.index, toResult.index);
        if (fromResult.index < toResult.index) {
            result.text = fromResult.text + textBetween + toResult.text;
        } else {
            result.text = toResult.text + textBetween + fromResult.text;
        }
        return result;
    }
}
