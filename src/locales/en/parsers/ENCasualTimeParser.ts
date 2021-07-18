import { ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import dayjs from "dayjs";
import { assignTheNextDay } from "../../../utils/dayjs";

const PATTERN = /(?:this)?\s{0,3}(morning|afternoon|evening|night|midnight|noon)(?=\W|$)/i;

export default class ENCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const targetDate = dayjs(context.refDate);
        const component = context.createParsingComponents();

        switch (match[1].toLowerCase()) {
            case "afternoon":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 15);
                break;

            case "evening":
            case "night":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 20);
                break;

            case "midnight":
                assignTheNextDay(component, targetDate);
                component.imply("hour", 0);
                component.imply("minute", 0);
                component.imply("second", 0);
                break;

            case "morning":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 6);
                break;

            case "noon":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 12);
                break;
        }

        return component;
    }
}
