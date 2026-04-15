import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { Meridiem } from "../../../types";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { implySimilarTime } from "../../../utils/dates";

// bu\u1ed5i s\u00e1ng  |  bu\u1ed5i tr\u01b0a  |  bu\u1ed5i chi\u1ec1u  |  bu\u1ed5i t\u1ed1i  |  n\u1eeda \u0111\u00eam
const PATTERN =
    /\b(bu\u1ed5i\s*)?(s\u00e1ng s\u1edbm|s\u00e1ng|tr\u01b0a|chi\u1ec1u|t\u1ed1i|\u0111\u00eam|n\u1eeda \u0111\u00eam|b\u00ecnh minh)(?=\W|$)/i;

export default class VICasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const component = context.createParsingComponents();
        implySimilarTime(component, context.refDate);
        return VICasualTimeParser.extractTimeComponents(component, match[2].toLowerCase());
    }

    static extractTimeComponents(component: ParsingComponents, keyword: string): ParsingComponents {
        switch (keyword) {
            case "b\u00ecnh minh":
            case "s\u00e1ng s\u1edbm":
                component.imply("hour", 6);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.AM);
                break;
            case "s\u00e1ng":
                component.imply("hour", 9);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.AM);
                break;
            case "tr\u01b0a":
                component.imply("hour", 12);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.PM); // noon = 12:00 PM in chrono's 12-hour convention
                break;
            case "chi\u1ec1u":
                component.imply("hour", 15);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.PM);
                break;
            case "t\u1ed1i":
                component.imply("hour", 19);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.PM);
                break;
            case "\u0111\u00eam":
                component.imply("hour", 22);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.PM);
                break;
            case "n\u1eeda \u0111\u00eam":
                component.imply("hour", 0);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.AM);
                break;
        }
        return component;
    }
}
