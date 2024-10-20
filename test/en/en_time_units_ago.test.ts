import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src/";

test("Test - Single Expression", function () {
    testSingleCase(chrono, "5 days ago, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 days ago");
        expect(result.tags()).toContain("result/relativeDate");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    testSingleCase(chrono, "10 days ago, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 days ago");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });

    testSingleCase(chrono, "15 minute ago", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minute ago");
        expect(result.tags()).toContain("result/relativeDate");
        expect(result.tags()).toContain("result/relativeDateAndTime");

        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono, "15 minute earlier", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minute earlier");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono, "15 minute before", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minute before");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono, "   12 hours ago", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("12 hours ago");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    testSingleCase(chrono, "1h ago", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1h ago");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "1hr ago", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1hr ago");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "   half an hour ago", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("half an hour ago");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(44);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 44));
    });

    testSingleCase(chrono, "12 hours ago I did something", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 hours ago");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    testSingleCase(chrono, "12 seconds ago I did something", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 seconds ago");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(48);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 48));
    });

    testSingleCase(chrono, "three seconds ago I did something", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("three seconds ago");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(57);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 57));
    });

    testSingleCase(chrono, "5 Days ago, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 Days ago");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    testSingleCase(chrono, "   half An hour ago", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("half An hour ago");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(44);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 44));
    });

    testSingleCase(chrono, "A days ago, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("A days ago");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 9));
    });

    testSingleCase(chrono, "a min before", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("a min before");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13));
    });

    testSingleCase(chrono, "the min before", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("the min before");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13));
    });
});

test("Test - Single Expression (Casual)", function () {
    testSingleCase(chrono, "5 months ago, we did something", new Date(2012, 10 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 months ago");

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 10));
    });

    testSingleCase(chrono, "5 years ago, we did something", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2007);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 years ago");

        expect(result.start).toBeDate(new Date(2007, 8 - 1, 10));
    });

    testSingleCase(chrono, "a week ago, we did something", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe("a week ago");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 27));
    });

    testSingleCase(chrono, "a few days ago, we did something", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("a few days ago");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });
});

test("Test - Nested time ago", function () {
    testSingleCase(chrono, "15 hours 29 min ago", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("15 hours 29 min ago");
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(7);
        expect(result.start.get("minute")).toBe(1);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "1 day 21 hours ago ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("1 day 21 hours ago");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(1);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "1d 21 h 25m ago ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("1d 21 h 25m ago");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(1);
        expect(result.start.get("minute")).toBe(5);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono, "3 min 49 sec ago ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("3 min 49 sec ago");
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("minute")).toBe(26);
        expect(result.start.get("second")).toBe(11);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono, "3m 49s ago ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("3m 49s ago");
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("minute")).toBe(26);
        expect(result.start.get("second")).toBe(11);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });
});

test("Test - Before with reference", () => {
    testSingleCase(chrono, "2 day before today", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono, "the day before yesterday", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono, "2 day before yesterday", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(7);
    });

    testSingleCase(chrono, "a week before yesterday", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(2);
    });
});

test("Test - Strict mode", function () {
    testSingleCase(chrono.strict, "5 minutes ago", new Date(2012, 7, 10, 12, 14), (result, text) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 9));
    });

    testUnexpectedResult(chrono.strict, "5m ago", new Date(2012, 7, 10, 12, 14));
    testUnexpectedResult(chrono.strict, "5hr before", new Date(2012, 7, 10, 12, 14));
    testUnexpectedResult(chrono.strict, "5 h ago", new Date(2012, 7, 10, 12, 14));
});

test("Test - Forward date", () => {
    // Note that it is actually impossible for X ago to be "forward dates".
    // In such situation, we still return the correct actual extracted dates and make sure the option doesn't affect the results.
    const reference = new Date("2024-09-10T12:00:00");
    const options = { forwardDate: true };

    testSingleCase(chrono, "2 days ago", reference, options, (result, text) => {
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono, "2 weeks ago", reference, options, (result, text) => {
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(27);
    });

    testSingleCase(chrono, "2 months ago", reference, options, (result, text) => {
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);
    });

    testSingleCase(chrono, "2 years ago", reference, options, (result, text) => {
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(10);
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono, "15 hours 29 min");
    testUnexpectedResult(chrono, "a few hour");
    testUnexpectedResult(chrono, "5 days");

    testUnexpectedResult(chrono, "am ago");
    testUnexpectedResult(chrono, "them ago");
});
