import { Parser, ParsingContext } from "../../chrono";
import { ParsingComponents, ParsingResult } from "../../results";
import { Meridiem } from "../../index";

// prettier-ignore
function primaryTimePattern(primaryPrefix: string, primarySuffix: string) {
    return new RegExp(
        "(^|\\s|T|\\b)" +
            `${primaryPrefix}` +
            "(\\d{1,4})" +
            "(?:" +
                "(?:\\.|\\:|\\：)" +
                "(\\d{1,2})" +
                "(?:" +
                    "(?:\\:|\\：)" +
                    "(\\d{2})" +
                    "(?:\\.(\\d{1,6}))?" +
                ")?" +
            ")?" +
            "(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?" +
            `${primarySuffix}`,
        "i"
    );
}

// prettier-ignore
function followingTimePatten(followingPhase: string, followingSuffix: string) {
    return new RegExp(
        `^(${followingPhase})` +
            "(\\d{1,4})" +
            "(?:" +
                "(?:\\.|\\:|\\：)" +
                "(\\d{1,2})" +
                "(?:" +
                    "(?:\\.|\\:|\\：)" +
                    "(\\d{1,2})(?:\\.(\\d{1,6}))?" +
                ")?" +
            ")?" +
            "(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?" +
            `${followingSuffix}`,
        "i"
    );
}

const HOUR_GROUP = 2;
const MINUTE_GROUP = 3;
const SECOND_GROUP = 4;
const MILLI_SECOND_GROUP = 5;
const AM_PM_HOUR_GROUP = 6;

export abstract class AbstractTimeExpressionParser implements Parser {
    abstract primaryPrefix(): string;
    abstract followingPhase(): string;
    strictMode: boolean;

    constructor(strictMode = false) {
        this.strictMode = strictMode;
    }

    primarySuffix(): string {
        return "(?=\\W|$)";
    }

    followingSuffix(): string {
        return "(?=\\W|$)";
    }

    pattern(context: ParsingContext): RegExp {
        return this.getPrimaryTimePatternThroughCache();
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const startComponents = this.extractPrimaryTimeComponents(context, match);
        if (!startComponents) {
            match.index += match[0].length; // Skip over potential overlapping pattern
            return null;
        }

        const index = match.index + match[1].length;
        const text = match[0].substring(match[1].length);
        const result = context.createParsingResult(index, text, startComponents);
        match.index += match[0].length; // Skip over potential overlapping pattern

        const remainingText = context.text.substring(match.index);
        const followingPattern = this.getFollowingTimePatternThroughCache();
        const followingMatch = followingPattern.exec(remainingText);
        if (
            !followingMatch ||
            // Pattern "YY.YY -XXXX" is more like timezone offset
            followingMatch[0].match(/^\s*([+-])\s*\d{3,4}$/)
        ) {
            return this.checkAndReturnWithoutFollowingPattern(result);
        }

        result.end = this.extractFollowingTimeComponents(context, followingMatch, result);
        if (result.end) {
            result.text += followingMatch[0];
        }

        return this.checkAndReturnWithFollowingPattern(result);
    }

    extractPrimaryTimeComponents(
        context: ParsingContext,
        match: RegExpMatchArray,
        strict = false
    ): null | ParsingComponents {
        const components = context.createParsingComponents();
        let minute = 0;
        let meridiem = null;

        // ----- Hours
        let hour = parseInt(match[HOUR_GROUP]);
        if (hour > 100) {
            if (this.strictMode || match[MINUTE_GROUP] != null) {
                return null;
            }

            minute = hour % 100;
            hour = Math.floor(hour / 100);
        }

        if (hour > 24) {
            return null;
        }

        // ----- Minutes
        if (match[MINUTE_GROUP] != null) {
            if (match[MINUTE_GROUP].length == 1 && !match[AM_PM_HOUR_GROUP]) {
                // Skip single digit minute e.g. "at 1.1 xx"
                return null;
            }

            minute = parseInt(match[MINUTE_GROUP]);
        }

        if (minute >= 60) {
            return null;
        }

        if (hour > 12) {
            meridiem = Meridiem.PM;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP] != null) {
            if (hour > 12) return null;
            const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = Meridiem.AM;
                if (hour == 12) {
                    hour = 0;
                }
            }

            if (ampm == "p") {
                meridiem = Meridiem.PM;
                if (hour != 12) {
                    hour += 12;
                }
            }
        }

        components.assign("hour", hour);
        components.assign("minute", minute);

        if (meridiem !== null) {
            components.assign("meridiem", meridiem);
        } else {
            if (hour < 12) {
                components.imply("meridiem", Meridiem.AM);
            } else {
                components.imply("meridiem", Meridiem.PM);
            }
        }

        // ----- Millisecond
        if (match[MILLI_SECOND_GROUP] != null) {
            const millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
            if (millisecond >= 1000) return null;

            components.assign("millisecond", millisecond);
        }

        // ----- Second
        if (match[SECOND_GROUP] != null) {
            const second = parseInt(match[SECOND_GROUP]);
            if (second >= 60) return null;

            components.assign("second", second);
        }

        return components;
    }

    extractFollowingTimeComponents(
        context: ParsingContext,
        match: RegExpMatchArray,
        result: ParsingResult
    ): null | ParsingComponents {
        const components = context.createParsingComponents();

        // ----- Millisecond
        if (match[MILLI_SECOND_GROUP] != null) {
            const millisecond = parseInt(match[MILLI_SECOND_GROUP].substring(0, 3));
            if (millisecond >= 1000) return null;

            components.assign("millisecond", millisecond);
        }

        // ----- Second
        if (match[SECOND_GROUP] != null) {
            const second = parseInt(match[SECOND_GROUP]);
            if (second >= 60) return null;

            components.assign("second", second);
        }

        let hour = parseInt(match[HOUR_GROUP]);
        let minute = 0;
        let meridiem = -1;

        // ----- Minute
        if (match[MINUTE_GROUP] != null) {
            minute = parseInt(match[MINUTE_GROUP]);
        } else if (hour > 100) {
            minute = hour % 100;
            hour = Math.floor(hour / 100);
        }

        if (minute >= 60 || hour > 24) {
            return null;
        }

        if (hour >= 12) {
            meridiem = Meridiem.PM;
        }

        // ----- AM & PM
        if (match[AM_PM_HOUR_GROUP] != null) {
            if (hour > 12) {
                return null;
            }

            const ampm = match[AM_PM_HOUR_GROUP][0].toLowerCase();
            if (ampm == "a") {
                meridiem = Meridiem.AM;
                if (hour == 12) {
                    hour = 0;
                    if (!components.isCertain("day")) {
                        components.imply("day", components.get("day") + 1);
                    }
                }
            }

            if (ampm == "p") {
                meridiem = Meridiem.PM;
                if (hour != 12) hour += 12;
            }

            if (!result.start.isCertain("meridiem")) {
                if (meridiem == Meridiem.AM) {
                    result.start.imply("meridiem", Meridiem.AM);

                    if (result.start.get("hour") == 12) {
                        result.start.assign("hour", 0);
                    }
                } else {
                    result.start.imply("meridiem", Meridiem.PM);

                    if (result.start.get("hour") != 12) {
                        result.start.assign("hour", result.start.get("hour") + 12);
                    }
                }
            }
        }

        components.assign("hour", hour);
        components.assign("minute", minute);

        if (meridiem >= 0) {
            components.assign("meridiem", meridiem);
        } else {
            const startAtPM = result.start.isCertain("meridiem") && result.start.get("hour") > 12;
            if (startAtPM) {
                if (result.start.get("hour") - 12 > hour) {
                    // 10pm - 1 (am)
                    components.imply("meridiem", Meridiem.AM);
                } else if (hour <= 12) {
                    components.assign("hour", hour + 12);
                    components.assign("meridiem", Meridiem.PM);
                }
            } else if (hour > 12) {
                components.imply("meridiem", Meridiem.PM);
            } else if (hour <= 12) {
                components.imply("meridiem", Meridiem.AM);
            }
        }

        if (components.date().getTime() < result.start.date().getTime()) {
            components.imply("day", components.get("day") + 1);
        }

        return components;
    }

    private checkAndReturnWithoutFollowingPattern(result) {
        // Single digit (e.g "1") should not be counted as time expression
        if (result.text.match(/^\d$/)) {
            return null;
        }

        // Instead of "am/pm", it ends with "a" or "p" (e.g "1a", "123p"), this seems unlikely
        if (result.text.match(/\d[apAP]$/)) {
            return null;
        }

        // If it ends only with numbers or dots
        const endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)$/);
        if (endingWithNumbers) {
            const endingNumbers: string = endingWithNumbers[1];

            // In strict mode (e.g. "at 1" or "at 1.2"), this should not be accepted
            if (this.strictMode) {
                return null;
            }

            // If it ends only with dot single digit, e.g. "at 1.2"
            if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
                return null;
            }

            // If it ends only with numbers above 24, e.g. "at 25"
            const endingNumberVal = parseInt(endingNumbers);
            if (endingNumberVal > 24) {
                return null;
            }
        }

        return result;
    }

    private checkAndReturnWithFollowingPattern(result) {
        if (result.text.match(/^\d+-\d+$/)) {
            return null;
        }

        // If it ends only with numbers or dots
        const endingWithNumbers = result.text.match(/[^\d:.](\d[\d.]+)\s*-\s*(\d[\d.]+)$/);
        if (endingWithNumbers) {
            // In strict mode (e.g. "at 1-3" or "at 1.2 - 2.3"), this should not be accepted
            if (this.strictMode) {
                return null;
            }

            const startingNumbers: string = endingWithNumbers[1];
            const endingNumbers: string = endingWithNumbers[2];
            // If it ends only with dot single digit, e.g. "at 1.2"
            if (endingNumbers.includes(".") && !endingNumbers.match(/\d(\.\d{2})+$/)) {
                return null;
            }

            // If it ends only with numbers above 24, e.g. "at 25"
            const endingNumberVal = parseInt(endingNumbers);
            const startingNumberVal = parseInt(startingNumbers);
            if (endingNumberVal > 24 || startingNumberVal > 24) {
                return null;
            }
        }

        return result;
    }

    private cachedPrimaryPrefix = null;
    private cachedPrimarySuffix = null;
    private cachedPrimaryTimePattern = null;

    getPrimaryTimePatternThroughCache() {
        const primaryPrefix = this.primaryPrefix();
        const primarySuffix = this.primarySuffix();

        if (this.cachedPrimaryPrefix === primaryPrefix && this.cachedPrimarySuffix === primarySuffix) {
            return this.cachedPrimaryTimePattern;
        }

        this.cachedPrimaryTimePattern = primaryTimePattern(primaryPrefix, primarySuffix);
        this.cachedPrimaryPrefix = primaryPrefix;
        this.cachedPrimarySuffix = primarySuffix;
        return this.cachedPrimaryTimePattern;
    }

    private cachedFollowingPhase = null;
    private cachedFollowingSuffix = null;
    private cachedFollowingTimePatten = null;

    getFollowingTimePatternThroughCache() {
        const followingPhase = this.followingPhase();
        const followingSuffix = this.followingSuffix();

        if (this.cachedFollowingPhase === followingPhase && this.cachedFollowingSuffix === followingSuffix) {
            return this.cachedFollowingTimePatten;
        }

        this.cachedFollowingTimePatten = followingTimePatten(followingPhase, followingSuffix);
        this.cachedFollowingPhase = followingPhase;
        this.cachedFollowingSuffix = followingSuffix;
        return this.cachedFollowingTimePatten;
    }
}
