/*
  
*/

import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

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
}
