import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", () => {
    testSingleCase(chrono.uk, "10.08.2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10.08.2012");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.uk, "10 серпня 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 серпня 2012");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.uk, "3 лют 82", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("3 лют 82");
        expect(result.start).toBeDate(new Date(1982, 2 - 1, 3, 12));
    });

    testSingleCase(chrono.uk, "Дедлайн 10 серпня", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("10 серпня");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.uk, "Дедлайн Четвер, 10 січня", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("Четвер, 10 січня");
        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });
});

test("Test - Single expression with separators", () => {
    testSingleCase(chrono.uk, "10-серпня 2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.uk, "10-серпня-2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.uk, "10/серпня 2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.uk, "10/серпня/2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });
});

test("Test - Range expression", () => {
    testSingleCase(chrono.uk, "10 - 22 серпня 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 - 22 серпня 2012");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.uk, "із 10 по 22 серпня 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("із 10 по 22 серпня 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.uk, "10 серпня - 12 вересня", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 серпня - 12 вересня");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
        expect(result.end).toBeDate(new Date(2012, 9 - 1, 12, 12));
    });

    testSingleCase(chrono.uk, "10 серпня - 12 вересня 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 серпня - 12 вересня 2013");

        expect(result.start).toBeDate(new Date(2013, 8 - 1, 10, 12));
        expect(result.end).toBeDate(new Date(2013, 9 - 1, 12, 12));
    });
});

test("Test - Combined expression", () => {
    testSingleCase(chrono.uk, "5 травня 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 травня 12:00");
        expect(result.start).toBeDate(new Date(2012, 5 - 1, 5, 12, 0));
    });
});

test("Test - Ordinal Words", () => {
    testSingleCase(chrono.uk, "п'яте травня", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("п'яте травня");
        expect(result.start).toBeDate(new Date(2012, 5 - 1, 5, 12, 0));
    });
});

test("Test - Ordinal Words", () => {
    testSingleCase(chrono.uk, "двадцять п'яте травня", new Date(2012, 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("двадцять п'яте травня");
        expect(result.start).toBeDate(new Date(2012, 5 - 1, 25, 12, 0));
    });
});

test("Test - little endian date followed by time", () => {
    testSingleCase(chrono.uk, "24го жовтня, 9:00", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("24го жовтня, 9:00");
        expect(result.start).toBeDate(new Date(2017, 10 - 1, 24, 9));
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono.uk, "03 сер 96", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("03 сер 96");
        expect(result.start).toBeDate(new Date(1996, 8 - 1, 3, 12));
    });
});

test("Test - Forward Option", () => {
    testSingleCase(chrono.uk.casual, "22-23 лют в 7", new Date(2016, 3 - 1, 15), { forwardDate: true }, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("22-23 лют в 7");
        expect(result.start).toBeDate(new Date(2017, 2 - 1, 22, 7));
        expect(result.end).toBeDate(new Date(2017, 2 - 1, 23, 7));
    });
});

test("Test - Impossible Dates (Strict Mode)", function () {
    testUnexpectedResult(chrono.uk.strict, "32 серпня 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.uk.strict, "29 лютого 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.uk.strict, "32 серпня", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.uk.strict, "29 лютого", new Date(2013, 7, 10));
});
