import { ParsingContext, Refiner } from "../../../chrono";
import { ParsingResult } from "../../../results";

/**
 * Persian strict mode refiner
 * Removes standalone time words and incomplete expressions in strict mode
 */
export default class FAStrictModeRefiner implements Refiner {
    refine(_context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        // List of words that should not be parsed standalone in strict mode
        const standaloneTimeWords = ["صبح", "ظهر", "بعدازظهر", "بعد‌از‌ظهر", "عصر", "شب", "روز بعد", "بعد از", "دیگر"];

        return results.filter((result) => {
            const text = result.text.trim();

            // Remove standalone time words in strict mode
            if (standaloneTimeWords.includes(text)) {
                return false;
            }

            // Also check for relative date expressions that are too vague
            if (result.start.tags().has("result/relativeDate")) {
                if (text === "روز بعد" || text === "بعد از" || text === "دیگر") {
                    return false;
                }
            }

            return true;
        });
    }
}
