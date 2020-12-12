import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignTheNextDay } from "../../../utils/dayjs";
import dayjs from "dayjs";

export default class PTCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return /(?:esta\s*)?(manha|manhã|tarde|meia-noite|meio-dia|noite)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const targetDate = dayjs(context.refDate);
        const component = context.createParsingComponents();
        switch (match[1].toLowerCase()) {
            case "tarde":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 15);
                break;

            case "noite":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 22);
                break;

            case "manha":
            case "manhã":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 6);
                break;

            case "meia-noite":
                assignTheNextDay(component, targetDate);
                component.imply("hour", 0);
                component.imply("minute", 0);
                component.imply("second", 0);
                break;

            case "meio-dia":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 12);
                break;
        }

        return component;
    }
}
