import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Persian Date Range with Dash", () => {
    testSingleCase(chrono.fa, "1399/07/01 تا 1399/07/15", new Date(2020, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1399);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(1);

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(1399);
        expect(result.end.get("month")).toBe(7);
        expect(result.end.get("day")).toBe(15);

        expect(result.text).toBe("1399/07/01 تا 1399/07/15");
    });

    testSingleCase(chrono.fa, "10 تا 15 مهر", new Date(2020, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);

        expect(result.end).not.toBeNull();
        expect(result.end.get("month")).toBe(7);
        expect(result.end.get("day")).toBe(15);
    });
});

test("Test - Persian Time Range", () => {
    testSingleCase(chrono.fa, "از ساعت 9 صبح تا 5 عصر", new Date(2020, 9, 10, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(9);

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(17);
    });

    testSingleCase(chrono.fa, "10 الی 12", new Date(2020, 9, 10, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(10);

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(12);
    });
});

test("Test - Persian Date and Time Range", () => {
    testSingleCase(chrono.fa, "از فردا تا پس‌فردا", new Date(2020, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("day")).toBe(11);

        expect(result.end).not.toBeNull();
        expect(result.end.get("day")).toBe(12);
    });

    testSingleCase(chrono.fa, "از امروز تا فردا", new Date(2020, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("day")).toBe(10);

        expect(result.end).not.toBeNull();
        expect(result.end.get("day")).toBe(11);
    });
});

test("Test - Persian Month Range", () => {
    testSingleCase(chrono.fa, "از فروردین تا خرداد", new Date(2020, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("month")).toBe(1);

        expect(result.end).not.toBeNull();
        expect(result.end.get("month")).toBe(3);
    });

    testSingleCase(chrono.fa, "مهر الی آذر", new Date(2020, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("month")).toBe(7);

        expect(result.end).not.toBeNull();
        expect(result.end.get("month")).toBe(9);
    });
});

test("Test - Persian Weekday Range", () => {
    testSingleCase(chrono.fa, "از دوشنبه تا جمعه", new Date(2020, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("weekday")).toBe(1);

        expect(result.end).not.toBeNull();
        expect(result.end.get("weekday")).toBe(5);
    });

    testSingleCase(chrono.fa, "شنبه تا چهارشنبه", new Date(2020, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("weekday")).toBe(6);

        expect(result.end).not.toBeNull();
        expect(result.end.get("weekday")).toBe(3);
    });
});

test("Test - Persian Complex Range", () => {
    testSingleCase(chrono.fa, "10 مهر ساعت 9 صبح تا 15 مهر ساعت 5 عصر", new Date(2020, 9, 1), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("hour")).toBe(9);

        expect(result.end).not.toBeNull();
        expect(result.end.get("day")).toBe(15);
        expect(result.end.get("month")).toBe(7);
        expect(result.end.get("hour")).toBe(17);
    });
});

test("Test - Persian Casual Time Units Relative", () => {
    testSingleCase(chrono.fa.casual, "این صبح", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(6);
    });

    testSingleCase(chrono.fa.casual, "این بعدازظهر", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(chrono.fa.casual, "این عصر", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(18);
    });

    testSingleCase(chrono.fa.casual, "این شب", new Date(2016, 10 - 1, 1, 20), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
    });
});

test("Test - Persian Last Night / This Morning", () => {
    testSingleCase(chrono.fa.casual, "دیشب", new Date(2016, 10 - 1, 1, 12), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(22);
    });

    testSingleCase(chrono.fa.casual, "امشب", new Date(2016, 10 - 1, 1, 12), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
    });
});

test("Test - Persian Time Units with Numbers", () => {
    testSingleCase(chrono.fa.casual, "یک ساعت پیش", new Date(2016, 10 - 1, 1, 14, 30), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(30);
    });

    testSingleCase(chrono.fa.casual, "دو هفته پیش", new Date(2016, 10 - 1, 15, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(chrono.fa.casual, "سه روز بعد", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(4);
    });
});

test("Test - Persian Relative with Casual Modifiers", () => {
    testSingleCase(chrono.fa.casual, "چند روز پیش", new Date(2016, 10 - 1, 10, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        // "چند" (several) typically means 3-5 days
        expect(result.start.get("day")).toBeLessThan(10);
        expect(result.start.get("day")).toBeGreaterThan(4);
    });

    testSingleCase(chrono.fa.casual, "چند ماه بعد", new Date(2016, 7, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBeGreaterThan(7);
    });
});

test("Test - Persian Combined Casual Expressions", () => {
    testSingleCase(chrono.fa.casual, "فردا صبح", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("hour")).toBe(6);
    });

    testSingleCase(chrono.fa.casual, "دیروز عصر", new Date(2016, 10 - 1, 2, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(18);
    });

    testSingleCase(chrono.fa.casual, "امروز ظهر", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Persian Casual in Context", () => {
    testSingleCase(chrono.fa.casual, "جلسه را این صبح برگزار کردیم", new Date(2016, 10 - 1, 1, 14), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("این صبح");
        expect(result.start.get("hour")).toBe(6);
    });

    testSingleCase(chrono.fa.casual, "چند روز پیش او را دیدم", new Date(2016, 10 - 1, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("چند روز پیش");
    });
});
