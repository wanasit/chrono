import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingComponents, ParsingResult, ReferenceWithTimezone } from "../../../results";
import { parseDuration } from "../constants";
import { reverseDuration } from "../../../calculation/duration";

function hasImpliedEarlierReferenceDate(result: ParsingResult): boolean {
    return result.text.match(/\s+(prima|da)$/i) != null;
}

function hasImpliedLaterReferenceDate(result: ParsingResult): boolean {
    return result.text.match(/\s+(dopo|dal?)$/i) != null;
}

/**
 * Merges a relative data/time that follow by an absolute date.
 * - [2 settimane prima] [2020-02-13]
 * - [2 giorni dopo] [venerdì prossimo]
 */
export default class ITMergeRelativeFollowByDateRefiner extends MergingRefiner {
    patternBetween(): RegExp {
        return /^\s*$/i;
    }

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        // Dates need to be next to each other to get merged
        if (!textBetween.match(this.patternBetween())) {
            return false;
        }

        // Check if any relative tokens were swallowed by the first date.
        // E.g. [<relative_date1> da] [<date2>]
        if (!hasImpliedEarlierReferenceDate(currentResult) && !hasImpliedLaterReferenceDate(currentResult)) {
            return false;
        }

        // make sure that <date2> implies an absolute date
        return !!nextResult.start.get("day") && !!nextResult.start.get("month") && !!nextResult.start.get("year");
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult {
        let duration = parseDuration(currentResult.text);
        if (hasImpliedEarlierReferenceDate(currentResult)) {
            duration = reverseDuration(duration);
        }

        const components = ParsingComponents.createRelativeFromReference(
            ReferenceWithTimezone.fromDate(nextResult.start.date()),
            duration
        );

        return new ParsingResult(
            nextResult.reference,
            currentResult.index,
            `${currentResult.text}${textBetween}${nextResult.text}`,
            components
        );
    }
}
