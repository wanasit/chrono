import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide Japanese connecting phases
 * - 水曜日[ー]日曜日
 * - 水曜日[から]日曜日
 */
export default class JPMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(から|ー|-|～|~)\s*$/i;
    }
}
