import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { WEEKDAY_DICTIONARY } from "../constants";
import { matchAnyPattern } from "../../../utils/pattern";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_GROUP = 3;

export default class ARWeekdayParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return (
            `(?:(?:,|\\(|（)\\s*)?` +
            `(?:يوم\\s*)?` +
            `(?:(هذا|هذه|الماضي|الماضية|السابق|السابقة|القادم|القادمة|المقبل|المقبلة)\\s+)?` +
            `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
            `(?:\\s+(هذا|هذه|الماضي|الماضية|السابق|السابقة|المنصرم|المنصرمة|القادم|القادمة|المقبل|المقبلة))?` +
            `(?:\\s*(?:,|\\)|）))?`
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        const modifierWord = (prefix || postfix || "").toLowerCase();

        let modifier = null;
        if (
            modifierWord === "الماضي" ||
            modifierWord === "الماضية" ||
            modifierWord === "السابق" ||
            modifierWord === "السابقة" ||
            modifierWord === "المنصرم" ||
            modifierWord === "المنصرمة"
        ) {
            modifier = "last";
        } else if (
            modifierWord === "القادم" ||
            modifierWord === "القادمة" ||
            modifierWord === "المقبل" ||
            modifierWord === "المقبلة"
        ) {
            modifier = "next";
        } else if (modifierWord === "هذا" || modifierWord === "هذه") {
            modifier = "this";
        }

        return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
    }
}
