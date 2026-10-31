/**
 * Korean weekdays. "월요일" (Monday) is written as the weekday character + "요일".
 */
export const WEEKDAY_OFFSET: { [word: string]: number } = {
    "일": 0, // 일요일 Sunday
    "월": 1, // 월요일 Monday
    "화": 2, // 화요일 Tuesday
    "수": 3, // 수요일 Wednesday
    "목": 4, // 목요일 Thursday
    "금": 5, // 금요일 Friday
    "토": 6, // 토요일 Saturday
};

/**
 * Native Korean numbers used for hours: "세 시" (3 o'clock), "열두 시" (12 o'clock).
 * Korean uses native numbers for hours and Sino-Korean numbers (arabic digits) for minutes and dates.
 */
export const HOUR_WORD: { [word: string]: number } = {
    "한": 1,
    "두": 2,
    "세": 3,
    "네": 4,
    "다섯": 5,
    "여섯": 6,
    "일곱": 7,
    "여덟": 8,
    "아홉": 9,
    "열": 10,
    "열한": 11,
    "열두": 12,
};

export function parseHour(text: string): number {
    if (/^\d+$/.test(text)) return parseInt(text);
    return HOUR_WORD[text.replace(/\s/g, "")];
}

/**
 * Relative week words: "지난주" (last week), "이번주" (this week), "다음주" (next week), "다다음주" (the week after next).
 */
export const WEEK_OFFSET: { [word: string]: number } = {
    "지난": -1,
    "저번": -1,
    "이번": 0,
    "다음": 1,
    "담": 1,
    "다다음": 2,
};
