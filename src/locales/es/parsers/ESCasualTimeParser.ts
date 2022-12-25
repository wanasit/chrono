import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignTheNextDay } from "../../../utils/dayjs";
import dayjs from "dayjs";

export default class ESCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return /(?:esta\s*)?(mañana|tarde|medianoche|mediodia|mediodía|noche)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const targetDate = dayjs(context.refDate);
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
                assignTheNextDay(component, targetDate);
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
