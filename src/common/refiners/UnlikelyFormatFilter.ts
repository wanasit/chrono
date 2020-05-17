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

        return true;
    }
}