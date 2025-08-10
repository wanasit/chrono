import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, implySimilarTime } from "../../../utils/dates";

const PATTERN = /(?:questo|questa)?\s{0,3}(mattina|pomeriggio|sera|notte|mezzanotte|mezzogiorno)(?=\W|$)/i;

export default class ITCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const targetDate = context.refDate;
        const component = context.createParsingComponents();

        switch (match[1].toLowerCase()) {
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
                const nextDay = new Date(targetDate.getTime());
                nextDay.setDate(nextDay.getDate() + 1);
                assignSimilarDate(component, nextDay);
                implySimilarTime(component, nextDay);
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
