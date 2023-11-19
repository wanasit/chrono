import { ParsingContext } from "../../../chrono";
import * as references from "../../../common/casualReferences";
import { assignSimilarDate } from "../../../utils/dayjs";
import dayjs from "dayjs";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

export default class RUCasualTimeParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(сейчас|прошлым\\s*вечером|прошлой\\s*ночью|следующей\\s*ночью|сегодня\\s*ночью|этой\\s*ночью|ночью|этим утром|утром|утра|в\\s*полдень|вечером|вечера|в\\s*полночь)`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        if (lowerText === "сейчас") {
            return references.now(context.reference);
        }
        if (lowerText === "вечером" || lowerText === "вечера") {
            return references.evening(context.reference);
        }
        if (lowerText.endsWith("утром") || lowerText.endsWith("утра")) {
            return references.morning(context.reference);
        }
        if (lowerText.match(/в\s*полдень/)) {
            return references.noon(context.reference);
        }
        if (lowerText.match(/прошлой\s*ночью/)) {
            return references.lastNight(context.reference);
        }
        if (lowerText.match(/прошлым\s*вечером/)) {
            return references.yesterdayEvening(context.reference);
        }
        if (lowerText.match(/следующей\s*ночью/)) {
            const daysToAdd = targetDate.hour() < 22 ? 1 : 2;
            targetDate = targetDate.add(daysToAdd, "day");
            assignSimilarDate(component, targetDate);
            component.imply("hour", 0);
        }
        if (lowerText.match(/в\s*полночь/) || lowerText.endsWith("ночью")) {
            return references.midnight(context.reference);
        }
        return component;
    }
}
