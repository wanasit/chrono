import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src";

test("Test - Parsing text offset", function () {
    testSingleCase(chrono, "  11:00 ", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(2);
        expect(result.text).toBe("11:00");
    });

    testSingleCase(chrono, "2020 alle  11:00 ", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("alle  11:00");
    });
});

test("Test - Time expression", function () {
    testSingleCase(chrono, "20:32:13", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(32);
        expect(result.start.get("second")).toBe(13);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });
});

test("Test - Time range expression", function () {
    testSingleCase(chrono, "10:00:00 - 21:45:00", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.end.get("hour")).toBe(21);
        expect(result.end.get("minute")).toBe(45);
        expect(result.end.get("second")).toBe(0);
        expect(result.end.get("meridiem")).toBe(Meridiem.PM);
    });
});

test("Test - Casual time number expression", function () {
    testSingleCase(chrono, "11:00 di sera", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(23);
    });

    testSingleCase(chrono, "23:00", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(23);
    });

    testSingleCase(chrono, "6:00", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "6:00 del pomeriggio", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });
});

test("Test - Time range's meridiem handling", function () {
    testSingleCase(chrono, "22:00-23:00", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);

        expect(result.end.get("year")).toBe(2016);
        expect(result.end.get("month")).toBe(10);
        expect(result.end.get("day")).toBe(1);
        expect(result.end.get("hour")).toBe(23);
    });

    testSingleCase(chrono, "8:00-11:00 di sera", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.end.get("year")).toBe(2016);
        expect(result.end.get("month")).toBe(10);
        expect(result.end.get("day")).toBe(1);
        expect(result.end.get("hour")).toBe(23);
        expect(result.end.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono, "7:00-8:00", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(7);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.end.get("year")).toBe(2016);
        expect(result.end.get("month")).toBe(10);
        expect(result.end.get("day")).toBe(1);
        expect(result.end.get("hour")).toBe(8);
        expect(result.end.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "13:00-15:00", new Date(2012, 7, 10), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
        expect(result.start.isCertain("meridiem")).toBe(true);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(Meridiem.PM);
        expect(result.end.isCertain("meridiem")).toBe(true);
    });

    testSingleCase(chrono, "1:00-3:00", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(1);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
        expect(result.start.isCertain("meridiem")).toBe(true);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(3);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(Meridiem.AM);
        expect(result.end.isCertain("meridiem")).toBe(false);
    });

    testSingleCase(chrono, "23:00-3:00", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(23);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
        expect(result.start.isCertain("meridiem")).toBe(true);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(11);
        expect(result.end.get("hour")).toBe(3);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(Meridiem.AM);
        expect(result.end.isCertain("meridiem")).toBe(false);
    });

    testSingleCase(chrono, "0:00-3:00", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(3);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(Meridiem.AM);
        expect(result.end.isCertain("meridiem")).toBe(true);
    });

    testSingleCase(chrono, "12:00-15:00", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(Meridiem.PM);
        expect(result.end.isCertain("meridiem")).toBe(true);
    });
});
