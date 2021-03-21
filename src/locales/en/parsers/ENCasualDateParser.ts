import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate } from "../../../utils/dayjs";
import * as references from "../../../common/casualReferences";

const PATTERN = /(now|today|tonight|tomorrow|tmr|yesterday|last\s*night)(?=\W|$)/i;

export default class ENCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "now":
                return references.now(context.refDate);

            case "today":
                return references.today(context.refDate);

            case "yesterday":
                return references.yesterday(context.refDate);

            case "tomorrow":
            case "tmr":
                return references.tomorrow(context.refDate);

            case "tonight":
                return references.tonight(context.refDate);

            default:
                if (lowerText.match(/last\s*night/)) {
                    if (targetDate.hour() > 6) {
                        targetDate = targetDate.add(-1, "day");
                    }

                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 0);
                }

                break;
        }

        return component;
    }
}
