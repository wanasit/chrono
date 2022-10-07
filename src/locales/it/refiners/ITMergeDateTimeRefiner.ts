import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 * This implementation should provide English connecting phases
 * - 2020-02-13 [at] 6pm
 * - Tomorrow [after] 7am
 */
export default class ITMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return new RegExp("^\\s*(alle|dopo\\s*l\\.*?|prima\\sdel\\.*|dal\\.*|di|il|,|-)?\\s*$");
    }
}
