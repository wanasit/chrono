import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src";

test("Test - Parsing text offset", function () {
    testSingleCase(chrono, "  11 AM ", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(2);
        expect(result.text).toBe("11 AM");
    });

    testSingleCase(chrono, "2020 at  11 AM ", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("at  11 AM");
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
    testSingleCase(chrono, "11 at night", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(23);
    });

    testSingleCase(chrono, "11 tonight", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(23);
    });

    testSingleCase(chrono, "6 in the morning", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "6 in the afternoon", new Date(2016, 10 - 1, 1, 8), (result, text) => {
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
    testSingleCase(chrono, "10 - 11 at night", new Date(2016, 10 - 1, 1, 8), (result, text) => {
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

    testSingleCase(chrono, "8pm - 11", new Date(2016, 10 - 1, 1, 8), (result, text) => {
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

    testSingleCase(chrono, "8 - 11pm", new Date(2016, 10 - 1, 1, 8), (result, text) => {
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

    testSingleCase(chrono, "7 - 8", new Date(2016, 10 - 1, 1, 8), (result, text) => {
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

    testSingleCase(chrono.fr, "1pm-3", new Date(2012, 7, 10), (result, text) => {
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

    testSingleCase(chrono.fr, "1am-3", new Date(2012, 7, 10), (result) => {
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

    testSingleCase(chrono.fr, "11pm-3", new Date(2012, 7, 10), (result) => {
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

    testSingleCase(chrono.fr, "12-3am", new Date(2012, 7, 10), (result) => {
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

    testSingleCase(chrono.fr, "12-3pm", new Date(2012, 7, 10), (result) => {
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

test("Test - Parsing causal positive cases", function () {
    testSingleCase(chrono.casual, "at 1", (result) => {
        expect(result.text).toBe("at 1");
        expect(result.start.get("hour")).toBe(1);
    });

    testSingleCase(chrono.casual, "at 12", (result) => {
        expect(result.text).toBe("at 12");
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.casual, "at 12.30", (result) => {
        expect(result.text).toBe("at 12.30");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(30);
    });
});

test("Test - Parsing negative cases : [year-like] pattern", function () {
    testUnexpectedResult(chrono, "2020");

    testUnexpectedResult(chrono, "2020  ");
});

test("Test - Parsing negative cases : 'at [some numbers]'", function () {
    testUnexpectedResult(chrono, "I'm at 101,194 points!");

    testUnexpectedResult(chrono, "I'm at 101 points!");

    testUnexpectedResult(chrono, "I'm at 10.1");
});

test("Test - Parsing negative cases : 'at [some numbers] - [some numbers]'", function () {
    testUnexpectedResult(chrono, "I'm at 10.1 - 10.12");

    testUnexpectedResult(chrono, "I'm at 10 - 10.1");
});

test("Test - Parsing negative cases (Strict)", function () {
    testUnexpectedResult(chrono.strict, "I'm at 101,194 points!");

    testUnexpectedResult(chrono.strict, "I'm at 101 points!");

    testUnexpectedResult(chrono.strict, "I'm at 10.1");

    testUnexpectedResult(chrono.strict, "I'm at 10");

    testUnexpectedResult(chrono.strict, "2020");
});

test("Test - Parsing negative cases : 'at [some numbers] - [some numbers]' (Strict)", function () {
    testUnexpectedResult(chrono.strict, "I'm at 10.1 - 10.12");

    testUnexpectedResult(chrono.strict, "I'm at 10 - 10.1");

    testUnexpectedResult(chrono.strict, "I'm at 10 - 20");

    testUnexpectedResult(chrono.strict, "7-730");
});
