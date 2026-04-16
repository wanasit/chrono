import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { Meridiem } from "../../../types";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { implySimilarTime } from "../../../utils/dates";

export default class FICasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(tänä\s*)?(aamulla|aamuna|aamupäivällä|päivällä|iltapäivällä|illalla|yöllä|keskiyöllä)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const targetDate = context.refDate;
        const timeKeywordPattern = match[2].toLowerCase();
        const component = context.createParsingComponents();
        implySimilarTime(component, targetDate);
        return FICasualTimeParser.extractTimeComponents(component, timeKeywordPattern);
    }

    static extractTimeComponents(component: ParsingComponents, timeKeywordPattern: string): ParsingComponents {
        switch (timeKeywordPattern) {
            case "aamulla":
            case "aamuna":
                component.imply("hour", 6);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.AM);
                break;

            case "aamupäivällä":
                component.imply("hour", 9);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.AM);
                break;

            case "päivällä":
                component.imply("hour", 12);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.AM);
                break;

            case "iltapäivällä":
                component.imply("hour", 15);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.PM);
                break;

            case "illalla":
                component.imply("hour", 18);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.PM);
                break;

            case "yöllä":
                component.imply("hour", 22);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.PM);
                break;

            case "keskiyöllä":
                if (component.get("hour") > 1) {
                    component.addDurationAsImplied({ "day": 1 });
                }

                component.imply("hour", 0);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.AM);
                break;
        }
        return component;
    }
}
