import { Parser, ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, assignSimilarTime, assignTheNextDay, implySimilarTime } from "../../../utils/dayjs";

export default class PTCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(agora|hoje|amanha|amanhã|ontem)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "agora":
                assignSimilarDate(component, targetDate);
                component.assign("hour", targetDate.hour());
                component.assign("minute", targetDate.minute());
                component.assign("second", targetDate.second());
                component.assign("millisecond", targetDate.millisecond());
                break;

            case "hoje":
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;

            case "amanha":
            case "amanhã":
                assignTheNextDay(component, targetDate);
                break;

            case "ontem":
                targetDate = targetDate.add(-1, "day");
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;
        }

        return component;
    }
}
