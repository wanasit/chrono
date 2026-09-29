import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays";

// Senin  |  hari Senin  |  Jumat depan  |  Rabu lalu  |  Senin minggu depan  |  hari Minggu ini
const PATTERN = new RegExp(
    "(?:pada\\s+)?(hari\\s+)?" +
        `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
        "(?:\\s+(?:(?:minggu|pekan)\\s+)?(ini|depan|berikutnya|yang\\s+lalu|lalu|kemarin))?" +
        "(?=\\W|$)",
    "i"
);

const HARI_PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const MODIFIER_GROUP = 3;

export default class IDWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const weekdayWord = match[WEEKDAY_GROUP].toLowerCase();

        // "minggu" also means "week", only accept it as Sunday in "hari Minggu"
        if (weekdayWord === "minggu" && !match[HARI_PREFIX_GROUP]) {
            return null;
        }

        const weekday = WEEKDAY_DICTIONARY[weekdayWord];
        const modifierWord = (match[MODIFIER_GROUP] || "").toLowerCase().replace(/\s+/g, " ");

        let modifier: "this" | "next" | "last" | null = null;
        if (modifierWord === "ini") {
            modifier = "this";
        } else if (modifierWord === "depan" || modifierWord === "berikutnya") {
            modifier = "next";
        } else if (modifierWord === "lalu" || modifierWord === "yang lalu" || modifierWord === "kemarin") {
            modifier = "last";
        }

        return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
    }
}
