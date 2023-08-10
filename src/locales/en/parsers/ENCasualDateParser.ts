import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate } from "../../../utils/dayjs";
import * as references from "../../../common/casualReferences";

const PATTERN = /(now|today|tonight|tomorrow|tmr|tmrw|yesterday|last\s*night)(?=\W|$)/i;

export default class ENCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();

        switch (lowerText) {
            case "now":
                return references.now(context.reference, "Now");

            case "today":
                return references.today(context.reference, "Today");

            case "yesterday":
                return references.yesterday(context.reference, "Yesterday");

            case "tomorrow":
            case "tmr":
            case "tmrw":
                return references.tomorrow(context.reference, "Tomorrow");

            case "tonight":
                return references.tonight(context.reference, undefined, "Tonight");

            default:
                if (lowerText.match(/last\s*night/)) {
                    if (targetDate.hour() > 6) {
                        targetDate = targetDate.add(-1, "day");
                    }

                    const component = context.createParsingComponents(undefined, "Last Night");
                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 0);

                    return component;
                }
                break;
        }

        return context.createParsingComponents();
    }
}
