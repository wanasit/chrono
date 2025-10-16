import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Persian Month Name with Gregorian Calendar", () => {
    testSingleCase(chrono.fa, "10 اوت 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 اوت 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.fa, "3 فوریه 82", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1982);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(3);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 فوریه 82");

        expect(result.start).toBeDate(new Date(1982, 2 - 1, 3, 12));
    });

    testSingleCase(chrono.fa, "31 مارس 2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("31 مارس 2016");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(31);

        expect(result.start).toBeDate(new Date(2016, 3 - 1, 31, 12));
    });

    testSingleCase(chrono.fa, "ضرب‌الاجل 10 اوت است", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("10 اوت");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.fa, "15 سپتامبر", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 سپتامبر");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });
});

test("Test - Persian Month Name with Solar Hijri Calendar", () => {
    testSingleCase(chrono.fa, "15 فروردین 1401", new Date(2022, 3, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1401);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("15 فروردین 1401");
    });

    testSingleCase(chrono.fa, "10 مهر", new Date(2022, 9, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 مهر");
    });

    testSingleCase(chrono.fa, "25 اسفند 1400", new Date(2022, 2, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1400);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);

        expect(result.index).toBe(0);
        expect(result.text).toBe("25 اسفند 1400");
    });

    testSingleCase(chrono.fa, "اول خرداد", new Date(2022, 4, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(0);
        expect(result.text).toBe("اول خرداد");
    });
});

test("Test - Persian Month Name with Weekday", () => {
    testSingleCase(chrono.fa, "دوشنبه، 10 ژانویه", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("دوشنبه، 10 ژانویه");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.fa, "جمعه 15 دسامبر 2023", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("جمعه 15 دسامبر 2023");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(15);
        expect(result.start.get("weekday")).toBe(5);
    });
});

test("Test - Persian Month Name - Variations", () => {
    testSingleCase(chrono.fa, "10 آگوست", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
    });

    testSingleCase(chrono.fa, "5 می 2020", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2020);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(5);
    });

    testSingleCase(chrono.fa, "20 جولای", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(20);
    });
});

test("Test - Persian Negative Cases", () => {
    testUnexpectedResult(chrono.fa, "ماه");
    testUnexpectedResult(chrono.fa, "فروردین");
    testUnexpectedResult(chrono.fa, "10");
});
