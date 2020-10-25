import { Parser, ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { assignSimilarDate, assignSimilarTime, assignTheNextDay, implySimilarTime } from "../../../utils/dayjs";
import * as references from "../../../common/casualReferences";

export default class PTCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp {
        return /(agora|hoje|amanha|amanhã|ontem)(?=\W|$)/i;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        let targetDate = dayjs(context.refDate);
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "agora":
                return references.now(context.refDate);

            case "hoje":
                return references.today(context.refDate);

            case "amanha":
            case "amanhã":
                return references.tomorrow(context.refDate);

            case "ontem":
                return references.yesterday(context.refDate);
        }

        return component;
    }
}
