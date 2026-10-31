import { Parser, ParsingContext } from "../../../chrono";
import * as references from "../../../common/casualReferences";

/**
 * 오늘 (today), 내일 (tomorrow), 모레 (the day after tomorrow), 글피 (3 days later),
 * 어제 (yesterday), 그저께 / 그제 (the day before yesterday).
 *
 * "내일모레" literally reads "tomorrow + the day after tomorrow" but means the day after tomorrow.
 */
const PATTERN = /내일모레|그저께|그제|어제|오늘|내일|모레|글피/;

export default class KOCasualDateParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        switch (match[0]) {
            case "오늘":
                return references.today(context.reference);
            case "내일":
                return references.tomorrow(context.reference);
            case "모레":
            case "내일모레":
                return references.theDayAfter(context.reference, 2);
            case "글피":
                return references.theDayAfter(context.reference, 3);
            case "어제":
                return references.yesterday(context.reference);
            case "그저께":
            case "그제":
                return references.theDayBefore(context.reference, 2);
        }
        return null;
    }
}
