import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingComponents, ParsingResult, ReferenceWithTimezone } from "../../../results";
import { parseDuration } from "../constants";
import { reverseDuration } from "../../../calculation/duration";

function hasImpliedEarlierReferenceDate(result: ParsingResult): boolean {
    return result.text.match(/\s+(antes|desde)$/i) != null;
}

function hasImpliedLaterReferenceDate(result: ParsingResult): boolean {
    return result.text.match(/\s+(después|desde|hasta)$/i) != null;
}

/**
 * Merges an absolute date with a relative date.
 * - 2 semanas antes del 2020-02-13
 * - 2 días después del próximo viernes
 */
export default class ESMergeRelativeDateRefiner extends MergingRefiner {
    patternBetween(): RegExp {
        return /^\s*$/i;
    }

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        // Dates need to be next to each other to get merged
        if (!textBetween.match(this.patternBetween())) {
            return false;
        }

        // Check if any relative tokens were swallowed by the first date.
        // E.g. [<relative_date1> desde] [<date2>]
        if (!hasImpliedEarlierReferenceDate(currentResult) && !hasImpliedLaterReferenceDate(currentResult)) {
            return false;
        }

        // make sure that <date2> implies an absolute date
        return !!nextResult.start.get("day") && !!nextResult.start.get("month") && !!nextResult.start.get("year");
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult {
        let timeUnits = parseDuration(currentResult.text);
        if (hasImpliedEarlierReferenceDate(currentResult)) {
            timeUnits = reverseDuration(timeUnits);
        }

        const components = ParsingComponents.createRelativeFromReference(
            ReferenceWithTimezone.fromDate(nextResult.start.date()),
            timeUnits
        );

        return new ParsingResult(
            nextResult.reference,
            currentResult.index,
            `${currentResult.text}${textBetween}${nextResult.text}`,
            components
        );
    }
}
