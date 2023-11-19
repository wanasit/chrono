import { TIME_UNIT_DICTIONARY } from "../constants";
import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import dayjs from "dayjs";
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
        let date = dayjs(context.reference.instant);

        // This week
        if (timeunit.match(/week/i)) {
            date = date.add(-date.get("d"), "d");
            components.imply("day", date.date());
            components.imply("month", date.month() + 1);
            components.imply("year", date.year());
        }

        // This month
        else if (timeunit.match(/month/i)) {
            date = date.add(-date.date() + 1, "d");
            components.imply("day", date.date());
            components.assign("year", date.year());
            components.assign("month", date.month() + 1);
        }

        // This year
        else if (timeunit.match(/year/i)) {
            date = date.add(-date.date() + 1, "d");
            date = date.add(-date.month(), "month");

            components.imply("day", date.date());
            components.imply("month", date.month() + 1);
            components.assign("year", date.year());
        }

        return components;
    }
}
