import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Time expression", function () {
    testSingleCase(chrono.ru, "20:32:13", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 20, 32, 13));
    });
});

test("Test - Time range expression", function () {
    testSingleCase(chrono.ru, "10:00:00 - 21:45:01", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 10));
        expect(result.end).toBeDate(new Date(2016, 10 - 1, 1, 21, 45, 1));
    });
});

test("Test - Casual time number expression", function () {
    testSingleCase(chrono.ru, "в 11 утра", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 11));
    });

    testSingleCase(chrono.ru, "в 11 вечера", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 23));
    });
});

test("Test - Time range's meridiem handling", function () {
    testSingleCase(chrono.ru, "с 10 до 11 утра", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 10));
        expect(result.end).toBeDate(new Date(2016, 10 - 1, 1, 11));
    });
    testSingleCase(chrono.ru, "с 10 до 11 вечера", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 22));
        expect(result.end).toBeDate(new Date(2016, 10 - 1, 1, 23));
    });
});

test("Test - Parsing causal positive cases", function () {
    testSingleCase(chrono.ru.casual, "в 1", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в 1");
        expect(result.start.get("hour")).toBe(1);
    });

    testSingleCase(chrono.ru.casual, "в 12", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в 12");
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ru.casual, "в 12.30", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в 12.30");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(30);
    });
});

test("Test - Parsing negative cases : [year-like] pattern", function () {
    testUnexpectedResult(chrono.ru, "2020");

    testUnexpectedResult(chrono.ru, "2020  ");
});

test("Test - Parsing negative cases : 'at [some numbers]'", function () {
    testUnexpectedResult(chrono.ru, "Температура 101,194 градусов!");

    testUnexpectedResult(chrono.ru, "Температура 101 градусов!");

    testUnexpectedResult(chrono.ru, "Температура 10.1");
});

test("Test - Parsing negative cases : 'at [some numbers] - [some numbers]'", function () {
    testUnexpectedResult(chrono.ru, "Это в 10.1 - 10.12");

    testUnexpectedResult(chrono.ru, "Это в 10 - 10.1");
});

test("Test - Parsing negative cases (Strict)", function () {
    testUnexpectedResult(chrono.ru.strict, "Это в 101,194 телефон!");

    testUnexpectedResult(chrono.ru.strict, "Это в 101 стул!");

    testUnexpectedResult(chrono.ru.strict, "Это в 10.1");

    testUnexpectedResult(chrono.ru.strict, "Это в 10");

    testUnexpectedResult(chrono.ru.strict, "2020");
});

test("Test - Parsing negative cases : 'at [some numbers] - [some numbers]' (Strict)", function () {
    testUnexpectedResult(chrono.ru.strict, "Это в 10.1 - 10.12");

    testUnexpectedResult(chrono.ru.strict, "Это в 10 - 10.1");

    testUnexpectedResult(chrono.ru.strict, "Это в 10 - 20");

    testUnexpectedResult(chrono.ru.strict, "7-730");
});
