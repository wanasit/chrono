import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingResult } from "../../../results";

export default class JPMergeMonthYearRefiner extends MergingRefiner {
    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        if (!textBetween || textBetween === "の") {
            if (
                currentResult.tags().has("result/relativeDate") &&
                (nextResult.tags().has("result/JPnamedMonth") || nextResult.tags().has("result/JPHoliday"))
            ) {
                const currentHasMonth = currentResult.start.isCertain("month");
                const nextHasYear = nextResult.start.isCertain("year");

                if (!currentHasMonth && !nextHasYear) {
                    return true;
                }
            }
        }

        return false;
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult, context): ParsingResult {
        const components = nextResult.start.clone();
        components.assign("year", currentResult.start.get("year"));
        components.addTag("result/MergeYearMonth");

        return new ParsingResult(
            currentResult.reference,
            currentResult.index,
            `${currentResult.text}${textBetween}${nextResult.text}`,
            components
        );
    }
}
