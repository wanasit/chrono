import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Persian Within Expression", () => {
    testSingleCase(chrono.fa, "باید در 5 روز انجام شود", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("در 5 روز");
        expect(result.tags()).toContain("result/relativeDate");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.fa, "باید در پنج روز آینده انجام شود", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("در پنج روز");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.fa, "باید ظرف 10 روز انجام شود", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("ظرف 10 روز");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    testSingleCase(chrono.fa, "در 5 دقیقه", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("در 5 دقیقه");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.fa, "صبر کن تا 5 دقیقه", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("تا 5 دقیقه");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.fa, "ظرف 1 ساعت", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ظرف 1 ساعت");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono.fa, "در 5 دقیقه به خانه می‌روم", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("در 5 دقیقه");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.fa, "در 5 ثانیه باید حرکت کند", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("در 5 ثانیه");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });

    testSingleCase(chrono.fa, "ظرف نیم ساعت", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ظرف نیم ساعت");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    testSingleCase(chrono.fa, "ظرف دو هفته", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ظرف دو هفته");

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12, 14));
    });

    testSingleCase(chrono.fa, "ظرف یک ماه", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ظرف یک ماه");

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12, 14));
    });

    testSingleCase(chrono.fa, "تا چند روز دیگر", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("تا چند روز");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
    });

    testSingleCase(chrono.fa, "ظرف چند ماه", new Date(2012, 6, 10, 22, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ظرف چند ماه");

        expect(result.start).toBeDate(new Date(2012, 9, 10, 22, 14));
    });

    testSingleCase(chrono.fa, "در یک سال", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("در یک سال");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });
});

test("Test - Persian Within Expression - Edge Cases", () => {
    testSingleCase(chrono.fa, "طی 24 ساعت", new Date(2012, 7, 10, 12, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("day")).toBe(11);
        expect(result.start).toBeDate(new Date(2012, 7, 11, 12, 0));
    });

    testSingleCase(chrono.fa, "طی 48 ساعت", new Date(2012, 7, 10, 12, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("day")).toBe(12);
        expect(result.start).toBeDate(new Date(2012, 7, 12, 12, 0));
    });

    testSingleCase(chrono.fa, "در 90 دقیقه", new Date(2012, 7, 10, 12, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 30));
    });
});

test("Test - Persian Negative Cases", () => {
    testUnexpectedResult(chrono.fa, "در");
    testUnexpectedResult(chrono.fa, "ظرف");
    testUnexpectedResult(chrono.fa, "تا");
});
