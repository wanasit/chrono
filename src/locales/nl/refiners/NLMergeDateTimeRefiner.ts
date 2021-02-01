import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 * This implementation should provide English connecting phases
 * - 2020-02-13 [at] 6pm
 * - Tomorrow [after] 7am
 */
export default class NLMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return new RegExp("^\\s*(om|na|voor|in de|,|-)?\\s*$");
    }
}
