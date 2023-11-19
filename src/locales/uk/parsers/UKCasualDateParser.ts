import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import * as references from "../../../common/casualReferences";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

export default class UKCasualDateParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(?:з|із|від)?\\s*(сьогодні|вчора|завтра|післязавтра|післяпіслязавтра|позапозавчора|позавчора)`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult {
        const lowerText = match[1].toLowerCase();
        const component = context.createParsingComponents();

        switch (lowerText) {
            case "сьогодні":
                return references.today(context.reference);

            case "вчора":
                return references.yesterday(context.reference);

            case "завтра":
                return references.tomorrow(context.reference);

            case "післязавтра":
                return references.theDayAfter(context.reference, 2);

            case "післяпіслязавтра":
                return references.theDayAfter(context.reference, 3);

            case "позавчора":
                return references.theDayBefore(context.reference, 2);

            case "позапозавчора":
                return references.theDayBefore(context.reference, 3);
        }

        return component;
    }
}
