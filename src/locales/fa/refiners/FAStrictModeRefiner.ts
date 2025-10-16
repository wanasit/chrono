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

            // Check for standalone time expressions from casual time parser
            if (result.start.tags().has("parser/FACasualTimeParser")) {
                return false;
            }

            // Check for vague relative date expressions
            if (result.start.tags().has("result/relativeDate")) {
                // Filter out vague expressions like "روز بعد", "بعد از", "دیگر"
                if (
                    text === "روز بعد" ||
                    text === "بعد از" ||
                    text === "دیگر" ||
                    text.match(/^(صبح|ظهر|بعدازظهر|عصر|شب)$/)
                ) {
                    return false;
                }
            }

            // Check for results from parsers that should be filtered in strict mode
            const tagsSet = result.start.tags();
            if (tagsSet.has("parser/FARelativeDateFormatParser")) {
                // Be more restrictive with relative date expressions
                if (text.length < 5 || standaloneTimeWords.includes(text)) {
                    return false;
                }
            }

            return true;
        });
    }
}
