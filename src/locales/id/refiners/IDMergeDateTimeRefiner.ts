import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 * This implementation should provide Indonesian connecting phases
 * - Besok [pukul] 10.00
 * - 17 Agustus 1945 [,] 10.00
 */
export default class IDMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return /^\s*(?:pada|,|-|T)?\s*$/i;
    }
}
