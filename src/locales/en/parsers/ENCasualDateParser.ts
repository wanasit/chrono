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
        let component = context.createParsingComponents();

        switch (lowerText) {
            case "now":
                component = references.now(context.reference);
                component.addTag("ENCasualDateParser/extract/now");
                break;

            case "today":
                component = references.today(context.reference);
                component.addTag("ENCasualDateParser/extract/today");
                break;

            case "yesterday":
                component = references.yesterday(context.reference);
                component.addTag("ENCasualDateParser/extract/yesterday");
                break;

            case "tomorrow":
            case "tmr":
            case "tmrw":
                component = references.tomorrow(context.reference);
                component.addTag("ENCasualDateParser/extract/tomorrow");
                break;

            case "tonight":
                component = references.tonight(context.reference);
                component.addTag("ENCasualDateParser/extract/tonight");
                break;

            default:
                if (lowerText.match(/last\s*night/)) {
                    if (targetDate.hour() > 6) {
                        targetDate = targetDate.add(-1, "day");
                    }

                    assignSimilarDate(component, targetDate);
                    component.imply("hour", 0);
                    component.addTag("ENCasualDateParser/extract/last_night");
                }
                break;
        }

        return component;
    }
}
