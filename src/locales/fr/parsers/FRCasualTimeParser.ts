import { Parser, ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { Meridiem } from "../../../index";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, assignSimilarTime, implySimilarTime } from "../../../utils/dayjs";

export default class FRCasualTimeParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(cet?)?\s*(matin|soir|après-midi|aprem)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const suffixLower = match[2].toLowerCase();
        const component = context.createParsingComponents();

        switch (suffixLower) {
            case "après-midi":
            case "aprem":
                component.imply("hour", 14);
                component.imply("minute", 0);
                break;

            case "soir":
                component.imply("hour", 18);
                component.imply("minute", 0);
                break;

            case "matin":
                component.imply("hour", 8);
                component.imply("minute", 0);
                break;
        }

        return component;
    }
}
