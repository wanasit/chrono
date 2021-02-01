import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import dayjs from "dayjs";
import { assignTheNextDay } from "../../../utils/dayjs";

export default class NLCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return /(?:this)?\s*(namiddag|vanavond|avond|vannacht|middernacht|vanochtend|ochtend|vanmiddag|middag|'s middags|'s avonds|'s ochtends)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const targetDate = dayjs(context.refDate);
        const component = context.createParsingComponents();

        // TODO provide "deze middag, deze avond, deze nacht"
        switch (match[1].toLowerCase()) {
            case "namiddag":
            case "'s namiddags":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 15);
                break;

            case "vanavond":
            case "avond":
            case "'s avonds'":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 20);
                break;

            case "middernacht":
            case "vannacht":
                assignTheNextDay(component, targetDate);
                component.imply("hour", 0);
                component.imply("minute", 0);
                component.imply("second", 0);
                break;

            case "ochtend":
            case "'s ochtends":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 6);
                break;

            case "middag":
            case "'s middags":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 12);
                break;
        }

        return component;
    }
}
