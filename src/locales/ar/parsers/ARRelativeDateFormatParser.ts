import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

const PREFIX_GROUP = 1;
const UNIT_GROUP = 2;
const POSTFIX_GROUP = 3;

export default class ARRelativeDateFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return (
            `(?:في\\s+)?` +
            `(?:(هذا|هذه)\\s+)?` +
            `(الشهر|الاسبوع|الأسبوع|العام|السنة)` +
            `(?:\\s+(الماضي|الماضية|السابق|السابقة|المنصرم|المنصرمة|القادم|القادمة|المقبل|المقبلة|التالي|التالية))?`
        );
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const prefix = (match[PREFIX_GROUP] || "").toLowerCase();
        const unitWord = match[UNIT_GROUP].toLowerCase();
        const postfix = (match[POSTFIX_GROUP] || "").toLowerCase();

        let timeunit: "week" | "month" | "year" = "month";
        if (unitWord === "الاسبوع" || unitWord === "الأسبوع") {
            timeunit = "week";
        } else if (unitWord === "العام" || unitWord === "السنة") {
            timeunit = "year";
        }

        if (
            postfix === "القادم" ||
            postfix === "القادمة" ||
            postfix === "المقبل" ||
            postfix === "المقبلة" ||
            postfix === "التالي" ||
            postfix === "التالية"
        ) {
            const timeUnits = {};
            timeUnits[timeunit] = 1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        if (
            postfix === "الماضي" ||
            postfix === "الماضية" ||
            postfix === "السابق" ||
            postfix === "السابقة" ||
            postfix === "المنصرم" ||
            postfix === "المنصرمة"
        ) {
            const timeUnits = {};
            timeUnits[timeunit] = -1;
            return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
        }

        // Default / "هذا / هذه"
        const components = context.createParsingComponents();
        const date = new Date(context.reference.instant.getTime());

        if (timeunit === "week") {
            date.setDate(date.getDate() - date.getDay());
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.imply("year", date.getFullYear());
        } else if (timeunit === "month") {
            date.setDate(1);
            components.imply("day", date.getDate());
            components.assign("year", date.getFullYear());
            components.assign("month", date.getMonth() + 1);
        } else if (timeunit === "year") {
            date.setDate(1);
            date.setMonth(0);
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.assign("year", date.getFullYear());
        }

        return components;
    }
}
