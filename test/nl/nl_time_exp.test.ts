import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src";

test("Test - Parsing text offset", function () {
    testSingleCase(chrono.nl, "  11:00 ", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(2);
        expect(result.text).toBe("11:00");
    });

    testSingleCase(chrono.nl, "2020 om  11:00 ", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("om  11:00");
    });
});

test("Test - Time expression", function () {
    testSingleCase(chrono.nl, "20:32:13", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(32);
        expect(result.start.get("second")).toBe(13);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });
});

test("Test - Time range expression", function () {
    testSingleCase(chrono.nl, "10:00:00 - 21:45:00", new Date(2016, 10 - 1, 1, 8), (result, text) => {
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
    testSingleCase(chrono.nl, "23:00 's avonds", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(23);
    });

    testSingleCase(chrono.nl, "23:00 vanavond", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(23);
    });

    testSingleCase(chrono.nl, "6:00 's ochtends", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.nl, "6:00 in de namiddag", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });
});
