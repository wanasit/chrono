/*
  
*/

import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";
import { ParsingComponents, ParsingResult } from "../../../results";
import { Component } from "../../../types";
import { END_OF_PERIOD_TAG } from "./ENEndOfPeriodRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide English connecting phases
 * - 2020-02-13 [to] 2020-02-13
 * - Wednesday [-] Friday
 */
export default class ENMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(to|-|–|until|through|till)\s*$/i;
    }

    mergeResults(textBetween, fromResult, toResult): ParsingResult {
        const result = super.mergeResults(textBetween, fromResult, toResult);
        // The merge can change the year of "end of February" ("to March 10, 2028"), and the last day follows it
        for (const component of [result.start, result.end]) {
            if (component.tags().has(END_OF_PERIOD_TAG) && !component.isCertain("year")) {
                component.assign("day", new Date(component.get("year"), component.get("month"), 0).getDate());
            }
        }
        return result;
    }

    // The last day of "end of August" belongs to August, so "from July to end of August" starts on July 1
    protected shouldCopyComponent(key: Component, source: ParsingComponents, target: ParsingComponents): boolean {
        return (
            super.shouldCopyComponent(key, source, target) && !(key === "day" && source.tags().has(END_OF_PERIOD_TAG))
        );
    }
}
