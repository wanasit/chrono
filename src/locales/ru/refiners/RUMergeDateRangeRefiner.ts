import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide Russian connecting phases
 * - c 06.09.1989 [до|по] 11.12.1996
 * - c пятницы и до среды
 */
export default class RUMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(и до|и по|до|по|-)\s*$/i;
    }
}
