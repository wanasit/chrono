import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

const PATTERN = /(?:last\s+day|end)\s+of\s+(?:the\s+)?(this|last|past|next)\s+(week|month|year)(?=\W|$)/i;

const MODIFIER_GROUP = 1;
const PERIOD_GROUP = 2;

export default class ENEndOfRelativePeriodParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const modifier = match[MODIFIER_GROUP].toLowerCase();
        const period = match[PERIOD_GROUP].toLowerCase();
        const offset = modifier === "next" ? 1 : modifier === "last" || modifier === "past" ? -1 : 0;
        const referenceDate = context.reference.getDateWithAdjustedTimezone();
        let targetDate: Date;

        if (period === "week") {
            targetDate = new Date(referenceDate.getTime());
            targetDate.setDate(referenceDate.getDate() + (6 - referenceDate.getDay()) + offset * 7);
        } else if (period === "month") {
            targetDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + offset + 1, 0);
        } else {
            targetDate = new Date(referenceDate.getFullYear() + offset, 11, 31);
        }

        const components = context.createParsingComponents();
        components.assign("day", targetDate.getDate());
        components.assign("month", targetDate.getMonth() + 1);
        components.assign("year", targetDate.getFullYear());
        components.addTag("parser/ENEndOfRelativePeriodParser");
        return components;
    }
}
