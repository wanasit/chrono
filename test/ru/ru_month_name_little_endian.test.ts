import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", () => {
    testSingleCase(chrono.ru, "10.08.2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10.08.2012");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.ru, "10 августа 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 августа 2012");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.ru, "третье фев 82", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("третье фев 82");
        expect(result.start).toBeDate(new Date(1982, 2 - 1, 3, 12));
    });

    testSingleCase(chrono.ru, "Дедлайн 10 августа", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("10 августа");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.ru, "Дедлайн Четверг, 10 января", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("Четверг, 10 января");
        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });
});

test("Test - Single expression with separators", () => {
    testSingleCase(chrono.ru, "10-августа 2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.ru, "10-августа-2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.ru, "10/августа 2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.ru, "10/августа/2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });
});

test("Test - Range expression", () => {
    testSingleCase(chrono.ru, "10 - 22 августа 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 - 22 августа 2012");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.ru, "с 10 по 22 августа 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("с 10 по 22 августа 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.ru, "10 августа - 12 сентября", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 августа - 12 сентября");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
        expect(result.end).toBeDate(new Date(2012, 9 - 1, 12, 12));
    });

    testSingleCase(chrono.ru, "10 августа - 12 сентября 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 августа - 12 сентября 2013");

        expect(result.start).toBeDate(new Date(2013, 8 - 1, 10, 12));
        expect(result.end).toBeDate(new Date(2013, 9 - 1, 12, 12));
    });
});

test("Test - Combined expression", () => {
    testSingleCase(chrono.ru, "5 мая 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 мая 12:00");
        expect(result.start).toBeDate(new Date(2012, 5 - 1, 5, 12, 0));
    });
});

test("Test - Ordinal Words", () => {
    testSingleCase(chrono.ru, "двадцать пятое мая", new Date(2012, 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("двадцать пятое мая");
        expect(result.start).toBeDate(new Date(2012, 5 - 1, 25, 12, 0));
    });
    testSingleCase(chrono.ru, "двадцать пятое мая 2020 года", new Date(2012, 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("двадцать пятое мая 2020 года");
        expect(result.start).toBeDate(new Date(2020, 5 - 1, 25, 12, 0));
    });
});

test("Test - little endian date followed by time", () => {
    testSingleCase(chrono.ru, "24го октября, 9:00", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("24го октября, 9:00");
        expect(result.start).toBeDate(new Date(2017, 10 - 1, 24, 9));
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono.ru, "03 авг 96", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("03 авг 96");
        expect(result.start).toBeDate(new Date(1996, 8 - 1, 3, 12));
    });
});

test("Test - Forward Option", () => {
    testSingleCase(chrono.ru.casual, "22-23 фев в 7", new Date(2016, 3 - 1, 15), { forwardDate: true }, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("22-23 фев в 7");
        expect(result.start).toBeDate(new Date(2017, 2 - 1, 22, 7));
        expect(result.end).toBeDate(new Date(2017, 2 - 1, 23, 7));
    });
});

test("Test - Impossible Dates (Strict Mode)", function () {
    testUnexpectedResult(chrono.ru.strict, "32 августа 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.ru.strict, "29 февраля 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.ru.strict, "32 августа", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.ru.strict, "29 февраля", new Date(2013, 7, 10));
});
