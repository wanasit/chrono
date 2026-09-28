import { Duration } from "../../calculation/duration";

export interface MonthDay {
    month: number;
    day: number;
}

export interface HolidayDefinition {
    synonyms: string[];
    date: MonthDay;
    falseFriends: string[];
}

export interface RelativeYearDefinition {
    synonyms: string[];
    offset: number;
}

type JLookup = Record<string, number>;

export interface TimeDefinition {
    tPattern: string;
    time: number;
    dayPart: "am" | "pm";
    am?: number[];
}

export interface NamedPeriodDefinition {
    synonyms: string[];
    duration: Duration;
}

export const NUMBER: JLookup = {
    "零": 0,
    "〇": 0,
    "一": 1,
    "二": 2,
    "三": 3,
    "四": 4,
    "五": 5,
    "六": 6,
    "七": 7,
    "八": 8,
    "九": 9,
    "十": 10,
};

export const NUMBER_PATTERN = "(?:[0-9０-９]+|[零〇一二三四五六七八九十]+)";

export const WEEKDAY_OFFSET: JLookup = {
    "日": 0,
    "月": 1,
    "火": 2,
    "水": 3,
    "木": 4,
    "金": 5,
    "土": 6,
};

export const TRADITIONAL_MONTH_NAME: JLookup = {
    "睦月": 1,
    "如月": 2,
    "弥生": 3,
    "卯月": 4,
    "皐月": 5,
    "水無月": 6,
    "文月": 7,
    "葉月": 8,
    "長月": 9,
    "神無月": 10,
    "霜月": 11,
    "師走": 12,
} as const;

export const TIME_PARTS: TimeDefinition[] = [
    { tPattern: "朝方", time: 9, dayPart: "am" },
    { tPattern: "朝(?!顔|食|ごはん|刊|日|鮮|型|市|霞|露|礼)", time: 9, dayPart: "am" },
    { tPattern: "あさ(?!って|ごはん|めし|ひ|がお)", time: 9, dayPart: "am" },
    {
        tPattern: "昼(?!顔|食|飯|ごはん|メシ|休み|休憩|寝|勤|便|興行|ドラ|帯|行灯)",
        time: 12,
        dayPart: "pm",
        am: [10, 11],
    },
    { tPattern: "夕方|ゆうがた|夕刻", time: 18, dayPart: "pm" },
];

export const HOLIDAY_DEFINITIONS: HolidayDefinition[] = [
    {
        synonyms: ["元日", "元旦", "お正月", "正月"],
        date: { month: 1, day: 1 },
        falseFriends: ["正月休み", "お正月飾り", "元旦マラソン"],
    },
    {
        synonyms: ["ひな祭り", "ひなまつり", "雛祭り", "桃の節句"],
        date: { month: 3, day: 3 },
        falseFriends: ["ひな祭りケーキ", "ひなまつり会", "雛祭り人形", "桃の節句弁当"],
    },
    {
        synonyms: ["こどもの日", "こどものひ", "子どもの日", "子供の日"],
        date: { month: 5, day: 5 },
        falseFriends: [],
    },
    {
        synonyms: ["大晦日", "おおみそか"],
        date: { month: 12, day: 31 },
        falseFriends: [],
    },
];

export const RELATIVE_YEAR_DEFINITIONS: RelativeYearDefinition[] = [
    { synonyms: ["一昨年", "おととし"], offset: -2 },
    { synonyms: ["去年", "昨年"], offset: -1 },
    { synonyms: ["今年"], offset: 0 },
    { synonyms: ["来年"], offset: 1 },
    { synonyms: ["再来年"], offset: 2 },
];

export const NAMED_PERIOD_DEFINITIONS: NamedPeriodDefinition[] = [
    { synonyms: ["一昨年", "おととし"], duration: { year: -2 } },
    { synonyms: ["去年", "昨年", "前年"], duration: { year: -1 } },
    { synonyms: ["今年"], duration: { year: 0 } },
    { synonyms: ["来年", "翌年"], duration: { year: 1 } },
    { synonyms: ["再来年"], duration: { year: 2 } },

    { synonyms: ["先々月", "前々月"], duration: { month: -2 } },
    { synonyms: ["先月", "前月"], duration: { month: -1 } },
    { synonyms: ["今月"], duration: { month: 0 } },
    { synonyms: ["来月", "翌月"], duration: { month: 1 } },
    { synonyms: ["再来月"], duration: { month: 2 } },

    { synonyms: ["先々週", "前々週"], duration: { week: -2 } },
    { synonyms: ["先週", "前週"], duration: { week: -1 } },
    { synonyms: ["今週"], duration: { week: 0 } },
    { synonyms: ["来週", "翌週"], duration: { week: 1 } },
    { synonyms: ["再来週"], duration: { week: 2 } },
];

export const DURATION_UNITS: Partial<Record<keyof Duration, string[]>> = {
    day: ["日"],
    week: ["週間", "週"],
    month: ["か月", "ケ月", "ヶ月", "カ月", "ヵ月", "箇月", "個月", "月"],
    year: ["年"],
};

export const ERA_OFFSET: JLookup = {
    "西暦": 0,
    "明治": 1867,
    "大正": 1911,
    "昭和": 1925,
    "平成": 1988,
    "令和": 2018,
};
export const ERA_PATTERN = Object.keys(ERA_OFFSET).join("|");
export const YEAR_NUM = "[0-9０-９一二三四五六七八九十百千万〇]";
export const ABSOLUTE_YEAR = `(?:(?:西暦)?(?<year>${YEAR_NUM}{1,4}|元)|(?<era>${ERA_PATTERN})(?<eraYear>${YEAR_NUM}{1,3}|元))年`;

/**
 * to-hankaku.js
 * convert to ascii code strings.
 *
 * @version 1.0.1
 * @author think49
 * @url https://gist.github.com/964592
 * @license http://www.opensource.org/licenses/mit-license.php (The MIT License)
 */
export function toHankaku(text: string) {
    return String(text)
        .replace(/\u2019/g, "\u0027")
        .replace(/\u201D/g, "\u0022")
        .replace(/\u3000/g, "\u0020")
        .replace(/\uFFE5/g, "\u00A5")
        .replace(
            /[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g,
            alphaNum
        );
}

function alphaNum(token) {
    return String.fromCharCode(token.charCodeAt(0) - 65248);
}

export function jaStringToNumber(text: string) {
    let number = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === "十") {
            number = number === 0 ? NUMBER[char] : number * NUMBER[char];
        } else {
            number += NUMBER[char];
        }
    }

    return number;
}

export function parseJapaneseNumber(text: string): number {
    const number = parseInt(toHankaku(text));
    return isNaN(number) ? jaStringToNumber(text) : number;
}

export function convertJapaneseYear(yearText: string, era?: string): number {
    const year = yearText === "元" ? 1 : parseJapaneseNumber(yearText);
    return era ? year + ERA_OFFSET[era] : year;
}
