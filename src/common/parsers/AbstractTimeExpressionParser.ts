import { Parser, ParsingContext } from "../../chrono";
import { ParsingComponents, ParsingResult } from "../../results";
import { Meridiem } from "../../index";
import dayjs from "dayjs";

function primaryTimePattern(primaryPrefix: String, primarySuffix: String) {
    return new RegExp(
        "(^|\\s|T)" +
            `${primaryPrefix}` +
            "(\\d{1,4})" +
            "(?:" +
            "(?:\\.|\\:|\\：)(\\d{1,2})" +
            "(?:" +
            "(?:\\:|\\：)(\\d{2})(?:\\.(\\d{1,6}))?" +
            ")?" +
            ")?" +
            "(?:\\s*(a\\.m\\.|p\\.m\\.|am?|pm?))?" +
            `${primarySuffix}`,
        "i"
    );
}

function followingTimeExpression(followingPhase: String, followingSuffix: String) {
    return new RegExp(
        `^(${followingPhase})` +
            "(\\d{1,4})" +
            "(?:" +
            "(?:\\.|\\:|\\：)(\\d{1,2})" +
            "(?:" +
            "(?:\\.|\\:|\\：)(\\d{1,2})(?:\\.(\\d{1,6}))?" +
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

    primarySuffix(): string {
        return "(?=\\W|$)";
    }

    followingSuffix(): string {
        return "(?=\\W|$)";
    }

    pattern(context: ParsingContext): RegExp {
        return primaryTimePattern(this.primaryPrefix(), this.primarySuffix());
    }

    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult {
        const refDate = dayjs(context.refDate);
        let result = context.createParsingResult(match.index + match[1].length, match[0].substring(match[1].length));

        result.start.imply("day", refDate.date());
        result.start.imply("month", refDate.month() + 1);
        result.start.imply("year", refDate.year());

        result.start = this.extractPrimaryTimeComponents(context, match);
        if (!result.start) {
            match.index += match[0].length;
            return null;
        }

        const remainingText = context.text.substring(match.index + match[0].length);
        const followingPattern = followingTimeExpression(this.followingPhase(), this.followingSuffix());
        match = followingPattern.exec(remainingText);
        if (!match) {
            return result;
        }

        // Pattern "YY.YY -XXXX" is more like timezone offset
        if (match[0].match(/^\s*([+-])\s*\d{3,4}$/)) {
            return result;
        }

        result.end = this.extractFollowingTimeComponents(context, match, result);
        if (result.end) {
            if (result.end) {
                result.text += match[0];
            }
        }

        return result;
    }

    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents {
        const components = context.createParsingComponents();
        let hour = 0;
        let minute = 0;
        let meridiem = null;

        // ----- Hours
        hour = parseInt(match[HOUR_GROUP]);

        // ----- Minutes
        if (match[MINUTE_GROUP] != null) {
            minute = parseInt(match[MINUTE_GROUP]);
        } else if (hour > 100) {
            minute = hour % 100;
            hour = Math.floor(hour / 100);
        }

        if (minute >= 60 || hour > 24) {
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
}
