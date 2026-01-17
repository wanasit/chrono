import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../types";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, implySimilarTime } from "../../../utils/dates";

const DAY_GROUP = 1;
const MOMENT_GROUP = 2;

export default class NLCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return /(deze)?\s*(namiddag|avond|middernacht|ochtend|middag|'s middags|'s avonds|'s ochtends)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const targetDate = context.refDate;
        const component = context.createParsingComponents();

        if (match[DAY_GROUP] === "deze") {
            component.assign("day", context.refDate.getDate());
            component.assign("month", context.refDate.getMonth() + 1);
            component.assign("year", context.refDate.getFullYear());
        }

        switch (match[MOMENT_GROUP].toLowerCase()) {
            case "namiddag":
            case "'s namiddags":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 15);
                component.addTag("casualReference/afternoon");
                break;

            case "avond":
            case "'s avonds'":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 20);
                component.addTag("casualReference/evening");
                break;

            case "middernacht":
                const nextDay = new Date(targetDate.getTime());
                nextDay.setDate(nextDay.getDate() + 1);
                assignSimilarDate(component, nextDay);
                implySimilarTime(component, nextDay);
                component.imply("hour", 0);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.addTag("casualReference/midnight");
                break;

            case "ochtend":
            case "'s ochtends":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 6);
                component.addTag("casualReference/morning");
                break;

            case "middag":
            case "'s middags":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 12);
                component.addTag("casualReference/noon");
                break;
        }

        return component;
    }
}
