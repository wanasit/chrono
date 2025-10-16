import { ParsingContext, Refiner } from "../../../chrono";
import { ParsingResult } from "../../../results";

/**
 * Persian strict mode refiner
 * Removes standalone time words and incomplete expressions in strict mode
 */
export default class FAStrictModeRefiner implements Refiner {
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        // List of words that should not be parsed standalone in strict mode
        const standaloneTimeWords = ["صبح", "ظهر", "بعدازظهر", "بعد‌از‌ظهر", "عصر", "شب", "روز بعد", "بعد از", "دیگر"];

        return results.filter((result) => {
            const text = result.text.trim();

            // Remove standalone time words in strict mode
            if (standaloneTimeWords.includes(text)) {
                return false;
            }

            return true;
        });
    }
}
