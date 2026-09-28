import { Parser, ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../types";
import { parseJapaneseNumber, TIME_PARTS, NUMBER_PATTERN } from "../constants";

const TIME_PARTS_PATTERN = TIME_PARTS.map((tp) => tp.tPattern).join("|");
const PATTERN = new RegExp(
    `(${TIME_PARTS_PATTERN})(?:\\s*の?\\s*(${NUMBER_PATTERN})時(?:\\s*(${NUMBER_PATTERN}|半)分?)?)?`,
    "i"
);

export default class JPDayPartParser implements Parser {
    protected isStrict: boolean = true;

    constructor(strictMode: boolean) {
        this.isStrict = strictMode;
    }

    pattern(): RegExp {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        const periodStr = match[1];
        const explicitHour = match[2] != null;

        const matchedDef = TIME_PARTS.find((tp) => new RegExp(`^(${tp.tPattern})$`, "i").test(periodStr));

        if (!matchedDef) return null;

        let hour = explicitHour ? parseJapaneseNumber(match[2]) : matchedDef.time;

        if (hour < 0 || hour >= 24) return null;
        let meridiem = Meridiem.AM;
        if (explicitHour && hour > 12) {
            meridiem = Meridiem.PM;
        } else {
            if (matchedDef.dayPart === "pm") {
                const isAmOverride = explicitHour && matchedDef.am?.includes(hour);
                if (!isAmOverride) {
                    meridiem = Meridiem.PM;
                    if (hour < 12) hour += 12;
                }
            }
        }

        const components = context.createParsingComponents();
        if (explicitHour) {
            components.assign("hour", hour);
        } else {
            components.addTag(`casualReference/${periodStr}`);
            components.imply("hour", hour);
        }
        components.assign("meridiem", meridiem);

        if (match[3]) {
            const minute = match[3] === "半" ? 30 : parseJapaneseNumber(match[3]);
            if (minute > 59) return null;
            components.assign("minute", minute);
        }
        components.addTag(`result/JPDayPart`);

        return components;
    }
}
