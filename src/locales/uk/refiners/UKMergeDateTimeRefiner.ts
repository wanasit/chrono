import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see. AbstractMergeDateTimeRefiner).
 * This implementation should provide Ukrainian connecting phases
 * - 2020-02-13 [в/у/о] 6:00
 * - Завтра [,] 7:00
 */
export default class UKMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return new RegExp(`^\\s*(T|в|у|о|,|-)?\\s*$`);
    }
}
