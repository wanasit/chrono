import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Time expression", function () {
    testSingleCase(chrono.uk, "20:32:13", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 20, 32, 13));
    });
});

test("Test - Time range expression", function () {
    testSingleCase(chrono.uk, "10:00:00 - 21:45:01", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 10));
        expect(result.end).toBeDate(new Date(2016, 10 - 1, 1, 21, 45, 1));
    });
});

test("Test - Casual time number expression", function () {
    testSingleCase(chrono.uk, "об 11 ранку", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 11));
    });

    testSingleCase(chrono.uk, "в 11 вечора", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 23));
    });
});

test("Test - Time range's meridiem handling", function () {
    testSingleCase(chrono.uk, "з 10 до 11 ранку", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 10));
        expect(result.end).toBeDate(new Date(2016, 10 - 1, 1, 11));
    });
    testSingleCase(chrono.uk, "із 10 до 11 вечора", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 22));
        expect(result.end).toBeDate(new Date(2016, 10 - 1, 1, 23));
    });
});

test("Test - Parsing causal positive cases", function () {
    testSingleCase(chrono.uk.casual, "в 1", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в 1");
        expect(result.start.get("hour")).toBe(1);
    });

    testSingleCase(chrono.uk.casual, "о 12", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("о 12");
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.uk.casual, "в 12.30", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в 12.30");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(30);
    });
});

test("Test - Parsing negative cases : [year-like] pattern", function () {
    testUnexpectedResult(chrono.uk, "2020");

    testUnexpectedResult(chrono.uk, "2020  ");
});

test("Test - Parsing negative cases : 'at [some numbers]'", function () {
    testUnexpectedResult(chrono.uk, "Температура 101,194 градусів!");

    testUnexpectedResult(chrono.uk, "Температура 101 градусів!");

    testUnexpectedResult(chrono.uk, "Температура 10.1");
});

test("Test - Parsing negative cases : 'at [some numbers] - [some numbers]'", function () {
    testUnexpectedResult(chrono.uk, "Це в 10.1 - 10.12");

    testUnexpectedResult(chrono.uk, "Це в 10 - 10.1");
});

test("Test - Parsing negative cases (Strict)", function () {
    testUnexpectedResult(chrono.uk.strict, "Це в 101,194 телефон!");

    testUnexpectedResult(chrono.uk.strict, "Це в 101 стіл!");

    testUnexpectedResult(chrono.uk.strict, "Це в 10.1");

    testUnexpectedResult(chrono.uk.strict, "Це в 10");

    testUnexpectedResult(chrono.uk.strict, "2020");
});

test("Test - Parsing negative cases : 'at [some numbers] - [some numbers]' (Strict)", function () {
    testUnexpectedResult(chrono.uk.strict, "Це в 10.1 - 10.12");

    testUnexpectedResult(chrono.uk.strict, "Це в 10 - 10.1");

    testUnexpectedResult(chrono.uk.strict, "Це в 10 - 20");

    testUnexpectedResult(chrono.uk.strict, "7-730");
});
