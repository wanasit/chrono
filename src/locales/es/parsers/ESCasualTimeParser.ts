import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../types";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, implySimilarTime } from "../../../utils/dates";

export default class ESCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return /(?:esta\s*)?(mañana|tarde|medianoche|mediodia|mediodía|noche)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const targetDate = context.refDate;
        const component = context.createParsingComponents();
        switch (match[1].toLowerCase()) {
            case "tarde":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 15);
                break;

            case "noche":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 22);
                break;

            case "mañana":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 6);
                break;

            case "medianoche":
                const nextDay = new Date(targetDate.getTime());
                nextDay.setDate(nextDay.getDate() + 1);
                assignSimilarDate(component, nextDay);
                implySimilarTime(component, nextDay);
                component.imply("hour", 0);
                component.imply("minute", 0);
                component.imply("second", 0);
                break;

            case "mediodia":
            case "mediodía":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 12);
                break;
        }

        return component;
    }
}
