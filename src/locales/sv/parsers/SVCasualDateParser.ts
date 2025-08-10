import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, implySimilarTime } from "../../../utils/dates";
import * as references from "../../../common/casualReferences";

const PATTERN = new RegExp(
    `(nu|idag|imorgon|övermorgon|igår|förrgår|i\\s*förrgår)` +
        `(?:\\s*(?:på\\s*)?(morgonen?|förmiddagen?|middagen?|eftermiddagen?|kvällen?|natten?|midnatt))?` +
        `(?=\\W|$)`,
    "i"
);

const DATE_GROUP = 1;
const TIME_GROUP = 2;

export default class SVCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const targetDate = context.refDate;
        const dateKeyword = (match[DATE_GROUP] || "").toLowerCase();
        const timeKeyword = (match[TIME_GROUP] || "").toLowerCase();

        let component = context.createParsingComponents();
        switch (dateKeyword) {
            case "nu":
                component = references.now(context.reference);
                break;

            case "idag":
                component = references.today(context.reference);
                break;

            case "imorgon":
            case "imorn":
                const nextDay = new Date(targetDate.getTime());
                nextDay.setDate(nextDay.getDate() + 1);
                assignSimilarDate(component, nextDay);
                implySimilarTime(component, nextDay);
                break;

            case "igår":
                const previousDay = new Date(targetDate.getTime());
                previousDay.setDate(previousDay.getDate() - 1);
                assignSimilarDate(component, previousDay);
                implySimilarTime(component, previousDay);
                break;

            case "förrgår":
            case "i förrgår":
                const twoDaysAgo = new Date(targetDate.getTime());
                twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
                assignSimilarDate(component, twoDaysAgo);
                implySimilarTime(component, twoDaysAgo);
                break;
        }

        switch (timeKeyword) {
            case "morgon":
            case "morgonen":
                component.imply("hour", 6);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("millisecond", 0);
                break;

            case "förmiddag":
            case "förmiddagen":
                component.imply("hour", 9);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("millisecond", 0);
                break;

            case "middag":
            case "middagen":
                component.imply("hour", 12);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("millisecond", 0);
                break;

            case "eftermiddag":
            case "eftermiddagen":
                component.imply("hour", 15);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("millisecond", 0);
                break;

            case "kväll":
            case "kvällen":
                component.imply("hour", 20);
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("millisecond", 0);
                break;

            case "natt":
            case "natten":
            case "midnatt":
                if (timeKeyword === "midnatt") {
                    component.imply("hour", 0);
                } else {
                    component.imply("hour", 2);
                }
                component.imply("minute", 0);
                component.imply("second", 0);
                component.imply("millisecond", 0);
                break;
        }

        return component;
    }
}
