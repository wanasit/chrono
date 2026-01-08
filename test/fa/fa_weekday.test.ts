import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Persian Single Weekday Expression", () => {
    // Aug 9, 2012 is Thursday. Monday is closest in the past (Aug 6 = -3 days vs Aug 13 = +4 days)
    testSingleCase(chrono.fa, "دوشنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("دوشنبه");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 7, 6, 12));
    });

    // Thursday is today
    testSingleCase(chrono.fa, "پنجشنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("پنجشنبه");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    // Sunday is 3 days forward from Thursday (Aug 12)
    testSingleCase(chrono.fa, "یکشنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("یکشنبه");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 12, 12));
    });

    testSingleCase(chrono.fa, "ضرب‌الاجل جمعه گذشته است", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("جمعه گذشته");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 3, 12));
    });

    testSingleCase(chrono.fa, "ضرب‌الاجل جمعه قبل است", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("جمعه قبل");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 3, 12));
    });
});

test("Test - Persian Weekday with 'این' (This)", () => {
    testSingleCase(chrono.fa, "این شنبه", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "این یکشنبه", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "این چهارشنبه", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "این شنبه", new Date("Sun Aug 7 2022"), (result) => {
        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "این یکشنبه", new Date("Sun Aug 7 2022"), (result) => {
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "این چهارشنبه", new Date("Sun Aug 7 2022"), (result) => {
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });
});

test("Test - Persian Weekday with 'گذشته' (Last)", () => {
    testSingleCase(chrono.fa, "شنبه گذشته", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "یکشنبه گذشته", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(31);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "دوشنبه گذشته", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });
});

test("Test - Persian Weekday with 'آینده' (Next)", () => {
    testSingleCase(chrono.fa, "شنبه آینده", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "یکشنبه آینده", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "دوشنبه آینده", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(8);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "جمعه آینده", new Date("Fri Aug 5 2022"), (result) => {
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });
});

test("Test - Persian Weekday with 'بعد' (Next)", () => {
    testSingleCase(chrono.fa, "شنبه بعد", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "دوشنبه بعد", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(8);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });
});

test("Test - Persian Weekday with 'پیش' (Last/Ago)", () => {
    testSingleCase(chrono.fa, "جمعه پیش", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(29);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.fa, "سه‌شنبه پیش", new Date("Tue Aug 9 2022"), (result) => {
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });
});

test("Test - Persian Weekday Variations", () => {
    // Test different spelling variations
    testSingleCase(chrono.fa, "یک‌شنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start.get("weekday")).toBe(0);
    });

    testSingleCase(chrono.fa, "یک شنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start.get("weekday")).toBe(0);
    });

    testSingleCase(chrono.fa, "دو‌شنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start.get("weekday")).toBe(1);
    });

    testSingleCase(chrono.fa, "سه‌شنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start.get("weekday")).toBe(2);
    });

    testSingleCase(chrono.fa, "چهار‌شنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start.get("weekday")).toBe(3);
    });

    testSingleCase(chrono.fa, "پنج‌شنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start.get("weekday")).toBe(4);
    });
});

test("Test - Persian Weekday with Context", () => {
    testSingleCase(chrono.fa, "جلسه را در دوشنبه برگزار می‌کنیم", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("در دوشنبه");
        expect(result.start.get("weekday")).toBe(1);
    });

    testSingleCase(chrono.fa, "در جمعه آینده ملاقات می‌کنیم", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("در جمعه آینده");
        expect(result.start.get("weekday")).toBe(5);
        expect(result.start.get("day")).toBe(24);
    });
});
