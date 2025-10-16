import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Persian Integration", () => {
    const date = chrono.fa.parseDate("فردا", new Date(2012, 7, 10, 12));
    expect(date).not.toBeNull();
    if (date) {
        expect(date.getFullYear()).toBe(2012);
        expect(date.getMonth()).toBe(7);
        expect(date.getDate()).toBe(11);
    }
});

test("Test - Persian Combined Expressions", () => {
    testSingleCase(chrono.fa, "فردا ساعت 3 بعدازظهر", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(chrono.fa, "فردا ساعت 10 صبح", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(10);
    });
});

test("Test - Persian Negative Cases", () => {
    testUnexpectedResult(chrono.fa, "این یک تست است");
    testUnexpectedResult(chrono.fa, "random text");
});
