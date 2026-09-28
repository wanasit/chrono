import { ERA_PATTERN } from "../constants";
import { Filter } from "../../../common/abstractRefiners";
import { ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";

const PRECEDING_ERA_REGEX = new RegExp(`(?:${ERA_PATTERN})$`, "i");

export default class JPBlockDoubleYearFilter extends Filter {
    isValid(context: ParsingContext, result: ParsingResult): boolean {
        if (!result.start.isCertain("year")) {
            return true;
        }

        const textBeforeMatch = context.text.substring(0, result.index);

        if (PRECEDING_ERA_REGEX.test(textBeforeMatch)) {
            return false;
        }

        return true;
    }
}
