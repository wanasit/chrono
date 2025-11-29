/*
  
*/

import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide Italian connecting phases
 * - 2020-02-13 [a] 2020-02-13
 * - Mercoledì [-] Venerdì
 */
export default class ITMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(a|al|-|–|fino\s*a|fino\s*al)\s*$/i;
    }
}
