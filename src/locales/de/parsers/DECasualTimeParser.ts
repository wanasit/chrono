import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { Meridiem } from "../../../types";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { implySimilarTime } from "../../../utils/dayjs";
import { addImpliedTimeUnits } from "../../../utils/timeunits";

export default class DECasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(diesen)?\s*(morgen|vormittag|mittags?|nachmittag|abend|nacht|mitternacht)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const targetDate = dayjs(context.refDate);
        const timeKeywordPattern = match[2].toLowerCase();
        const component = context.createParsingComponents();
        implySimilarTime(component, targetDate);
        return DECasualTimeParser.extractTimeComponents(component, timeKeywordPattern);
    }

    static extractTimeComponents(component: ParsingComponents, timeKeywordPattern: string): ParsingComponents {
        switch (timeKeywordPattern) {
            case "morgen":
                component.imply("hour", 6);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.AM);
                break;

            case "vormittag":
                component.imply("hour", 9);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.AM);
                break;

            case "mittag":
            case "mittags":
                component.imply("hour", 12);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.AM);
                break;

            case "nachmittag":
                component.imply("hour", 15);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.PM);
                break;

            case "abend":
                component.imply("hour", 18);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.PM);
                break;

            case "nacht":
                component.imply("hour", 22);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("meridiem", Meridiem.PM);
                break;

            case "mitternacht":
                if (component.get("hour") > 1) {
                    component = addImpliedTimeUnits(component, { "day": 1 });
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
