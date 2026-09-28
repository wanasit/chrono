import { Parser, ParsingContext } from "../../../chrono";
import { addDuration, Duration, reverseDuration } from "../../../calculation/duration";
import { ParsingComponents } from "../../../results";
import {
    parseJapaneseNumber,
    WEEKDAY_OFFSET,
    NAMED_PERIOD_DEFINITIONS,
    DURATION_UNITS,
    NUMBER_PATTERN,
} from "../constants";

const NAMED_PERIOD_MAP = new Map<string, Duration>();
const ALL_NAMED_PATTERNS: string[] = [];

for (const def of NAMED_PERIOD_DEFINITIONS) {
    for (const synonym of def.synonyms) {
        NAMED_PERIOD_MAP.set(synonym, def.duration);
        ALL_NAMED_PATTERNS.push(synonym);
    }
}
ALL_NAMED_PATTERNS.sort((a, b) => b.length - a.length);

const UNIT_MAP = new Map<string, keyof Duration>();
const ALL_UNIT_PATTERNS: string[] = [];

for (const [unitKey, synonyms] of Object.entries(DURATION_UNITS) as [keyof Duration, string[]][]) {
    for (const synonym of synonyms) {
        UNIT_MAP.set(synonym, unitKey);
        ALL_UNIT_PATTERNS.push(synonym);
    }
}
ALL_UNIT_PATTERNS.sort((a, b) => b.length - a.length);

const NAMED_PERIOD_PATTERN = ALL_NAMED_PATTERNS.join("|");
const UNIT_PATTERN = ALL_UNIT_PATTERNS.join("|");
const WEEKDAY_PATTERN = Object.keys(WEEKDAY_OFFSET)
    .sort((a, b) => b.length - a.length)
    .join("|");

const PATTERN = new RegExp(
    `(?:(?<namedPeriod>${NAMED_PERIOD_PATTERN})|(?<amount>${NUMBER_PATTERN})(?<unit>${UNIT_PATTERN})(?<direction>後|前))` +
        `(?:の)?(?:` +
        `(?<explicitMonth>${NUMBER_PATTERN})月(?:\\s*(?<monthDay>${NUMBER_PATTERN})日)?|` +
        `(?<explicitDay>${NUMBER_PATTERN})日|` +
        `(?<weekday>${WEEKDAY_PATTERN})(?:曜日|曜)` +
        `)?`,
    "i"
);

export default class JPRelativeDateFormatParser implements Parser {
    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null {
        const duration = this.extractDuration(match);
        if (!duration) return null;

        const groups = match.groups || {};
        const { explicitMonth, monthDay, explicitDay, weekday } = groups;

        if (!explicitMonth && !explicitDay && !weekday) {
            return ParsingComponents.createRelativeFromReference(context.reference, duration);
        }

        const referenceDate = context.reference.getDateWithAdjustedTimezone();
        if (explicitMonth || (explicitDay && ("month" in duration || "year" in duration))) {
            referenceDate.setDate(1);
        }
        const targetDate = addDuration(referenceDate, { ...duration });

        if (explicitMonth) {
            const components = context.createParsingComponents({
                year: targetDate.getFullYear(),
                month: parseJapaneseNumber(explicitMonth),
                day: monthDay ? parseJapaneseNumber(monthDay) : 1,
            });
            return components.isValidDate() ? components : null;
        }

        if (explicitDay) {
            const components = context.createParsingComponents({
                year: targetDate.getFullYear(),
                month: targetDate.getMonth() + 1,
                day: parseJapaneseNumber(explicitDay),
            });
            return components.isValidDate() ? components : null;
        }

        if (weekday && weekday in WEEKDAY_OFFSET) {
            const offset = WEEKDAY_OFFSET[weekday];
            targetDate.setDate(targetDate.getDate() - targetDate.getDay() + offset);

            const components = context.createParsingComponents({
                year: targetDate.getFullYear(),
                month: targetDate.getMonth() + 1,
                day: targetDate.getDate(),
            });
            components.assign("weekday", offset);
            return components.isValidDate() ? components : null;
        }

        return null;
    }

    private extractDuration(match: RegExpMatchArray): Duration | null {
        const groups = match.groups || {};

        if (groups.namedPeriod) {
            const namedDuration = NAMED_PERIOD_MAP.get(groups.namedPeriod);
            return namedDuration ? { ...namedDuration } : null;
        }

        if (!groups.amount || !groups.unit) {
            return null;
        }

        const amount = parseJapaneseNumber(groups.amount);
        const unitType = UNIT_MAP.get(groups.unit);
        if (!unitType) {
            return null;
        }

        const duration: Duration = { [unitType]: amount };
        return groups.direction === "前" ? reverseDuration(duration) : duration;
    }
}
