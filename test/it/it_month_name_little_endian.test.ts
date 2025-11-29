import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", function () {
    testSingleCase(chrono.it, "10 agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 agosto 2012");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.it, "3 febbraio 82", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1982);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(3);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 febbraio 82");

        expect(result.start).toBeDate(new Date(1982, 1, 3, 12));
    });

    testSingleCase(chrono.it, "domenica 15 settembre", new Date(2013, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("domenica 15 settembre");

        expect(result.start).toBeDate(new Date(2013, 8, 15, 12));
    });

    testSingleCase(chrono.it, "La scadenza è il 10 agosto", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("10 agosto");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.it, "La scadenza è martedì 10 gennaio", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("martedì 10 gennaio");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 0, 10, 12));
    });
});

test("Test - Range expression", function () {
    testSingleCase(chrono.it, "10 - 22 agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 - 22 agosto 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 7, 22, 12));
    });

    testSingleCase(chrono.it, "10 agosto - 12 settembre", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 agosto - 12 settembre");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 8, 12, 12));
    });

    testSingleCase(chrono.it, "10 agosto - 12 settembre 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 agosto - 12 settembre 2013");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2013);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2013, 8, 12, 12));
    });
});

test("Test - Combined expression", function () {
    testSingleCase(chrono.it, "5 maggio 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 maggio 12:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2013, 4, 5, 12, 0));
    });

    testSingleCase(chrono.it, "5 maggio alle 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 maggio alle 12:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2013, 4, 5, 12, 0));
    });
});

test("Test - Ordinal Words", function () {
    testSingleCase(chrono.it, "primo maggio", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("primo maggio");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(1);

        expect(result.start).toBeDate(new Date(2013, 4, 1, 12));
    });

    testSingleCase(chrono.it, "secondo agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("secondo agosto 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(2);

        expect(result.start).toBeDate(new Date(2012, 7, 2, 12));
    });
});

test("Test - Impossible Dates and Unexpected Results", function () {
    testUnexpectedResult(chrono.it, "32 agosto 2014");

    testUnexpectedResult(chrono.it, "29 febbraio 2014");

    testUnexpectedResult(chrono.it, "32 agosto");

    testUnexpectedResult(chrono.it, "fare qualcosa il 32");
});
