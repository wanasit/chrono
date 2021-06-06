import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, assignTheNextDay, implySimilarTime } from "../../../utils/dayjs";
import DECasualTimeParser from "./DECasualTimeParser";
import * as references from "../../../common/casualReferences";

const PATTERN = new RegExp(
    `(jetzt|heute|morgen|übermorgen|uebermorgen|gestern|vorgestern|letzte\\s*nacht)` +
        `(?:\\s*(morgen|vormittag|mittags?|nachmittag|abend|nacht|mitternacht))?` +
        `(?=\\W|$)`,
    "i"
);

const DATE_GROUP = 1;
const TIME_GROUP = 2;

export default class DECasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const dateKeyword = (match[DATE_GROUP] || "").toLowerCase();
        const timeKeyword = (match[TIME_GROUP] || "").toLowerCase();

        let component = context.createParsingComponents();
        switch (dateKeyword) {
            case "jetzt":
                component = references.now(context.reference);
                break;

            case "heute":
                component = references.today(context.reference);
                break;

            case "morgen":
                assignTheNextDay(component, targetDate);
                break;

            case "übermorgen":
            case "uebermorgen":
                targetDate = targetDate.add(1, "day");
                assignTheNextDay(component, targetDate);
                break;

            case "gestern":
                targetDate = targetDate.add(-1, "day");
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;

            case "vorgestern":
                targetDate = targetDate.add(-2, "day");
                assignSimilarDate(component, targetDate);
                implySimilarTime(component, targetDate);
                break;

            default:
                if (dateKeyword.match(/letzte\s*nacht/)) {
                    if (targetDate.hour() > 6) {
                        targetDate = targetDate.add(-1, "day");
                    }

                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 0);
                }

                break;
        }

        if (timeKeyword) {
            component = DECasualTimeParser.extractTimeComponents(component, timeKeyword);
        }

        return component;
    }
}
