import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { Meridiem } from "../../../types";
import * as references from "../../../common/casualReferences";

/**
 * Persian combined casual expressions parser
 * Handles combinations like: فردا صبح (tomorrow morning), دیروز عصر (yesterday evening)
 */
const PATTERN = /(امروز|دیروز|فردا|پس‌فردا|پسفردا)\s+(صبح|ظهر|بعد‌از‌ظهر|بعدازظهر|بعداز ظهر|عصر|شب)/i;

export default class FACombinedCasualParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(_context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const dateKeyword = match[1].toLowerCase();
        const timeKeyword = match[2].toLowerCase();

        let component = context.createParsingComponents();

        // Get the base date component
        switch (dateKeyword) {
            case "امروز":
                component = references.today(context.reference);
                break;
            case "دیروز":
                component = references.yesterday(context.reference);
                break;
            case "فردا":
                component = references.tomorrow(context.reference);
                break;
            case "پس‌فردا":
            case "پسفردا":
                component = references.theDayAfter(context.reference, 2);
                break;
            default:
                return null;
        }

        // Add the time component
        switch (timeKeyword) {
            case "صبح":
                component.assign("hour", 6);
                component.assign("minute", 0);
                component.assign("meridiem", Meridiem.AM);
                break;

            case "ظهر":
                component.assign("hour", 12);
                component.assign("minute", 0);
                component.assign("meridiem", Meridiem.PM);
                break;

            case "بعدازظهر":
            case "بعد‌از‌ظهر":
            case "بعداز ظهر":
                component.assign("hour", 15);
                component.assign("minute", 0);
                component.assign("meridiem", Meridiem.PM);
                break;

            case "عصر":
                component.assign("hour", 18);
                component.assign("minute", 0);
                component.assign("meridiem", Meridiem.PM);
                break;

            case "شب":
                component.assign("hour", 22);
                component.assign("minute", 0);
                component.assign("meridiem", Meridiem.PM);
                break;

            default:
                return null;
        }

        component.addTag("parser/FACombinedCasualParser");
        return component;
    }
}
