import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import dayjs from "dayjs";
import { assignTheNextDay } from "../../../utils/dayjs";

const DAY_GROUP = 1;
const MOMENT_GROUP = 2;

export default class ITCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return /(quest\w*?)?\s*(mattina|pomeriggio|sera|notte|mezzanotte|mezzogiorno)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const targetDate = dayjs(context.refDate);
        const component = context.createParsingComponents();
        
        if (match[DAY_GROUP] === "questo" || match[DAY_GROUP] === "questa") {
            component.assign("day", context.refDate.getDate());
            component.assign("month", context.refDate.getMonth() + 1);
            component.assign("year", context.refDate.getFullYear());
        }
   
        switch (match[MOMENT_GROUP].toLowerCase()) {
            case "pomeriggio":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 15);
                break;

            case "sera":
            case "notte":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 20);
                break;

            case "mezzanotte":
                assignTheNextDay(component, targetDate);
                component.imply("hour", 0);
                component.imply("minute", 0);
                component.imply("second", 0);
                break;

            case "mattina":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 6);
                break;

            case "mezzogiorno":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 12);
                break;
        }

        return component;
    }
}
