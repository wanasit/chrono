import { Filter } from "../../../common/abstractRefiners";
import { ParsingResult } from "../../../results";

export default class ITUnlikelyFormatFilter extends Filter {
    constructor() {
        super();
    }

    isValid(context, result: ParsingResult): boolean {
        const text = result.text.trim();

        // If the result is consists of the whole text (e.g. "2024", "Maggio", etc),
        // then it is unlikely to be a date.
        if (text === context.text.trim()) {
            return true;
        }

        // In Italian, "secondo" could refer to the ordinal number or timeunit.
        if (text.toLowerCase().endsWith("il secondo") || text.toLowerCase() === "secondo") {
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
