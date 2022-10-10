import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../../it/constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { toDayJSWeekday } from "../../../calculation/weeks";

const PATTERN = new RegExp(
    "(?:(?:\\,|\\(|\\（)\\s*)?" +
        "(?:(questo|l\\.*?ultim\\w*?|l\\w*?\\s*?scors\\w*?|\\w{0,2}\\s*?prossim\\w*?)\\s*)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s*(di\\s*quest\\w*?|dell\\.*?\\s*ultim\\w*?|dell\\w*?\\s*scors\\w*?|dell\\w*?\\s*prossim\\w*?)\\s*(settiman\\w*?))?" +
        //"(?:\\s*(dell\\w*?\\s*settiman\\w*?\\s*(scors\\w*?|prossim\\w*?|successiv\\w*?))?" +
        "(?=\\W|$)",
    "i"
);

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const DENOTATIVE_GROUP = 3;
const CONNOTATIVE_GROUP = 4;

export default class ITWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const offset = WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const denotative = match[DENOTATIVE_GROUP];
        const connotative = match[CONNOTATIVE_GROUP];
        let modifierWord = prefix || denotative || connotative;
        modifierWord = modifierWord || "";
        modifierWord = modifierWord.toLowerCase();

        let modifier = null;
        if (modifierWord == "ultimo" ||modifierWord == "ultima" || modifierWord == "ultime" || modifierWord == "scorso" || modifierWord == "scorsa" || modifierWord == "scorse") {
            modifier = "last";
        } else if (modifierWord == "prossimo" ||modifierWord == "prossima" || modifierWord == "prossime" ||  modifierWord == "successiva" ||  modifierWord == "successive") {
            modifier = "next";
        } else if (modifierWord == "questo" || modifierWord == "questa" || modifierWord == "queste") {
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
