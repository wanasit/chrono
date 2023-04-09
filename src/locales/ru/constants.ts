import { OpUnitType, QUnitType } from "dayjs";
import { matchAnyPattern, repeatedTimeunitPattern } from "../../utils/pattern";
import { findMostLikelyADYear } from "../../calculation/years";
import { TimeUnits } from "../../utils/timeunits";

export const REGEX_PARTS = {
    leftBoundary: "([^\\p{L}\\p{N}_]|^)",
    rightBoundary: "(?=[^\\p{L}\\p{N}_]|$)",
    flags: "iu",
};

export const WEEKDAY_DICTIONARY: { [word: string]: number } = {
    воскресенье: 0,
    воскресенья: 0,
    вск: 0,
    "вск.": 0,
    понедельник: 1,
    понедельника: 1,
    пн: 1,
    "пн.": 1,
    вторник: 2,
    вторника: 2,
    вт: 2,
    "вт.": 2,
    среда: 3,
    среды: 3,
    среду: 3,
    ср: 3,
    "ср.": 3,
    четверг: 4,
    четверга: 4,
    чт: 4,
    "чт.": 4,
    пятница: 5,
    пятницу: 5,
    пятницы: 5,
    пт: 5,
    "пт.": 5,
    суббота: 6,
    субботу: 6,
    субботы: 6,
    сб: 6,
    "сб.": 6,
};

export const FULL_MONTH_NAME_DICTIONARY: { [word: string]: number } = {
    январь: 1,
    января: 1,
    январе: 1,
    февраль: 2,
    февраля: 2,
    феврале: 2,
    март: 3,
    марта: 3,
    марте: 3,
    апрель: 4,
    апреля: 4,
    апреле: 4,
    май: 5,
    мая: 5,
    мае: 5,
    июнь: 6,
    июня: 6,
    июне: 6,
    июль: 7,
    июля: 7,
    июле: 7,
    август: 8,
    августа: 8,
    августе: 8,
    сентябрь: 9,
    сентября: 9,
    сентябре: 9,
    октябрь: 10,
    октября: 10,
    октябре: 10,
    ноябрь: 11,
    ноября: 11,
    ноябре: 11,
    декабрь: 12,
    декабря: 12,
    декабре: 12,
};

export const MONTH_DICTIONARY: { [word: string]: number } = {
    ...FULL_MONTH_NAME_DICTIONARY,
    янв: 1,
    "янв.": 1,
    фев: 2,
    "фев.": 2,
    мар: 3,
    "мар.": 3,
    апр: 4,
    "апр.": 4,
    авг: 8,
    "авг.": 8,
    сен: 9,
    "сен.": 9,
    окт: 10,
    "окт.": 10,
    ноя: 11,
    "ноя.": 11,
    дек: 12,
    "дек.": 12,
};

export const INTEGER_WORD_DICTIONARY: { [word: string]: number } = {
    один: 1,
    одна: 1,
    одной: 1,
    одну: 1,
    две: 2,
    два: 2,
    двух: 2,
    три: 3,
    трех: 3,
    трёх: 3,
    четыре: 4,
    четырех: 4,
    четырёх: 4,
    пять: 5,
    пяти: 5,
    шесть: 6,
    шести: 6,
    семь: 7,
    семи: 7,
    восемь: 8,
    восьми: 8,
    девять: 9,
    девяти: 9,
    десять: 10,
    десяти: 10,
    одиннадцать: 11,
    одиннадцати: 11,
    двенадцать: 12,
    двенадцати: 12,
};

export const ORDINAL_WORD_DICTIONARY: { [word: string]: number } = {
    первое: 1,
    первого: 1,
    второе: 2,
    второго: 2,
    третье: 3,
    третьего: 3,
    четвертое: 4,
    четвертого: 4,
    пятое: 5,
    пятого: 5,
    шестое: 6,
    шестого: 6,
    седьмое: 7,
    седьмого: 7,
    восьмое: 8,
    восьмого: 8,
    девятое: 9,
    девятого: 9,
    десятое: 10,
    десятого: 10,
    одиннадцатое: 11,
    одиннадцатого: 11,
    двенадцатое: 12,
    двенадцатого: 12,
    тринадцатое: 13,
    тринадцатого: 13,
    четырнадцатое: 14,
    четырнадцатого: 14,
    пятнадцатое: 15,
    пятнадцатого: 15,
    шестнадцатое: 16,
    шестнадцатого: 16,
    семнадцатое: 17,
    семнадцатого: 17,
    восемнадцатое: 18,
    восемнадцатого: 18,
    девятнадцатое: 19,
    девятнадцатого: 19,
    двадцатое: 20,
    двадцатого: 20,
    "двадцать первое": 21,
    "двадцать первого": 21,
    "двадцать второе": 22,
    "двадцать второго": 22,
    "двадцать третье": 23,
    "двадцать третьего": 23,
    "двадцать четвертое": 24,
    "двадцать четвертого": 24,
    "двадцать пятое": 25,
    "двадцать пятого": 25,
    "двадцать шестое": 26,
    "двадцать шестого": 26,
    "двадцать седьмое": 27,
    "двадцать седьмого": 27,
    "двадцать восьмое": 28,
    "двадцать восьмого": 28,
    "двадцать девятое": 29,
    "двадцать девятого": 29,
    "тридцатое": 30,
    "тридцатого": 30,
    "тридцать первое": 31,
    "тридцать первого": 31,
};

export const TIME_UNIT_DICTIONARY: { [word: string]: OpUnitType | QUnitType } = {
    сек: "second",
    секунда: "second",
    секунд: "second",
    секунды: "second",
    секунду: "second",
    секундочка: "second",
    секундочки: "second",
    секундочек: "second",
    секундочку: "second",
    мин: "minute",
    минута: "minute",
    минут: "minute",
    минуты: "minute",
    минуту: "minute",
    минуток: "minute",
    минутки: "minute",
    минутку: "minute",
    минуточек: "minute",
    минуточки: "minute",
    минуточку: "minute",
    час: "hour",
    часов: "hour",
    часа: "hour",
    часу: "hour",
    часиков: "hour",
    часика: "hour",
    часике: "hour",
    часик: "hour",
    день: "d",
    дня: "d",
    дней: "d",
    суток: "d",
    сутки: "d",
    неделя: "week",
    неделе: "week",
    недели: "week",
    неделю: "week",
    недель: "week",
    недельке: "week",
    недельки: "week",
    неделек: "week",
    месяц: "month",
    месяце: "month",
    месяцев: "month",
    месяца: "month",
    квартал: "quarter",
    квартале: "quarter",
    кварталов: "quarter",
    год: "year",
    года: "year",
    году: "year",
    годов: "year",
    лет: "year",
    годик: "year",
    годика: "year",
    годиков: "year",
};

//-----------------------------

export const NUMBER_PATTERN = `(?:${matchAnyPattern(
    INTEGER_WORD_DICTIONARY
)}|[0-9]+|[0-9]+\\.[0-9]+|пол|несколько|пар(?:ы|у)|\\s{0,3})`;

export function parseNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return INTEGER_WORD_DICTIONARY[num];
    }
    if (num.match(/несколько/)) {
        return 3;
    } else if (num.match(/пол/)) {
        return 0.5;
    } else if (num.match(/пар/)) {
        return 2;
    } else if (num === "") {
        return 1;
    }
    return parseFloat(num);
}

//-----------------------------

export const ORDINAL_NUMBER_PATTERN = `(?:${matchAnyPattern(ORDINAL_WORD_DICTIONARY)}|[0-9]{1,2}(?:го|ого|е|ое)?)`;
export function parseOrdinalNumberPattern(match: string): number {
    const num = match.toLowerCase();
    if (ORDINAL_WORD_DICTIONARY[num] !== undefined) {
        return ORDINAL_WORD_DICTIONARY[num];
    }
    return parseInt(num);
}

//-----------------------------

const year = "(?:\\s+(?:году|года|год|г|г.))?";
export const YEAR_PATTERN = `(?:[1-9][0-9]{0,3}${year}\\s*(?:н.э.|до н.э.|н. э.|до н. э.)|[1-2][0-9]{3}${year}|[5-9][0-9]${year})`;
export function parseYear(match: string): number {
    if (/(год|года|г|г.)/i.test(match)) {
        match = match.replace(/(год|года|г|г.)/i, "");
    }

    if (/(до н.э.|до н. э.)/i.test(match)) {
        //Before Common Era
        match = match.replace(/(до н.э.|до н. э.)/i, "");
        return -parseInt(match);
    }

    if (/(н. э.|н.э.)/i.test(match)) {
        //Common Era
        match = match.replace(/(н. э.|н.э.)/i, "");
        return parseInt(match);
    }

    const rawYearNumber = parseInt(match);
    return findMostLikelyADYear(rawYearNumber);
}

//-----------------------------

const SINGLE_TIME_UNIT_PATTERN = `(${NUMBER_PATTERN})\\s{0,3}(${matchAnyPattern(TIME_UNIT_DICTIONARY)})`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");

export const TIME_UNITS_PATTERN = repeatedTimeunitPattern(`(?:(?:около|примерно)\\s{0,3})?`, SINGLE_TIME_UNIT_PATTERN);

export function parseTimeUnits(timeunitText): TimeUnits {
    const fragments = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        collectDateTimeFragment(fragments, match);
        remainingText = remainingText.substring(match[0].length).trim();
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    return fragments;
}

function collectDateTimeFragment(fragments, match) {
    const num = parseNumberPattern(match[1]);
    const unit = TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
    fragments[unit] = num;
}
