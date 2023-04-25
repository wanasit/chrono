import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { Meridiem } from "../../../types";
import { assignSimilarDate, assignTheNextDay } from "../../../utils/dayjs";
import dayjs from "dayjs";

/*
 * Find combined words
 * - morgenochtend
 * - morgenmiddag
 * - morgennamiddag
 * - morgenavond
 * - morgennacht
 * - vanochtend
 * - vanmiddag
 * - vannamiddag
 * - vanavond
 * - vannacht
 * - gisterenochtend
 * - gisterenmiddag
 * - gisterennamiddag
 * - gisterenavond
 * - gisterennacht
 * */

const DATE_GROUP = 1;
const TIME_OF_DAY_GROUP = 2;

export default class NLCasualDateTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(gisteren|morgen|van)(ochtend|middag|namiddag|avond|nacht)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const dateText = match[DATE_GROUP].toLowerCase();
        const timeText = match[TIME_OF_DAY_GROUP].toLowerCase();
        const component = context.createParsingComponents();
        const targetDate = dayjs(context.refDate);

        switch (dateText) {
            case "gisteren":
                assignSimilarDate(component, targetDate.add(-1, "day"));
                break;
            case "van":
                assignSimilarDate(component, targetDate);
                break;
            case "morgen":
                assignTheNextDay(component, targetDate);
                break;
        }

        switch (timeText) {
            case "ochtend":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 6);
                break;
            case "middag":
                component.imply("meridiem", Meridiem.AM);
                component.imply("hour", 12);
                break;
            case "namiddag":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 15);
                break;

            case "avond":
                component.imply("meridiem", Meridiem.PM);
                component.imply("hour", 20);
                break;
        }

        return component;
    }
}
