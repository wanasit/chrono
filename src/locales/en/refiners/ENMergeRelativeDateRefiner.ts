import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingComponents, ParsingResult, ReferenceWithTimezone } from "../../../results";
import { parseTimeUnits } from "../constants";
import { reverseTimeUnits } from "../../../utils/timeunits";

function hasImpliedEarlierReferenceDate(result: ParsingResult): boolean {
    return result.text.match(/\s+(before|from)$/i) != null;
}

function hasImpliedLaterReferenceDate(result: ParsingResult): boolean {
    return result.text.match(/\s+(after|since)$/i) != null;
}

/**
 * Merges an absolute date with a relative date.
 * - 2 weeks before 2020-02-13
 * - 2 days after next Friday
 */
export default class ENMergeRelativeDateRefiner extends MergingRefiner {
    patternBetween(): RegExp {
        return /^\s*$/i;
    }

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        // Dates need to be next to each other to get merged
        if (!textBetween.match(this.patternBetween())) {
            return false;
        }

        // Check if any relative tokens were swallowed by the first date.
        // E.g. [<relative_date1> from] [<date2>]
        if (!hasImpliedEarlierReferenceDate(currentResult) && !hasImpliedLaterReferenceDate(currentResult)) {
            return false;
        }

        // make sure that <date2> implies an absolute date
        return !!nextResult.start.get("day") && !!nextResult.start.get("month") && !!nextResult.start.get("year");
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult {
        let timeUnits = parseTimeUnits(currentResult.text);
        if (hasImpliedEarlierReferenceDate(currentResult)) {
            timeUnits = reverseTimeUnits(timeUnits);
        }

        const components = ParsingComponents.createRelativeFromReference(
            new ReferenceWithTimezone(nextResult.start.date()),
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
