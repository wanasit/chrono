import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide Indonesian connecting phases
 * - 2020-02-13 [sampai] 2020-02-15
 * - Senin [-] Jumat
 */
export default class IDMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(?:-|–|s\.d\.?|s\/d|sampai(?:\s+dengan)?|hingga)\s*$/i;
    }
}
