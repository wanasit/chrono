import { Filter } from "../../../common/abstractRefiners";
import { ParsingResult } from "../../../results";

export default class ENUnlikelyFormatFilter extends Filter {
    constructor() {
        super();
    }

    isValid(context, result: ParsingResult): boolean {
        const text = result.text.trim();

        // If the result is consists of the whole text (e.g. "2024", "May", etc),
        // then it is unlikely to be a date.
        if (text === context.text.trim()) {
            return true;
        }

        // In English, the word "may" is a month name, but it is also a modal verb.
        // Check if the text before "may" follows some allowed patterns.
        if (text.toLowerCase() === "may") {
            const textBefore = context.text.substring(0, result.index).trim();
            if (!textBefore.match(/\b(in)$/i)) {
                context.debug(() => {
                    console.log(`Removing unlikely result: ${result}`);
                });

                return false;
            }
        }

        // In English, "the second" could refer to the ordinal number or timeunit.
        if (text.toLowerCase().endsWith("the second")) {
            const textAfter = context.text.substring(result.index + result.text.length).trim();
            if (textAfter.length > 0) {
                context.debug(() => {
                    console.log(`Removing unlikely result: ${result}`);
                });
            }
            return false;
        }

        return true;
    }
}
