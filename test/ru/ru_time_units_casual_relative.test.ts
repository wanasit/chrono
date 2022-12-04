import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Positive time units", () => {
    testSingleCase(chrono.ru, "следующие 2 недели", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 15, 12));
    });

    testSingleCase(chrono.ru, "следующие 2 дня", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 3, 12));
    });

    testSingleCase(chrono.ru, "следующие два года", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2018, 10 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "следующие 2 недели 3 дня", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 18, 12));
    });

    testSingleCase(chrono.ru, "через пару минут", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 12, 2));
    });

    testSingleCase(chrono.ru, "через полчаса", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 12, 30));
    });

    testSingleCase(chrono.ru, "через 2 часа", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 14));
    });

    testSingleCase(chrono.ru, "спустя 2 часа", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 14));
    });

    testSingleCase(chrono.ru, "через три месяца", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "через неделю", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 8, 12));
    });

    testSingleCase(chrono.ru, "через месяц", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 11 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "через год", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2021, 11 - 1, 22, 12, 11, 32, 6));
    });

    testSingleCase(chrono.ru, "спустя год", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2021, 11 - 1, 22, 12, 11, 32, 6));
    });
});

test("Test - Negative time units", () => {
    testSingleCase(chrono.ru, "прошлые 2 недели", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 9 - 1, 17, 12));
    });

    testSingleCase(chrono.ru, "прошлые два дня", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 9 - 1, 29, 12));
    });
});

test("Test - Plus '+' sign", () => {
    testSingleCase(chrono.ru.casual, "+15 минут", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 29));
    });

    testSingleCase(chrono.ru.casual, "+15мин", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 29));
    });

    testSingleCase(chrono.ru.casual, "+1 день 2 часа", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 11, 14, 14));
    });
});

test("Test - Minus '-' sign", () => {
    testSingleCase(chrono.ru.casual, "-3 года", new Date(2015, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 14));
    });
});
