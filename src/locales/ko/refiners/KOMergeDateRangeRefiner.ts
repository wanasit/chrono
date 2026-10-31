import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging date ranges: "11월 1일부터 11월 3일까지" (from Nov 1 to Nov 3), "월요일~금요일" (Monday–Friday).
 * 부터 = from, 까지 = until. 까지 comes after the second date and is not part of the text between.
 */
export default class KOMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(부터|~|～|-|–)\s*$/i;
    }
}
