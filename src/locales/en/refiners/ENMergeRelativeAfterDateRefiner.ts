import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingComponents, ParsingResult, ReferenceWithTimezone } from "../../../results";
import { parseDuration } from "../constants";
import { reverseDuration } from "../../../calculation/duration";

function IsPositiveFollowingReference(result: ParsingResult): boolean {
    return result.text.match(/^[+-]/i) != null;
}

function IsNegativeFollowingReference(result: ParsingResult): boolean {
    return result.text.match(/^-/i) != null;
}

/**
 * Merges a relative data/time that comes after an absolute date.
 * - [2020-02-13] [+2 weeks]
 * - [next tuesday] [+10 days]
 */
export default class ENMergeRelativeAfterDateRefiner extends MergingRefiner {
    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        if (!textBetween.match(/^\s*$/i)) {
            return false;
        }

        return IsPositiveFollowingReference(nextResult) || IsNegativeFollowingReference(nextResult);
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult, context): ParsingResult {
        let timeUnits = parseDuration(nextResult.text);
        if (IsNegativeFollowingReference(nextResult)) {
            timeUnits = reverseDuration(timeUnits);
        }

        const components = ParsingComponents.createRelativeFromReference(
            ReferenceWithTimezone.fromDate(currentResult.start.date()),
            timeUnits
        );

        return new ParsingResult(
            currentResult.reference,
            currentResult.index,
            `${currentResult.text}${textBetween}${nextResult.text}`,
            components
        );
    }
}
