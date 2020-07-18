import { Parser, ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, assignSimilarTime, assignTheNextDay, implySimilarTime } from "../../../utils/dayjs";

export default class FRCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(maintenant|aujourd'hui|demain|hier|cette\s*nuit|la\s*veille)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "maintenant":
                assignSimilarDate(component, targetDate);
                assignSimilarTime(component, targetDate);
                break;

            case "aujourd'hui":
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;

            case "demain":
                assignTheNextDay(component, targetDate);
                break;

            case "hier":
                targetDate = targetDate.add(-1, "day");
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;

            default:
                if (lowerText.match(/cette\s*nuit/)) {
                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 22);
                    component.imply("meridiem", Meridiem.PM);
                } else if (lowerText.match(/la\s*veille/)) {
                    targetDate = targetDate.add(-1, "day");
                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 0);
                }
        }

        return component;
    }
}
