import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.it, "Proviamo a incontrarci alle 6:00", new Date(2012, 7, 10, 8, 9), (result) => {
        expect(result.index).toBe(23);
        expect(result.text).toBe("alle 6:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0));
    });

    testSingleCase(chrono.it, "Proviamo a incontrarci alle 6:00 PM", new Date(2012, 7, 10, 8, 9), (result) => {
        expect(result.index).toBe(23);
        expect(result.text).toBe("alle 6:00 PM");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 0));
    });

    testSingleCase(chrono.it, "Proviamo a incontrarci alle 6:00 AM", new Date(2012, 7, 10, 8, 9), (result) => {
        expect(result.index).toBe(23);
        expect(result.text).toBe("alle 6:00 AM");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0));
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.it, "8:00 - 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8:00 - 12:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start.isCertain("meridiem")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(12);
        expect(result.end.get("minute")).toBe(0);

        expect(result.end.isCertain("meridiem")).toBe(true);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12, 0));
    });

    testSingleCase(chrono.it, " dalle 6:00 alle 9:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("dalle 6:00 alle 9:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(9);
        expect(result.end.get("minute")).toBe(0);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 9, 0));
    });
});

test("Test - Date + Time Expression", function () {
    testSingleCase(chrono.it, "qualcosa alle 6:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("alle 6:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);
    });
});

test("Test - Time Expression's Meridiem imply", function () {
    testSingleCase(chrono.it, "1pm a 3", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1pm a 3");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.isCertain("meridiem")).toBe(true);

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.isCertain("meridiem")).toBe(true);
    });
});

test("Test - Random date + time expression", function () {
    testSingleCase(chrono.it, "sabato 30 aprile 2016, 10:00", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("sabato 30 aprile 2016, 10:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.it, "sabato 30 aprile 2016 alle 10:00", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("sabato 30 aprile 2016 alle 10:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.it, "2020");

    testUnexpectedResult(chrono.it, "2020  ");

    testUnexpectedResult(chrono.it, "  2020");

    testUnexpectedResult(chrono.it, "1234567890");
});

test("Test - Time relative to reference", function () {
    testSingleCase(chrono.it, "alle 10:00", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 10, 0));
    });

    testSingleCase(chrono.it, "alle 10:00", new Date(2012, 7, 10, 12, 14), { forwardDate: true }, (result) => {
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 10, 0));
    });
});
