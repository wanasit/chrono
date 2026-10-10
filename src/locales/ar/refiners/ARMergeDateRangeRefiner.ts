import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see AbstractMergeDateRangeRefiner)
 * Handles Arabic connecting phrases like:
 * - من 15 يناير [إلى] 20 يناير
 * - من الأحد [وحتى] الخميس
 */
export default class ARMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(إلى|وحتى|حتى|-|–)\s*$/iu;
    }
}
