import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingResult } from "../../../results";
import type { Component } from "../../../types";

export default class JPMergeDayPartRefiner extends MergingRefiner {
    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean {
        if (!textBetween || textBetween === "の") {
            if (nextResult.tags().has("result/JPDayPart")) {
                const currentHasTime = currentResult.start.isCertain("hour");

                if (!currentHasTime) {
                    return true;
                }
            }
        }

        return false;
    }

    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult, context): ParsingResult {
        const components = currentResult.start.clone();

        (["meridiem", "hour", "minute", "second", "millisecond"] as Component[]).forEach((x: Component) => {
            const value = nextResult.start.get(x);
            if (value !== null) {
                if (nextResult.start.isCertain(x)) {
                    components.assign(x, value);
                } else {
                    components.imply(x, value);
                }
            }
        });
        components.addTag("result/MergeDayTime");

        return new ParsingResult(
            currentResult.reference,
            currentResult.index,
            `${currentResult.text}${textBetween}${nextResult.text}`,
            components
        );
    }
}
