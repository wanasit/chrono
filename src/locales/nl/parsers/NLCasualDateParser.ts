import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, assignTheNextDay, implySimilarTime } from "../../../utils/dayjs";

export default class ENCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(nu|vandaag|vanacht|morgen|morgend|gisteren)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "nu":
                assignSimilarDate(component, targetDate);
                component.assign("hour", targetDate.hour());
                component.assign("minute", targetDate.minute());
                component.assign("second", targetDate.second());
                component.assign("millisecond", targetDate.millisecond());
                break;

            case "vandaag":
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;

            case "vanacht":
                component.imply("hour", 22);
                component.imply("meridiem", Meridiem.PM);
                assignSimilarDate(component, targetDate);
                break;

            case "morgen":
            case "morgend":
                assignTheNextDay(component, targetDate);
                break;

            case "gisteren":
                targetDate = targetDate.add(-1, "day");
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;
        }

        return component;
    }
}
