import { ParsingContext, Refiner } from "../../../chrono";
import { ParsingResult } from "../../../results";

/**
 * Persian strict mode refiner
 * Aggressively removes standalone time words and vague expressions in strict mode
 */
export default class FAStrictModeRefiner implements Refiner {
    refine(_context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        return results.filter((result) => {
            const text = result.text.trim();
            const tags = result.start.tags();

            // Block these exact expressions completely in strict mode
            const forbiddenTexts = [
                "صبح",
                "ظهر",
                "بعدازظهر",
                "بعد‌از‌ظهر",
                "عصر",
                "شب",
                "روز بعد",
                "بعد از",
                "دیگر",
                "نیمه‌شب",
                "نیمه شب",
            ];

            // Exact text match blocking
            if (forbiddenTexts.includes(text)) {
                return false;
            }

            // Block ALL casual time parser results in strict mode
            if (tags.has("parser/FACasualTimeParser")) {
                return false;
            }

            // Block short or vague relative date expressions
            if (tags.has("result/relativeDate")) {
                if (text.length <= 8 || forbiddenTexts.includes(text)) {
                    return false;
                }
            }

            // Block vague results from a relative date parser
            if (tags.has("parser/FARelativeDateFormatParser")) {
                if (text.length <= 6 || forbiddenTexts.includes(text)) {
                    return false;
                }
            }

            return true;
        });
    }
}
