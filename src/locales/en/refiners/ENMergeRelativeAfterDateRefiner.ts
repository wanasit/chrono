import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingComponents, ParsingResult, ReferenceWithTimezone } from "../../../results";
import { parseTimeUnits } from "../constants";
import { reverseTimeUnits } from "../../../utils/timeunits";

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
        let timeUnits = parseTimeUnits(nextResult.text);
        if (IsNegativeFollowingReference(nextResult)) {
            timeUnits = reverseTimeUnits(timeUnits);
        }

        const components = ParsingComponents.createRelativeFromReference(
            new ReferenceWithTimezone(currentResult.start.date()),
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
