import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { Meridiem } from "../../../types";

/**
 * Persian casual time expressions parser
 * Handles: صبح (morning), ظهر (noon), بعدازظهر (afternoon), عصر (evening), شب (night)
 * Can optionally have "این" prefix: این صبح (this morning)
 */
const PATTERN = /(?:(این|این‌)\s{0,3})?(صبح|صبح‌ها|ظهر|بعد‌از‌ظهر|بعدازظهر|بعداز ظهر|عصر|شب|شب‌ها|نیمه‌شب|نیمه شب)/i;

export default class FACasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(_context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const targetDate = context.reference.getDateWithAdjustedTimezone();
        const component = context.createParsingComponents();
        const timeKeyword = match[2].toLowerCase();

        switch (timeKeyword) {
            case "صبح":
            case "صبح‌ها":
                // Morning: 6 AM
                component.imply("hour", 6);
                component.imply("minute", 0);
                component.assign("meridiem", Meridiem.AM);
                break;

            case "ظهر":
                // Noon: 12 PM
                component.imply("hour", 12);
                component.imply("minute", 0);
                component.assign("meridiem", Meridiem.PM);
                break;

            case "بعدازظهر":
            case "بعد‌از‌ظهر":
            case "بعداز ظهر":
                // Afternoon: 3 PM
                component.imply("hour", 15);
                component.imply("minute", 0);
                component.assign("meridiem", Meridiem.PM);
                break;

            case "عصر":
                // Evening: 6 PM
                component.imply("hour", 18);
                component.imply("minute", 0);
                component.assign("meridiem", Meridiem.PM);
                break;

            case "شب":
            case "شب‌ها":
                // Night: 10 PM
                component.imply("hour", 22);
                component.imply("minute", 0);
                component.assign("meridiem", Meridiem.PM);
                break;

            case "نیمه‌شب":
            case "نیمه شب":
                // Midnight
                if (targetDate.getHours() > 1) {
                    const nextDay = new Date(targetDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    component.assign("year", nextDay.getFullYear());
                    component.assign("month", nextDay.getMonth() + 1);
                    component.assign("day", nextDay.getDate());
                }
                component.assign("hour", 0);
                component.imply("minute", 0);
                component.assign("meridiem", Meridiem.AM);
                break;
        }

        component.addTag("parser/FACasualTimeParser");
        return component;
    }
}
