import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate } from "../../../utils/dates";
import * as references from "../../../common/casualReferences";
import { NUMBER_PATTERN } from "../constants";

const PATTERN =
    /(now|today|tonight|day\s+before\s+yesterday|day\s+after\s+tomorrow|tomorrow|overmorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;

// "2 day before yesterday" and "the day after tomorrow" are relative expressions for the time unit parsers
const COUNT_BEFORE_PATTERN = new RegExp(`${NUMBER_PATTERN}\\s+$`, "i");

export default class ENCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = context.refDate;
        const lowerText = match[0].toLowerCase();
        let component = context.createParsingComponents();

        switch (lowerText) {
            case "now":
                component = references.now(context.reference);
                break;

            case "today":
                component = references.today(context.reference);
                break;

            case "yesterday":
                component = references.yesterday(context.reference);
                break;

            case "tomorrow":
            case "tmr":
            case "tmrw":
                component = references.tomorrow(context.reference);
                break;

            case "tonight":
                component = references.tonight(context.reference);
                break;

            case "overmorrow":
                component = references.theDayAfter(context.reference, 2);
                break;

            default:
                if (lowerText.startsWith("day") && COUNT_BEFORE_PATTERN.test(context.text.substring(0, match.index))) {
                    return null;
                }
                if (lowerText.match(/day\s+before\s+yesterday/)) {
                    component = references.theDayBefore(context.reference, 2);
                } else if (lowerText.match(/day\s+after\s+tomorrow/)) {
                    component = references.theDayAfter(context.reference, 2);
                } else if (lowerText.match(/last\s*night/)) {
                    if (targetDate.getHours() > 6) {
                        const previousDay = new Date(targetDate.getTime());
                        previousDay.setDate(previousDay.getDate() - 1);
                        targetDate = previousDay;
                    }

                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 0);
                }
                break;
        }
        component.addTag("parser/ENCasualDateParser");
        return component;
    }
}
