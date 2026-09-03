import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date-only result and time-only result (see AbstractMergeDateTimeRefiner).
 * Handles Arabic connecting phrases like:
 * - غداً [في تمام] 6:00
 * - 15 يناير [الساعة] 7 مساءً
 * - اليوم [,] 8:00
 */
export default class ARMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return new RegExp(`^\\s*(T|في\\s*تمام|في|الساعة|ساعة|,|-)?\\s*$`, "iu");
    }
}
