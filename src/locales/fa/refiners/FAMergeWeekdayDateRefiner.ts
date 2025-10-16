import { ParsingContext, Refiner } from "../../../chrono";
import { ParsingResult } from "../../../results";

/**
 * Persian weekday and date merger refiner
 * Merges weekday expressions with adjacent date expressions
 * Example: "دوشنبه، 10 ژانویه" -> single merged result
 */
export default class FAMergeWeekdayDateRefiner implements Refiner {
    refine(_context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        if (results.length < 2) {
            return results;
        }

        const mergedResults: ParsingResult[] = [];
        let i = 0;

        while (i < results.length) {
            const currentResult = results[i];
            const nextResult = i + 1 < results.length ? results[i + 1] : null;

            if (this.shouldMergeWithNext(currentResult, nextResult)) {
                const mergedResult = this.mergeResults(currentResult, nextResult!);
                mergedResults.push(mergedResult);
                i += 2; // Skip both results as they've been merged
            } else {
                mergedResults.push(currentResult);
                i += 1;
            }
        }

        return mergedResults;
    }

    private shouldMergeWithNext(current: ParsingResult, next: ParsingResult | null): boolean {
        if (!next) return false;

        // Check if the current is weekday and next is date
        const hasWeekday = current.start.get("weekday") !== null;
        const hasDate = next.start.get("day") !== null && next.start.get("month") !== null;

        // Check if they are adjacent (with possible comma/punctuation)
        const gap = next.index - (current.index + current.text.length);
        const isAdjacent = gap <= 2; // Allow for comma and space

        return hasWeekday && hasDate && isAdjacent;
    }

    private mergeResults(weekdayResult: ParsingResult, dateResult: ParsingResult): ParsingResult {
        const mergedText = weekdayResult.text + " " + dateResult.text.trim();
        const mergedResult = new ParsingResult(weekdayResult.reference, weekdayResult.index, mergedText);

        // Combine the components
        mergedResult.start = dateResult.start.clone();

        // Keep the weekday from the first result
        if (weekdayResult.start.get("weekday") !== null) {
            mergedResult.start.assign("weekday", weekdayResult.start.get("weekday"));
        }

        // If there's an end component, copy it
        if (dateResult.end) {
            mergedResult.end = dateResult.end.clone();
        }

        return mergedResult;
    }
}
