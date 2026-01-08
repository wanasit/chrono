import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import * as references from "../../../common/casualReferences";

const PATTERN = /(الان|اکنون|هم‌اکنون|امروز|امشب|دیروز|فردا|پس‌فردا|پسفردا|دیشب)/i;

export default class FACasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(_context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const lowerText = match[0].toLowerCase();
        let component = context.createParsingComponents();

        switch (lowerText) {
            case "الان":
            case "اکنون":
            case "هم‌اکنون":
                component = references.now(context.reference);
                break;
            case "امروز":
                component = references.today(context.reference);
                break;
            case "دیروز":
                component = references.yesterday(context.reference);
                break;
            case "فردا":
                component = references.tomorrow(context.reference);
                break;
            case "امشب":
                component = references.tonight(context.reference);
                break;
            case "پس‌فردا":
            case "پسفردا":
                component = references.theDayAfter(context.reference, 2);
                break;
            case "دیشب":
                const targetDate = context.reference.getDateWithAdjustedTimezone();
                const previousDay = new Date(targetDate.getTime());
                previousDay.setDate(previousDay.getDate() - 1);
                component.assign("year", previousDay.getFullYear());
                component.assign("month", previousDay.getMonth() + 1);
                component.assign("day", previousDay.getDate());
                component.assign("hour", 22);
                component.assign("minute", 0);
                break;
        }

        component.addTag("parser/FACasualDateParser");
        return component;
    }
}
