import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { toDayJSWeekday } from "../../../calculation/weeks";

const PATTERN = new RegExp(
    "(?:(?:\\,|\\(|\\（)\\s*)?" +
        "(?:(il|l\\.*?)\\s*?)?" +
        "(?:(questo|ultimo|scorso|prossimo)\\s*)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s*(?:di|dell\\.*?|\\,|\\)|\\） ))?" +
        "(?:\\s*(questa|ultima|scorsa|prossima))?" + 
        "(?:\\s*(settimana)?" +
        "(?:\\s*(scorsa|prossima|successiva))?" +
        "(?=\\W|$)",
    "i"
);

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_GROUP = 3;

export default class ITWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const offset = WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        let modifierWord = prefix || postfix;
        modifierWord = modifierWord || "";
        modifierWord = modifierWord.toLowerCase();

        let modifier = null;
        if (modifierWord == "ultimo" || modifierWord == "ultima" ||modifierWord == "scorso" || modifierWord == "scorsa") {
            modifier = "last";
        } else if (modifierWord == "prossimo" || modifierWord == "prossima"||  modifierWord == "successivo" ||  modifierWord == "successiva") {
            modifier = "next";
        } else if (modifierWord == "questo" || modifierWord == "questa") {
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
