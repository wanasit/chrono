import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { createParsingComponentsAtWeekday } from "../../../common/calculation/weekdays";

const PATTERN = new RegExp(
    "(?:(?:\\,|\\(|\\（)\\s*)?" +
        "(?:(este|esta|pasado|pr[oó]ximo)\\s*)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s*(?:\\,|\\)|\\）))?" +
        "(?:\\s*(este|esta|pasado|pr[óo]ximo)\\s*semana)?" +
        "(?=\\W|\\d|$)",
    "i"
);

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_GROUP = 3;

export default class ESWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = WEEKDAY_DICTIONARY[dayOfWeek];
        if (weekday === undefined) {
            return null;
        }

        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let norm = prefix || postfix || "";
        norm = norm.toLowerCase();

        let modifier = null;
        if (norm == "pasado") {
            modifier = "this";
        } else if (norm == "próximo" || norm == "proximo") {
            modifier = "next";
        } else if (norm == "este") {
            modifier = "this";
        }

        return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
    }
}
