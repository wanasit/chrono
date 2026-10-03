import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { Meridiem } from "../../../types";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { REGEX_PARTS, toWesternDigits } from "../constants";

const HOUR_GROUP = 2;
const MINUTE_GROUP = 3;
const SECOND_GROUP = 4;
const MILLI_SECOND_GROUP = 5;
const AM_PM_GROUP = 6;

function arPrimaryTimePattern(leftBoundary: string, primaryPrefix: string, primarySuffix: string, flags: string) {
    return new RegExp(
        `${leftBoundary}` +
            `${primaryPrefix}` +
            `([0-9٠-٩]{1,4})` +
            `(?:` +
            `(?:\\.|:|：)` +
            `([0-9٠-٩]{1,2})` +
            `(?:` +
            `(?::|：)` +
            `([0-9٠-٩]{2})` +
            `(?:\\.([0-9٠-٩]{1,6}))?` +
            `)?` +
            `)?` +
            `(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?|ص|م))?` +
            `${primarySuffix}`,
        flags
    );
}

function arFollowingTimePattern(followingPhase: string, followingSuffix: string) {
    return new RegExp(
        `^(${followingPhase})` +
            `([0-9٠-٩]{1,4})` +
            `(?:` +
            `(?:\\.|:|：)` +
            `([0-9٠-٩]{1,2})` +
            `(?:` +
            `(?::|：)` +
            `([0-9٠-٩]{1,2})(?:\\.([0-9٠-٩]{1,6}))?` +
            `)?` +
            `)?` +
            `(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?|ص|م))?` +
            `${followingSuffix}`,
        "iu"
    );
}

export default class ARTimeExpressionParser extends AbstractTimeExpressionParser {
    constructor(strictMode = false) {
        super(strictMode);
    }

    patternFlags(): string {
        return REGEX_PARTS.flags;
    }

    primaryPatternLeftBoundary(): string {
        return `(^|\\s|T|(?:[^\\p{L}\\p{N}_]))`;
    }

    followingPhase(): string {
        return `\\s*(?:-|–|~|إلى|وحتى|حتى)\\s*`;
    }

    primaryPrefix(): string {
        return `(?:(?:في\\s*تمام|في|الساعة|ساعة|من)\\s*)??`;
    }

    primarySuffix(): string {
        return `(?:\\s*(?:صباحاً|صباحا|مساءً|مساء|ليلاً|ليلا|عصراً|عصرا|ظهراً|ظهرا))?(?!/)${REGEX_PARTS.rightBoundary}`;
    }

    followingSuffix(): string {
        return `(?:\\s*(?:صباحاً|صباحا|مساءً|مساء|ليلاً|ليلا|عصراً|عصرا|ظهراً|ظهرا))?(?!/)${REGEX_PARTS.rightBoundary}`;
    }

    getPrimaryTimePatternThroughCache() {
        return arPrimaryTimePattern(
            this.primaryPatternLeftBoundary(),
            this.primaryPrefix(),
            this.primarySuffix(),
            this.patternFlags()
        );
    }

    getFollowingTimePatternThroughCache() {
        return arFollowingTimePattern(this.followingPhase(), this.followingSuffix());
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        if (match[HOUR_GROUP]) match[HOUR_GROUP] = toWesternDigits(match[HOUR_GROUP]);
        if (match[MINUTE_GROUP]) match[MINUTE_GROUP] = toWesternDigits(match[MINUTE_GROUP]);
        if (match[SECOND_GROUP]) match[SECOND_GROUP] = toWesternDigits(match[SECOND_GROUP]);
        if (match[MILLI_SECOND_GROUP]) match[MILLI_SECOND_GROUP] = toWesternDigits(match[MILLI_SECOND_GROUP]);

        const components = super.extractPrimaryTimeComponents(context, match);
        if (components) {
            const ampmGroup = (match[AM_PM_GROUP] || "").toLowerCase();
            const fullMatch = match[0].toLowerCase();
            const isPM =
                ampmGroup === "م" ||
                ampmGroup === "pm" ||
                ampmGroup === "p" ||
                ampmGroup === "p.m." ||
                /(?:مساءً|مساء|ليلاً|ليلا|عصراً|عصرا)/.test(fullMatch);
            const isAM =
                ampmGroup === "ص" ||
                ampmGroup === "am" ||
                ampmGroup === "a" ||
                ampmGroup === "a.m." ||
                /(?:صباحاً|صباحا)/.test(fullMatch);
            const isNoon = /(?:ظهراً|ظهرا)/.test(fullMatch);

            if (isPM) {
                const hour = components.get("hour");
                if (hour < 12) {
                    components.assign("hour", hour + 12);
                }
                components.assign("meridiem", Meridiem.PM);
            } else if (isAM) {
                const hour = components.get("hour");
                if (hour === 12) {
                    components.assign("hour", 0);
                }
                components.assign("meridiem", Meridiem.AM);
            } else if (isNoon) {
                const hour = components.get("hour");
                if (hour < 12 && hour !== 0) {
                    components.assign("hour", hour + 12);
                }
                components.assign("meridiem", Meridiem.PM);
            }
        }

        return components;
    }

    extractFollowingTimeComponents(context: ParsingContext, match: RegExpMatchArray, result): null | ParsingComponents {
        if (match[HOUR_GROUP]) match[HOUR_GROUP] = toWesternDigits(match[HOUR_GROUP]);
        if (match[MINUTE_GROUP]) match[MINUTE_GROUP] = toWesternDigits(match[MINUTE_GROUP]);
        if (match[SECOND_GROUP]) match[SECOND_GROUP] = toWesternDigits(match[SECOND_GROUP]);
        if (match[MILLI_SECOND_GROUP]) match[MILLI_SECOND_GROUP] = toWesternDigits(match[MILLI_SECOND_GROUP]);

        const components = super.extractFollowingTimeComponents(context, match, result);
        if (components) {
            const ampmGroup = (match[AM_PM_GROUP] || "").toLowerCase();
            const fullMatch = match[0].toLowerCase();
            const isPM =
                ampmGroup === "م" ||
                ampmGroup === "pm" ||
                ampmGroup === "p" ||
                ampmGroup === "p.m." ||
                /(?:مساءً|مساء|ليلاً|ليلا|عصراً|عصرا)/.test(fullMatch);
            const isAM =
                ampmGroup === "ص" ||
                ampmGroup === "am" ||
                ampmGroup === "a" ||
                ampmGroup === "a.m." ||
                /(?:صباحاً|صباحا)/.test(fullMatch);
            const isNoon = /(?:ظهراً|ظهرا)/.test(fullMatch);

            if (isPM) {
                const hour = components.get("hour");
                if (hour < 12) {
                    components.assign("hour", hour + 12);
                }
                components.assign("meridiem", Meridiem.PM);
            } else if (isAM) {
                const hour = components.get("hour");
                if (hour === 12) {
                    components.assign("hour", 0);
                }
                components.assign("meridiem", Meridiem.AM);
            } else if (isNoon) {
                const hour = components.get("hour");
                if (hour < 12 && hour !== 0) {
                    components.assign("hour", hour + 12);
                }
                components.assign("meridiem", Meridiem.PM);
            }

            // Propagate meridiem back to result.start if start did not specify AM/PM
            if (!result.start.isCertain("meridiem")) {
                if (isPM) {
                    result.start.imply("meridiem", Meridiem.PM);
                    if (result.start.get("hour") < 12) {
                        result.start.assign("hour", result.start.get("hour") + 12);
                    }
                } else if (isAM) {
                    result.start.imply("meridiem", Meridiem.AM);
                    if (result.start.get("hour") === 12) {
                        result.start.assign("hour", 0);
                    }
                }
            }
        }

        return components;
    }
}
