import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, implySimilarTime } from "../../../utils/dates";
import * as references from "../../../common/casualReferences";
import { addDuration } from "../../../calculation/duration";

const PATTERN = /\b(hôm nay|hôm qua|ngày mai|ngày kia|bây giờ|lúc này)(?=\W|$)/i;

export default class VICasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp { return PATTERN; }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const targetDate = context.reference.getDateWithAdjustedTimezone();
        const keyword = match[1].toLowerCase();
        const component = context.createParsingComponents();

        switch (keyword) {
            case "bây giờ":
            case "lúc này":
                return references.now(context.reference);
            case "hôm nay":
                return references.today(context.reference);
            case "hôm qua":
                assignSimilarDate(component, addDuration(targetDate, { day: -1 }));
                implySimilarTime(component, targetDate);
                break;
            case "ngày mai":
                assignSimilarDate(component, addDuration(targetDate, { day: 1 }));
                implySimilarTime(component, targetDate);
                break;
            case "ngày kia":
                assignSimilarDate(component, addDuration(targetDate, { day: 2 }));
                implySimilarTime(component, targetDate);
                break;
        }
        return component;
    }
}
