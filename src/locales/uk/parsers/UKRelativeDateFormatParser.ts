import { TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

const MODIFIER_WORD_GROUP = 1;
const RELATIVE_WORD_GROUP = 2;

export default class UKRelativeDateFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return (
            `(в минулому|у минулому|на минулому|минулого|на наступному|в наступному|у наступному|наступного|на цьому|в цьому|у цьому|цього)\\s*` +
            `(${matchAnyPattern(TIME_UNIT_DICTIONARY)})(?=\\s*)`
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const modifier = match[MODIFIER_WORD_GROUP].toLowerCase();
        const unitWord = match[RELATIVE_WORD_GROUP].toLowerCase();
        const timeunit = TIME_UNIT_DICTIONARY[unitWord];

        if (
            modifier == "на наступному" ||
            modifier == "в наступному" ||
            modifier == "у наступному" ||
            modifier == "наступного"
        ) {
            const timeUnits = {};
            timeUnits[timeunit] = 1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        if (
            modifier == "на минулому" ||
            modifier == "в минулому" ||
            modifier == "у минулому" ||
            modifier == "минулого"
        ) {
            const timeUnits = {};
            timeUnits[timeunit] = -1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        const components = context.createParsingComponents();
        let date = new Date(context.reference.instant.getTime());

        // This week
        if (timeunit.match(/week/i)) {
            date.setDate(date.getDate() - date.getDay());
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.imply("year", date.getFullYear());
        }

        // This month
        else if (timeunit.match(/month/i)) {
            date.setDate(1);
            components.imply("day", date.getDate());
            components.assign("year", date.getFullYear());
            components.assign("month", date.getMonth() + 1);
        }

        // This year
        else if (timeunit.match(/year/i)) {
            date.setDate(1);
            date.setMonth(0);
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.assign("year", date.getFullYear());
        }

        return components;
    }
}
