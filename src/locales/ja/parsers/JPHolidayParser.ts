import { Parser, ParsingContext } from "../../../chrono";
import { findYearClosestToRef } from "../../../calculation/years";
import { ParsingComponents } from "../../../results";
import {
    convertJapaneseYear,
    ABSOLUTE_YEAR,
    MonthDay,
    HOLIDAY_DEFINITIONS,
    RELATIVE_YEAR_DEFINITIONS,
} from "../constants";

const HOLIDAY_MAP = new Map<string, MonthDay | null>();
const ALL_HOLIDAY_PATTERNS: string[] = [];

for (const def of HOLIDAY_DEFINITIONS) {
    for (const synonym of def.synonyms) {
        HOLIDAY_MAP.set(synonym, def.date);
        ALL_HOLIDAY_PATTERNS.push(synonym);
    }

    for (const ff of def.falseFriends || []) {
        HOLIDAY_MAP.set(ff, null);
        ALL_HOLIDAY_PATTERNS.push(ff);

        for (const synonym of def.synonyms) {
            const index = ff.indexOf(synonym);
            if (index > 0) {
                const subFalseFriend = ff.slice(index);
                HOLIDAY_MAP.set(subFalseFriend, null);
                ALL_HOLIDAY_PATTERNS.push(subFalseFriend);
            }
        }
    }
}

const UNIQUE_PATTERNS = Array.from(new Set(ALL_HOLIDAY_PATTERNS)).sort((a, b) => b.length - a.length);

const RELATIVE_YEAR_MAP = new Map<string, number>();
const ALL_RELATIVE_YEAR_PATTERNS: string[] = [];

for (const def of RELATIVE_YEAR_DEFINITIONS) {
    for (const synonym of def.synonyms) {
        RELATIVE_YEAR_MAP.set(synonym, def.offset);
        ALL_RELATIVE_YEAR_PATTERNS.push(synonym);
    }
}
ALL_RELATIVE_YEAR_PATTERNS.sort((a, b) => b.length - a.length);

const RELATIVE_YEAR_PATTERN = ALL_RELATIVE_YEAR_PATTERNS.join("|");
const HOLIDAY_PATTERN = UNIQUE_PATTERNS.join("|");

const PATTERN = new RegExp(
    `(?:(?:${ABSOLUTE_YEAR}|(?<relativeYear>${RELATIVE_YEAR_PATTERN})(?!年))(?:の)?)?` +
        `(?<holiday>${HOLIDAY_PATTERN})`,
    "i"
);

export default class JPHolidayParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const holidayMatch = match.groups?.holiday;
        if (!holidayMatch) return null;

        const holiday = HOLIDAY_MAP.get(holidayMatch);
        if (!holiday) return null;

        const components = context.createParsingComponents({
            month: holiday.month,
            day: holiday.day,
        });

        const groups = match.groups || {};

        if (groups.year) {
            components.assign("year", convertJapaneseYear(groups.year));
        } else if (groups.era) {
            components.assign("year", convertJapaneseYear(groups.eraYear, groups.era));
        } else if (groups.relativeYear) {
            const offset = RELATIVE_YEAR_MAP.get(groups.relativeYear) ?? 0;
            const currentYear = context.reference.getDateWithAdjustedTimezone().getFullYear();
            components.assign("year", currentYear + offset);
        } else {
            components.imply("year", findYearClosestToRef(context.refDate, holiday.day, holiday.month));
        }

        components.addTag("result/JPHoliday");

        return components;
    }
}
