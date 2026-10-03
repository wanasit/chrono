import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Arabic Past Time Units (منذ / قبل / مضت)", () => {
    const refDate = new Date(2023, 5, 15, 12, 0);

    testSingleCase(chrono.ar.casual, "منذ 3 أيام", refDate, (result) => {
        expect(result.text).toBe("منذ 3 أيام");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono.ar.casual, "قبل ساعتين", refDate, (result) => {
        expect(result.text).toBe("قبل ساعتين");
        expect(result.start.get("hour")).toBe(10);
    });

    testSingleCase(chrono.ar.casual, "منذ يومين", refDate, (result) => {
        expect(result.text).toBe("منذ يومين");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(13);
    });

    testSingleCase(chrono.ar.casual, "قبل 5 دقائق", refDate, (result) => {
        expect(result.text).toBe("قبل 5 دقائق");
        expect(result.start.get("minute")).toBe(55);
        expect(result.start.get("hour")).toBe(11);
    });

    testSingleCase(chrono.ar.casual, "3 أيام مضت", refDate, (result) => {
        expect(result.text).toBe("3 أيام مضت");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(12);
    });
});

test("Test - Arabic Future Time Units (بعد)", () => {
    const refDate = new Date(2023, 5, 15, 12, 0);

    testSingleCase(chrono.ar.casual, "بعد 3 أيام", refDate, (result) => {
        expect(result.text).toBe("بعد 3 أيام");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(18);
    });

    testSingleCase(chrono.ar.casual, "بعد ساعتين", refDate, (result) => {
        expect(result.text).toBe("بعد ساعتين");
        expect(result.start.get("hour")).toBe(14);
    });

    testSingleCase(chrono.ar.casual, "بعد يومين", refDate, (result) => {
        expect(result.text).toBe("بعد يومين");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(17);
    });

    testSingleCase(chrono.ar.casual, "منذ أسبوعين", refDate, (result) => {
        expect(result.text).toBe("منذ أسبوعين");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(chrono.ar.casual, "بعد شهرين", refDate, (result) => {
        expect(result.text).toBe("بعد شهرين");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono.ar.casual, "منذ سنتين", refDate, (result) => {
        expect(result.text).toBe("منذ سنتين");
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(15);
    });
});

test("Test - Arabic Within Time Units (خلال / في غضون)", () => {
    const refDate = new Date(2023, 5, 15, 12, 0);

    testSingleCase(chrono.ar.casual, "خلال 3 ساعات", refDate, (result) => {
        expect(result.text).toBe("خلال 3 ساعات");
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(chrono.ar.casual, "في غضون يومين", refDate, (result) => {
        expect(result.text).toBe("في غضون يومين");
        expect(result.start.get("day")).toBe(17);
    });
});

test("Test - Arabic Relative Date Expressions (الشهر القادم / الأسبوع الماضي)", () => {
    const refDate = new Date(2023, 5, 15, 12, 0); // June 15, 2023

    testSingleCase(chrono.ar.casual, "الشهر القادم", refDate, (result) => {
        expect(result.text).toBe("الشهر القادم");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(7);
    });

    testSingleCase(chrono.ar.casual, "الشهر الماضي", refDate, (result) => {
        expect(result.text).toBe("الشهر الماضي");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(5);
    });

    testSingleCase(chrono.ar.casual, "السنة القادمة", refDate, (result) => {
        expect(result.text).toBe("السنة القادمة");
        expect(result.start.get("year")).toBe(2024);
    });
});
