import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src";

test("Test - Persian Time Expression Parsing Offset", () => {
    testSingleCase(chrono.fa, "  ساعت 11 صبح ", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(2);
        expect(result.text).toBe("ساعت 11 صبح");
    });

    testSingleCase(chrono.fa, "2020 در  ساعت 11 ", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("در  ساعت 11");
    });
});

test("Test - Persian Time Expression", () => {
    testSingleCase(chrono.fa, "20:32:13", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(32);
        expect(result.start.get("second")).toBe(13);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.tags()).toContain("parser/FATimeExpressionParser");
        expect(result.start.tags()).toContain("parser/FATimeExpressionParser");
    });

    testSingleCase(chrono.fa, "14:30", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono.fa, "ساعت 9", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(9);
        expect(result.start.get("minute")).toBe(0);
    });
});

test("Test - Persian Time Expression with Period", () => {
    testSingleCase(chrono.fa, "1 شب", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(1);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.fa, "ساعت 3 بعدازظهر", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(15);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono.fa, "9 صبح", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(9);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.fa, "ساعت 6 عصر", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });
});

test("Test - Persian Time Expression with 'راس'", () => {
    testSingleCase(chrono.fa, "راس ساعت 10", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.fa, "راس 8 صبح", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });
});

test("Test - Persian Time with Date", () => {
    testSingleCase(chrono.fa, "10 اوت 2024 ساعت 14:15", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(15);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.tags()).toContain("parser/FATimeExpressionParser");
    });

    testSingleCase(chrono.fa, "فردا ساعت 10 صبح", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(2);

        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.fa, "دیروز ساعت 6 عصر", new Date(2016, 10 - 1, 2, 8), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });
});

test("Test - Persian Time Range", () => {
    testSingleCase(chrono.fa, "از 9 صبح تا 5 بعدازظهر", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("hour")).toBe(9);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(17);
        expect(result.end.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono.fa, "ساعت 10 الی 12", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("hour")).toBe(10);
        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(12);
    });
});

test("Test - Persian Time with Minutes", () => {
    testSingleCase(chrono.fa, "ساعت 10 و 30 دقیقه", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(30);
    });

    testSingleCase(chrono.fa, "10:45 صبح", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(45);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });
});

test("Test - Persian Negative Cases", () => {
    testUnexpectedResult(chrono.fa, "ساعت");
    testUnexpectedResult(chrono.fa, "25:00");
    testUnexpectedResult(chrono.fa, "ساعت 99");
});

test("Test - Persian Later Expression", () => {
    testSingleCase(chrono.fa, "2 روز بعد", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2 روز بعد");
        expect(result.tags()).toContain("result/relativeDate");

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 12));
    });

    testSingleCase(chrono.fa, "5 دقیقه بعد", new Date(2012, 7, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 دقیقه بعد");

        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 10, 5));
    });

    testSingleCase(chrono.fa, "3 هفته بعد", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 هفته بعد");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31, 10, 0));
    });

    testSingleCase(chrono.fa, "3 ماه بعد", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 ماه بعد");

        expect(result.start).toBeDate(new Date(2012, 10 - 1, 10, 10, 0));
    });

    testSingleCase(chrono.fa, "یک سال بعد", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("یک سال بعد");

        expect(result.start).toBeDate(new Date(2013, 7 - 1, 10, 10, 0));
    });
});

test("Test - Persian Later Expression with 'دیگر'", () => {
    testSingleCase(chrono.fa, "5 روز دیگر", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 روز دیگر");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.fa, "10 روز دیگر انجام می‌شود", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 روز دیگر");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    testSingleCase(chrono.fa, "15 دقیقه دیگر", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 دقیقه دیگر");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.fa, "نیم ساعت دیگر", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("نیم ساعت دیگر");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    testSingleCase(chrono.fa, "یک ساعت دیگر", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("یک ساعت دیگر");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });
});

test("Test - Persian Later Expression with 'آینده'", () => {
    testSingleCase(chrono.fa, "هفته آینده", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("هفته آینده");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 17, 12, 14));
    });

    testSingleCase(chrono.fa, "ماه آینده", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ماه آینده");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12, 14));
    });

    testSingleCase(chrono.fa, "سال آینده", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("سال آینده");

        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });
});

test("Test - Persian Negative Cases", () => {
    testUnexpectedResult(chrono.fa, "بعد از");
    testUnexpectedResult(chrono.fa, "دیگر");
    testUnexpectedResult(chrono.fa, "روز بعد");
});
