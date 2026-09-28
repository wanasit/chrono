import { Parser, ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { ParsingComponents } from "../../../results";
import {
    convertJapaneseYear,
    ABSOLUTE_YEAR,
    parseJapaneseNumber,
    TRADITIONAL_MONTH_NAME,
    NUMBER_PATTERN,
} from "../constants";

const PATTERN = new RegExp(
    `(?:(?:(?<relativeYear>[同今本])年|${ABSOLUTE_YEAR})(?:[の\\s]*))?` +
        `(?<monthName>${Object.keys(TRADITIONAL_MONTH_NAME).join("|")})(?:\\s*(?:の)?(?<day>${NUMBER_PATTERN})日)?`,
    "i"
);

export default class JPMonthNameParser implements Parser {
    protected isStrict: boolean = true;

    constructor(strictMode: boolean) {
        this.isStrict = strictMode;
    }

    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const hasDay = Boolean(match.groups.day);
        const hasYear = Boolean(match.groups.year || match.groups.era);

        if (this.isStrict && !hasYear) {
            return null;
        }

        const month = TRADITIONAL_MONTH_NAME[match.groups.monthName];
        const day = hasDay ? parseJapaneseNumber(match.groups.day) : 1;
        const components = context.createParsingComponents({ month });

        if (hasDay) {
            components.assign("day", day);
        } else {
            components.imply("day", day);
        }

        if (match.groups.year) {
            components.assign("year", convertJapaneseYear(match.groups.year));
        } else if (match.groups.era) {
            components.assign("year", convertJapaneseYear(match.groups.eraYear, match.groups.era));
        } else if (match.groups.relativeYear) {
            components.assign("year", context.reference.getDateWithAdjustedTimezone().getFullYear());
        } else {
            components.imply("year", findYearClosestToRef(context.refDate, day, month));
        }

        components.addTag("result/JPnamedMonth");

        return components.isValidDate() ? components : null;
    }
}
