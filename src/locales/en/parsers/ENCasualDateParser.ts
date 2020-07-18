import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, implySimilarTime } from "../../../utils/dayjs";

export default class ENCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(now|today|tonight|tomorrow|tmr|yesterday|last\s*night)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "now":
                assignSimilarDate(component, targetDate);
                component.assign("hour", targetDate.hour());
                component.assign("minute", targetDate.minute());
                component.assign("second", targetDate.second());
                component.assign("millisecond", targetDate.millisecond());
                break;

            case "today":
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;

            case "tonight":
                component.imply("hour", 22);
                component.imply("meridiem", Meridiem.PM);
                assignSimilarDate(component, targetDate);
                break;

            case "tomorrow":
            case "tmr":
                // Check not "Tomorrow" on late night
                if (targetDate.hour() > 1) {
                    targetDate = targetDate.add(1, "day");
                    assignSimilarDate(component, targetDate);
                    implySimilarTime(component, targetDate);
                } else {
                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 12);
                    component.imply("minute", 0);
                    component.imply("second", 0);
                }
                break;

            case "yesterday":
                targetDate = targetDate.add(-1, "day");
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;

            default:
                if (lowerText.match(/last\s*night/)) {
                    if (targetDate.hour() > 6) {
                        targetDate = targetDate.add(-1, "day");
                    }

                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 0);
                }

                break;
        }

        return component;
    }
}
