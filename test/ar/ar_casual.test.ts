import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Casual Date Expressions", () => {
    testSingleCase(chrono.ar.casual, "الموعد اليوم", new Date(2023, 0, 10, 17, 10), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("اليوم");
        expect(result.start).toBeDate(new Date(2023, 0, 10, 17, 10));
    });

    testSingleCase(chrono.ar.casual, "الموعد غداً", new Date(2023, 0, 10, 17, 10), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("غداً");
        expect(result.start).toBeDate(new Date(2023, 0, 11, 17, 10));
    });

    testSingleCase(chrono.ar.casual, "الموعد غدا", new Date(2023, 0, 10, 17, 10), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("غدا");
        expect(result.start).toBeDate(new Date(2023, 0, 11, 17, 10));
    });

    testSingleCase(chrono.ar.casual, "الموعد بعد غد", new Date(2023, 0, 10, 17, 10), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("بعد غد");
        expect(result.start).toBeDate(new Date(2023, 0, 12, 17, 10));
    });

    testSingleCase(chrono.ar.casual, "الموعد أمس", new Date(2023, 0, 10, 17, 10), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("أمس");
        expect(result.start).toBeDate(new Date(2023, 0, 9, 17, 10));
    });

    testSingleCase(chrono.ar.casual, "الموعد أول أمس", new Date(2023, 0, 10, 17, 10), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("أول أمس");
        expect(result.start).toBeDate(new Date(2023, 0, 8, 17, 10));
    });

    testSingleCase(chrono.ar.casual, "الموعد الآن", new Date(2023, 0, 10, 8, 9, 10), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("الآن");
        expect(result.start).toBeDate(new Date(2023, 0, 10, 8, 9, 10));
    });
});

test("Test - Casual Time Expressions", () => {
    testSingleCase(chrono.ar.casual, "الاجتماع هذا الصباح", new Date(2023, 0, 10, 14, 0), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("هذا الصباح");
        expect(result.start.get("hour")).toBe(6);
    });

    testSingleCase(chrono.ar.casual, "نلتقي عند الظهر", new Date(2023, 0, 10, 8, 0), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("الظهر");
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ar.casual, "نلتقي بعد الظهر", new Date(2023, 0, 10, 8, 0), (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe("بعد الظهر");
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(chrono.ar.casual, "نلتقي هذا المساء", new Date(2023, 0, 10, 8, 0), (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe("هذا المساء");
        expect(result.start.get("hour")).toBe(20);
    });

    testSingleCase(chrono.ar.casual, "نلتقي عند منتصف الليل", new Date(2023, 0, 10, 8, 0), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("منتصف الليل");
        expect(result.start.get("hour")).toBe(0);
    });
});

test("Test - Combined Casual Date and Time", () => {
    testSingleCase(chrono.ar.casual, "غداً الساعة 5 مساءً", new Date(2023, 0, 10, 12, 0), (result) => {
        expect(result.text).toBe("غداً الساعة 5 مساءً");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(0);
    });
});

test("Test - Shortcuts (parse & parseDate)", () => {
    const ref = new Date(2023, 0, 10, 12, 0);
    const parsedDate = chrono.ar.parseDate("غداً", ref);
    expect(parsedDate).not.toBeNull();
    expect(parsedDate?.getFullYear()).toBe(2023);
    expect(parsedDate?.getMonth()).toBe(0);
    expect(parsedDate?.getDate()).toBe(11);

    const parsedResults = chrono.ar.parse("غداً", ref);
    expect(parsedResults).toHaveLength(1);
    expect(parsedResults[0].text).toBe("غداً");
});

test("Test - Strict Mode vs Casual Mode", () => {
    const ref = new Date(2023, 0, 10, 12, 0);
    // Casual parses "اليوم"
    expect(chrono.ar.casual.parse("اليوم", ref)).toHaveLength(1);
    // Strict does not parse "اليوم"
    expect(chrono.ar.strict.parse("اليوم", ref)).toHaveLength(0);
    // Both parse explicit formatted dates
    expect(chrono.ar.strict.parse("15 يناير 2023", ref)).toHaveLength(1);
});
