import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src/";

test("Test - Later Expression", function () {
    testSingleCase(chrono, "2 days later", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2 days later");
        expect(result.tags()).toContain("result/relativeDate");

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 12));
    });

    testSingleCase(chrono, "5 minutes later", new Date(2012, 7, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 minutes later");

        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 10, 5));
    });

    testSingleCase(chrono, "3 week later", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 week later");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31, 10, 0));
    });

    testSingleCase(chrono, "3w later", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3w later");
    });

    testSingleCase(chrono, "3mo later", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3mo later");
    });
});

test("Test - From now Expression", () => {
    testSingleCase(chrono, "5 days from now, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 days from now");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono, "10 days from now, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 days from now");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    testSingleCase(chrono, "15 minute from now", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minute from now");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono, "15 minutes earlier", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minutes earlier");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono, "15 minute out", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minute out");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono, "   12 hours from now", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("12 hours from now");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 0, 14));
    });

    testSingleCase(chrono, "   12 hrs from now", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("12 hrs from now");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "   half an hour from now", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("half an hour from now");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(44);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    testSingleCase(chrono, "12 hours from now I did something", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 hours from now");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 0, 14));
    });

    testSingleCase(chrono, "12 seconds from now I did something", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 seconds from now");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("second")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 12));
    });

    testSingleCase(chrono, "three seconds from now I did something", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("three seconds from now");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("second")).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 3));
    });

    testSingleCase(chrono, "5 Days from now, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 Days from now");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono, "   half An hour from now", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("half An hour from now");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(44);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    testSingleCase(chrono, "A days from now, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.index).toBe(0);
        expect(result.text).toBe("A days from now");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11));
    });

    testSingleCase(chrono, "a min out", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("a min out");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 15));
    });

    testSingleCase(chrono, "in 1 hour", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 1 hour");
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono, "in 1 mon", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 1 mon");
        expect(result.start.get("month")).toBe(8 + 1);

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12, 14));
    });

    testSingleCase(chrono, "in 1.5 hours", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 1.5 hours");
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 10));
    });
});

test("Test - The later expression with multiple time units", function () {
    testSingleCase(chrono, "in 1d 2hr 5min", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 1d 2hr 5min");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(45);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 14, 45));
    });

    testSingleCase(chrono, "in 1d, 2hr, and 5min", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 1d, 2hr, and 5min");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(45);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 14, 45));
    });
});

test("Test - Strict mode", function () {
    testSingleCase(chrono, "the min after", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("the min after");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(15);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 15));
    });

    testSingleCase(chrono.strict, "15 minutes from now", new Date(2012, 7, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.strict, "25 minutes later", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("25 minutes later");
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 5));
    });

    testUnexpectedResult(chrono.strict, "15m from now");
    testUnexpectedResult(chrono.strict, "15s later");
});

test("Test - After with reference", () => {
    testSingleCase(chrono, "2 day after today", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono, "the day after tomorrow", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono, "2 day after tomorrow", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("2 day after tomorrow");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
    });

    testSingleCase(chrono, "a week after tomorrow", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("a week after tomorrow");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(18);
    });
});

test("Test - Plus after reference", () => {
    testSingleCase(chrono, "next tuesday +10 days", new Date(2023, 12 - 1, 29), (result) => {
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono, "2023-12-29 -10days", new Date(2023, 12 - 1, 29), (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(19);
    });

    testSingleCase(chrono, "now + 40minutes", new Date(2023, 12 - 1, 29, 8, 30), (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(29);
        expect(result.start.get("hour")).toBe(9);
        expect(result.start.get("minute")).toBe(10);
    });
});

test("Test - Negative cases", () => {
    testUnexpectedResult(chrono, "tell them later");
});
