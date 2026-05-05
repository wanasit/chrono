import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

const REF = new Date(2012, 7, 10, 12); // 2012-08-10

test("Test - tháng M năm YYYY", () => {
    testSingleCase(chrono.vi, "tháng 4 năm 1975", REF, (r) => {
        expect(r.text).toBe("tháng 4 năm 1975");
        expect(r.start.get("month")).toBe(4);
        expect(r.start.get("year")).toBe(1975);
        expect(r.start.isCertain("month")).toBe(true);
        expect(r.start.isCertain("year")).toBe(true);
        expect(r.start.isCertain("day")).toBe(false); // day is implied
    });

    testSingleCase(chrono.vi, "tháng 1 năm 1863", REF, (r) => {
        expect(r.start.get("month")).toBe(1);
        expect(r.start.get("year")).toBe(1863);
    });
});

test("Test - tháng M/YYYY (slash separator)", () => {
    testSingleCase(chrono.vi, "tháng 3/1975", REF, (r) => {
        expect(r.start.get("month")).toBe(3);
        expect(r.start.get("year")).toBe(1975);
    });
});

test("Test - tháng M only (implies current year)", () => {
    testSingleCase(chrono.vi, "tháng 3", REF, (r) => {
        expect(r.start.get("month")).toBe(3);
        expect(r.start.isCertain("year")).toBe(false); // year implied from reference
        expect(r.start.get("year")).toBe(2012);
    });
});

test("Test - negative: month > 12 rejected", () => {
    testUnexpectedResult(chrono.vi, "tháng 13", REF);
    testUnexpectedResult(chrono.vi, "tháng 0", REF);
});
