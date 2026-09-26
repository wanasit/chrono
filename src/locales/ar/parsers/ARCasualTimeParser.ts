import { ParsingContext } from "../../../chrono";
import * as references from "../../../common/casualReferences";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking";

export default class ARCasualTimeParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context: ParsingContext): string {
        return `(مساء\\s*(?:أمس|امس|البارحة)|(?:أمس|امس|البارحة)\\s*مساءً?|ليلة\\s*(?:أمس|امس|البارحة)|(?:أمس|امس|البارحة)\\s*ليلاً?|الليلة\\s*الماضية|منتصف\\s*النهار|منتصف\\s*الليل|هذا\\s*الصباح|هذا\\s*المساء|هذه\\s*الليلة|بعد\\s*الظهر|ظهر\\s*اليوم|الصباح|صباحاً|صباحا|الظهر|ظهراً|ظهرا|العصر|عصراً|عصرا|المساء|مساءً|مساء|الليلة|الليل|ليلاً|ليلا)`;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const lowerText = match[1].toLowerCase();
        const component = context.createParsingComponents();

        if (lowerText.match(/مساء\s*(?:أمس|امس|البارحة)/) || lowerText.match(/(?:أمس|امس|البارحة)\s*مساء/)) {
            return references.yesterdayEvening(context.reference);
        }

        if (
            lowerText.match(/ليلة\s*(?:أمس|امس|البارحة)/) ||
            lowerText.match(/(?:أمس|امس|البارحة)\s*ليلاً?/) ||
            lowerText === "الليلة الماضية"
        ) {
            return references.lastNight(context.reference);
        }

        if (lowerText === "هذه الليلة" || lowerText === "الليلة") {
            return references.tonight(context.reference);
        }

        if (lowerText === "منتصف الليل") {
            return references.midnight(context.reference);
        }

        if (
            lowerText === "منتصف النهار" ||
            lowerText === "ظهر اليوم" ||
            lowerText === "الظهر" ||
            lowerText === "ظهراً" ||
            lowerText === "ظهرا"
        ) {
            return references.noon(context.reference);
        }

        if (lowerText === "بعد الظهر" || lowerText === "العصر" || lowerText === "عصراً" || lowerText === "عصرا") {
            return references.afternoon(context.reference);
        }

        if (lowerText === "هذا الصباح" || lowerText === "الصباح" || lowerText === "صباحاً" || lowerText === "صباحا") {
            return references.morning(context.reference);
        }

        if (lowerText === "هذا المساء" || lowerText === "المساء" || lowerText === "مساءً" || lowerText === "مساء") {
            return references.evening(context.reference);
        }

        if (lowerText === "الليل" || lowerText === "ليلاً" || lowerText === "ليلا") {
            return references.tonight(context.reference);
        }

        return component;
    }
}
