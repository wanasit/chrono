import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { toDayJSWeekday } from "../../../calculation/weeks";

const PATTERN = new RegExp(
    "(?:(?:\\,|\\(|\\（)\\s*)?" +
        "(?:(este|esta|passado|pr[oó]ximo)\\s*)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s*(?:\\,|\\)|\\）))?" +
        "(?:\\s*(este|esta|passado|pr[óo]ximo)\\s*semana)?" +
        "(?=\\W|\\d|$)",
    "i"
);

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_GROUP = 3;

export default class PTWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const offset = WEEKDAY_DICTIONARY[dayOfWeek];
        if (offset === undefined) {
            return null;
        }

        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let norm = prefix || postfix || "";
        norm = norm.toLowerCase();

        let modifier = null;
        if (norm == "passado") {
            modifier = "this";
        } else if (norm == "próximo" || norm == "proximo") {
            modifier = "next";
        } else if (norm == "este") {
            modifier = "this";
        }

        const date = toDayJSWeekday(context.refDate, offset, modifier);
        return context
            .createParsingComponents()
            .assign("weekday", offset)
            .imply("day", date.date())
            .imply("month", date.month() + 1)
            .imply("year", date.year());
    }
}
