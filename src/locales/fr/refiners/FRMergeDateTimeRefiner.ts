import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 */
export default class FRMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return new RegExp("^\\s*(T|à|a|au|vers|de|,|-)?\\s*$");
    }
}
