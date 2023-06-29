import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 * This implementation should provide Russian connecting phases
 * - [з|із] 06.09.1989 [до|по] 11.12.1996
 * - [з|із] п'ятниці і до середи
 */
export default class UKMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(і до|і по|до|по|-)\s*$/i;
    }
}
