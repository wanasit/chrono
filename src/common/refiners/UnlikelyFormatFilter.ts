import {Filter} from "../abstractRefiners";
import {ParsingResult} from "../../results";

export default class UnlikelyFormatFilter extends Filter {

    isValid(context, result: ParsingResult): boolean {

        if (result.text.replace(' ','').match(/^\d*(\.\d*)?$/)) {
            context.debug(() => {
                console.log(`Removing unlikely result '${result.text}'`)
            })

            return false;
        }

        if (!result.start.isValidDate()) {
            context.debug(() => {
                console.log(`Removing invalid result: ${result} (${result.start})`)
            });

            return false;
        }

        if (result.end && !result.end.isValidDate()) {
            context.debug(() => {
                console.log(`Removing invalid result: ${result} (${result.end})`)
            });

            return false;
        }

        return true;
    }
}