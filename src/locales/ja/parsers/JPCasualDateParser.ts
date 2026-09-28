import { Parser, ParsingContext } from "../../../chrono";
import { Meridiem } from "../../../types";
import * as references from "../../../common/casualReferences";
import { ParsingComponents } from "../../../results";

type CasualHandler = (context: ParsingContext) => ParsingComponents | ReturnType<typeof references.today>;

interface CasualDefinition {
    synonyms: string[];
    handler: CasualHandler;
}

// Helper to create basic time-of-day components
function createTimeComponents(context: ParsingContext, hour: number, meridiem: Meridiem): ParsingComponents {
    const components = context.createParsingComponents();
    components.imply("hour", hour);
    components.assign("meridiem", meridiem);

    const date = context.refDate;
    components.assign("day", date.getDate());
    components.assign("month", date.getMonth() + 1);
    components.assign("year", date.getFullYear());

    return components;
}

const CASUAL_DAY_DEFINITIONS: CasualDefinition[] = [
    {
        synonyms: ["一昨日", "おととい", "前々日"],
        handler: (ctx) => references.theDayBefore(ctx.reference, 2),
    },
    {
        synonyms: ["昨日", "きのう", "前日"],
        handler: (ctx) => references.yesterday(ctx.reference),
    },
    {
        synonyms: ["今日", "きょう", "本日", "ほんじつ"],
        handler: (ctx) => references.today(ctx.reference),
    },
    {
        synonyms: ["明々後日", "しあさって"],
        handler: (ctx) => references.theDayAfter(ctx.reference, 3),
    },
    {
        synonyms: ["明日", "あした", "翌日"],
        handler: (ctx) => references.tomorrow(ctx.reference),
    },
    {
        synonyms: ["明後日", "あさって", "翌々日"],
        handler: (ctx) => references.theDayAfter(ctx.reference, 2),
    },
    {
        synonyms: ["今夜", "こんや", "今夕", "こんゆう", "今晩", "こんばん"],
        handler: (ctx) => createTimeComponents(ctx, 22, Meridiem.PM),
    },
    {
        synonyms: ["今朝", "けさ"],
        handler: (ctx) => createTimeComponents(ctx, 6, Meridiem.AM),
    },
];

const HANDLER_MAP = new Map<string, CasualHandler>();
const ALL_PATTERNS: string[] = [];

for (const def of CASUAL_DAY_DEFINITIONS) {
    for (const synonym of def.synonyms) {
        HANDLER_MAP.set(synonym, def.handler);
        ALL_PATTERNS.push(synonym);
    }
}

ALL_PATTERNS.sort((a, b) => b.length - a.length);

const PATTERN = new RegExp(ALL_PATTERNS.join("|"), "i");

export default class JPCasualDateParser implements Parser {
    pattern() {
        return PATTERN;
    }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        const text = match[0];
        const handler = HANDLER_MAP.get(text);

        if (!handler) {
            return null;
        }

        return handler(context);
    }
}
