import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 * This implementation should provide Italian connecting phases
 * - 2020-02-13 [alle] 18
 * - Domani [dopo le] 7
 */
export default class ITMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return new RegExp("^\\s*(T|alle?|dopo\\s*le|prima\\s*delle?|,|-|\\.|∙|:)?\\s*$");
    }
}
