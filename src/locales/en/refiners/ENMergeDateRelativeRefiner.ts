import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingComponents, ParsingResult, ReferenceWithTimezone } from "../../../results";
import { parseTimeUnits } from "../constants";
import { PATTERN as AGO_PATTERN } from "../parsers/ENTimeUnitAgoFormatParser";
import { PATTERN as LATER_PATTERN } from "../parsers/ENTimeUnitLaterFormatParser";
import { reverseTimeUnits } from "../../../utils/timeunits";

/**
 * Merges an absolute date with a relative date.
 * - 2 weeks before 2020-02-13
 * - 2 days after next Friday
 */
export default class ENMergeDateRelativeRefiner extends MergingRefiner {
    patternBetween(): RegExp {
        return /^\s+$/i;
    }

    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        return (
            textBetween.match(this.patternBetween()) != null &&
            (currentResult.text.match(AGO_PATTERN) || currentResult.text.match(LATER_PATTERN)) &&
            !!nextResult.start.get("day") &&
            !!nextResult.start.get("month") &&
            !!nextResult.start.get("year")
        );
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult {
        let timeUnits = parseTimeUnits(currentResult.text);
        if (currentResult.text.match(AGO_PATTERN)) {
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
