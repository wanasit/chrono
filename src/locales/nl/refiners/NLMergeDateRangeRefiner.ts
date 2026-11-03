/*

*/

import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide Dutch connecting phases
 * - 2020-02-13 [tot] 2020-02-13
 * - 2020-02-13 [t/m] 2020-02-13
 * - 2020-02-13 [tot en met] 2020-02-13
 * - Wednesday [-] Friday
 */
export default class NLMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(tot en met|t\/m|tot|-)\s*$/i;
    }
}
