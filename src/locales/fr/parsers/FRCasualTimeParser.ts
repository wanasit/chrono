import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { Meridiem } from "../../../types";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

export default class FRCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(cet?)?\s*(matin|soir|après-midi|aprem|a midi|à minuit)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const suffixLower = match[2].toLowerCase();
        const component = context.createParsingComponents();

        switch (suffixLower) {
            case "après-midi":
            case "aprem":
                component.imply("hour", 14);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.PM);
                component.addTag("casualReference/afternoon");
                break;

            case "soir":
                component.imply("hour", 18);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.PM);
                component.addTag("casualReference/evening");
                break;

            case "matin":
                component.imply("hour", 8);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.AM);
                component.addTag("casualReference/morning");
                break;

            case "a midi":
                component.imply("hour", 12);
                component.imply("minute", 0);
                component.imply("meridiem", Meridiem.AM);
                component.addTag("casualReference/noon");
                break;

            case "à minuit":
                component.imply("hour", 0);
                component.imply("meridiem", Meridiem.AM);
                component.addTag("casualReference/midnight");
                break;
        }

        return component;
    }
}
