import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = /(?:last\s+day|end)\s+of\s+(?:the\s+)?month(?=\W|$)/i;

export default class ENEndOfCurrentMonthParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext): ParsingComponents {
        const targetDate = context.reference.getDateWithAdjustedTimezone();
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth() + 1;
        const lastDay = new Date(year, month, 0).getDate();
        const components = context.createParsingComponents();

        components.assign("day", lastDay);
        components.assign("month", month);
        components.assign("year", year);
        components.addTag("parser/ENEndOfCurrentMonthParser");
        return components;
    }
}
