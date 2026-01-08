import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Persian 'این' (This) Expressions", () => {
    testSingleCase(chrono.fa, "این هفته", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(19);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "این ماه", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "این ماه", new Date(2017, 11 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "این سال", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "این روز", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(19);
    });
});

test("Test - Persian Past Relative Expressions", () => {
    testSingleCase(chrono.fa, "هفته گذشته", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "ماه گذشته", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "ماه قبل", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "روز گذشته", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "هفته پیش", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "سال گذشته", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2015);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "سال پیش", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2015);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Persian Future Relative Expressions", () => {
    testSingleCase(chrono.fa, "ساعت آینده", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(13);
    });

    testSingleCase(chrono.fa, "هفته آینده", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "روز آینده", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "ماه آینده", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.fa, "سال آینده", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Persian Relative Expressions with 'بعد' (Next)", () => {
    testSingleCase(chrono.fa, "ساعت بعد", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(13);
    });

    testSingleCase(chrono.fa, "هفته بعد", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono.fa, "ماه بعد", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("month")).toBe(11);
    });
});

test("Test - Persian Relative Expressions in Context", () => {
    testSingleCase(chrono.fa, "جلسه این هفته برگزار می‌شود", new Date(2017, 11 - 1, 19, 12), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("این هفته");
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
    });

    testSingleCase(chrono.fa, "گزارش را تا هفته آینده بدهید", new Date(2016, 10 - 1, 1, 12), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("هفته آینده");
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono.fa, "از ماه گذشته مسافرت کرده‌ام", new Date(2016, 10 - 1, 1, 12), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("ماه گذشته");
        expect(result.start.get("month")).toBe(9);
    });
});

test("Test - Persian Casual Relative Expressions with Numbers", () => {
    testSingleCase(chrono.fa, "دو روز گذشته", new Date(2016, 10 - 1, 10, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono.fa, "سه هفته آینده", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(22);
    });

    testSingleCase(chrono.fa, "یک ماه پیش", new Date(2016, 10 - 1, 15, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);
    });
});

test("Test - Persian Prefix vs Suffix Modifiers", () => {
    // Prefix style: modifier + time unit
    testSingleCase(chrono.fa, "گذشته ماه", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("month")).toBe(9);
    });

    // Suffix style: time unit + modifier
    testSingleCase(chrono.fa, "ماه گذشته", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("month")).toBe(9);
    });

    // Prefix style with numbers
    testSingleCase(chrono.fa, "آینده دو هفته", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(15);
    });

    // Suffix style with numbers
    testSingleCase(chrono.fa, "دو هفته آینده", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(15);
    });
});

test("Test - Persian Edge Cases", () => {
    // Start of week calculation
    testSingleCase(chrono.fa, "این هفته", new Date(2016, 10 - 1, 5, 12), (result) => {
        // Oct 5, 2016 is Wednesday, start of week should be Sunday Oct 2
        expect(result.start.get("day")).toBe(2);
    });

    // Start of month
    testSingleCase(chrono.fa, "این ماه", new Date(2016, 10 - 1, 15, 12), (result) => {
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("month")).toBe(10);
    });

    // Start of year
    testSingleCase(chrono.fa, "این سال", new Date(2016, 6 - 1, 15, 12), (result) => {
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("year")).toBe(2016);
    });
});

test("Test - Persian Negative Cases", () => {
    testUnexpectedResult(chrono.fa, "این");
    testUnexpectedResult(chrono.fa, "گذشته");
    testUnexpectedResult(chrono.fa, "آینده");
});
