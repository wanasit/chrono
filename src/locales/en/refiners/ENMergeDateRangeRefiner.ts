/*
  
*/

import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";
import { ParsingComponents } from "../../../results";
import { Component } from "../../../types";

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

    // "end of August" implies its day, which the other side's day must not replace ("July 10 to end of August")
    protected shouldCopyComponent(key: Component, target: ParsingComponents): boolean {
        return (
            super.shouldCopyComponent(key, target) &&
            !(key === "day" && target.tags().has("refiner/ENEndOfPeriodRefiner"))
        );
    }
}
