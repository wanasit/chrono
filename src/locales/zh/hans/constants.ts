export const NUMBER = {
    "零": 0,
    "〇": 0,
    "一": 1,
    "二": 2,
    "两": 2,
    "三": 3,
    "四": 4,
    "五": 5,
    "六": 6,
    "七": 7,
    "八": 8,
    "九": 9,
    "十": 10,
};

export const WEEKDAY_OFFSET = {
    "天": 0,
    "日": 0,
    "一": 1,
    "二": 2,
    "三": 3,
    "四": 4,
    "五": 5,
    "六": 6,
};

export function zhStringToNumber(text: string) {
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

export function zhStringToYear(text: string) {
    let string = "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        string = string + NUMBER[char];
    }

    return parseInt(string);
}
