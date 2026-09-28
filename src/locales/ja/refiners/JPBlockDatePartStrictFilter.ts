import { Filter } from "../../../common/abstractRefiners";
import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";

export default class JPBlockDatePartStrictFilter extends Filter {
    isValid(context: ParsingContext, result: ParsingResult): boolean {
        if (result.tags().has("result/JPDayPart")) {
            if (!result.start.isCertain("day")) {
                return false;
            }
        }

        return true;
    }
}
