import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { getISOWeekParts, isoWeekMondaySunday } from "../../src/calculation/isoWeek";

test("Test - ISO week helpers", () => {
    expect(isoWeekMondaySunday(2026, 42)).toEqual({
        monday: { year: 2026, month: 10, day: 12 },
        sunday: { year: 2026, month: 10, day: 18 },
    });
    expect(isoWeekMondaySunday(2026, 40)).toEqual({
        monday: { year: 2026, month: 9, day: 28 },
        sunday: { year: 2026, month: 10, day: 4 },
    });
    expect(isoWeekMondaySunday(2026, 1)).toEqual({
        monday: { year: 2025, month: 12, day: 29 },
        sunday: { year: 2026, month: 1, day: 4 },
    });
    expect(isoWeekMondaySunday(2025, 53)).toBeNull();

    const parts = getISOWeekParts(new Date(2026, 9 - 1, 21, 12));
    expect(parts).toEqual({ year: 2026, week: 39 });
});

test("Test - KW / Kalenderwoche with explicit year", () => {
    const ref = new Date(2026, 9 - 1, 21, 12);

    testSingleCase(chrono.de, "KW 42/2026", ref, (result) => {
        expect(result.text).toBe("KW 42/2026");
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(12);
        expect(result.end.get("year")).toBe(2026);
        expect(result.end.get("month")).toBe(10);
        expect(result.end.get("day")).toBe(18);
    });

    testSingleCase(chrono.de, "Kalenderwoche 40", ref, (result) => {
        expect(result.text).toBe("Kalenderwoche 40");
        expect(result.start.get("day")).toBe(28);
        expect(result.start.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(4);
        expect(result.end.get("month")).toBe(10);
    });

    testSingleCase(chrono.de, "Woche 42/2026", ref, (result) => {
        expect(result.text).toBe("Woche 42/2026");
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("month")).toBe(10);
    });
});

test("Test - bare KW uses reference ISO week-year", () => {
    // Mid-Oct 2026 = ISO week 42; bare KW 40 stays in 2026 (no roll to next year)
    const midOct = new Date(2026, 10 - 1, 12, 12);
    testSingleCase(chrono.de, "KW 40", midOct, (result) => {
        expect(result.text).toBe("KW 40");
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(28);
        expect(result.end.get("day")).toBe(4);
        expect(result.end.get("month")).toBe(10);
    });

    testSingleCase(chrono.de, "Arbeitspakete in KW 40 angelegt", midOct, (result) => {
        expect(result.text).toBe("KW 40");
    });
});

test("Test - diese Woche is not an ISO calendar week", () => {
    testUnexpectedResult(chrono.de, "Termine diese Woche", new Date(2026, 9 - 1, 21));
});
