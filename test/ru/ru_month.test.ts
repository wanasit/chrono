import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Month-Year expression", function () {
    testSingleCase(chrono.ru, "Сентябрь 2012", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Сентябрь 2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "сен 2012", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("сен 2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "сен. 2012", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("сен. 2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "сен-2012", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("сен-2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });
});

test("Test - Month-Only expression", function () {
    testSingleCase(chrono.ru, "в январе", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в январе");
        expect(result.start).toBeDate(new Date(2021, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "в янв", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в янв");
        expect(result.start).toBeDate(new Date(2021, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "май", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("май");
        expect(result.start).toBeDate(new Date(2021, 5 - 1, 1, 12));
    });
});

test("Test - Month expression in context", function () {
    testSingleCase(chrono.ru, "Это было в сентябре 2012 перед новым годом", (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("в сентябре 2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono.ru, "авг 96", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("авг 96");
        expect(result.start).toBeDate(new Date(1996, 8 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "96 авг 96", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("авг 96");
        expect(result.start).toBeDate(new Date(1996, 8 - 1, 1, 12));
    });
});
