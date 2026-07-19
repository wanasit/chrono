import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate } from "../../../utils/dates";
import * as references from "../../../common/casualReferences";

const PATTERN = /(adesso|ora|oggi|stasera|stanotte|domani|dopodomani|ieri|ieri\s*sera|ieri\s*notte)(?=\W|$)/i;

export default class ITCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = context.refDate;
        const lowerText = match[0].toLowerCase();
        let component = context.createParsingComponents();

        switch (lowerText) {
            case "adesso":
            case "ora":
                component = references.now(context.reference);
                break;

            case "oggi":
                component = references.today(context.reference);
                break;

            case "ieri":
                component = references.yesterday(context.reference);
                break;

            case "domani":
                component = references.tomorrow(context.reference);
                break;

            case "stasera":
            case "stanotte":
                component = references.tonight(context.reference);
                break;

            case "dopodomani":
                component = references.theDayAfter(context.reference, 2);
                break;

            default:
                if (lowerText.match(/ieri\s*sera/) || lowerText.match(/ieri\s*notte/)) {
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
        component.addTag("parser/ITCasualDateParser");
        return component;
    }
}
