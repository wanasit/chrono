import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 */
export default class ESMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return new RegExp("^\\s*(?:,|de|aslas|a)?\\s*$");
    }
}
