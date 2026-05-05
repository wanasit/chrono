import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

const REF = new Date(2012, 7, 10, 12); // 2012-08-10 noon

test("Test - hôm qua lúc 7 giờ (morning reference = AM context)", () => {
    // Reference at 6am => implicit meridiem AM => 7 giờ = 7:00 AM
    testSingleCase(chrono.vi, "hôm qua lúc 7 giờ", new Date(2012, 7, 10, 6), (r) => {
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("day")).toBe(9);
        expect(r.start.get("hour")).toBe(7);
    });
});

test("Test - ngày mai lúc 15 giờ", () => {
    testSingleCase(chrono.vi, "ngày mai lúc 15 giờ", REF, (r) => {
        expect(r.start.get("day")).toBe(11);
        expect(r.start.get("hour")).toBe(15);
    });
});

test("Test - hôm nay buổi sáng", () => {
    testSingleCase(chrono.vi, "hôm nay buổi sáng", REF, (r) => {
        expect(r.start.get("day")).toBe(10);
        expect(r.start.get("hour")).toBe(9);
    });
});

test("Test - bare unit: tháng trước (last month, no number)", () => {
    testSingleCase(chrono.vi, "tháng trước", REF, (r) => {
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(7); // August - 1 = July
    });
});

test("Test - bare unit: năm sau (next year, no number)", () => {
    testSingleCase(chrono.vi, "năm sau", REF, (r) => {
        expect(r.start.get("year")).toBe(2013);
    });
});

test("Test - bare unit: tuần trước (last week, no number)", () => {
    testSingleCase(chrono.vi, "tuần trước", REF, (r) => {
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("day")).toBe(3); // 10 - 7 = 3
    });
});

test("Test - numbered form still works: 2 tuần trước", () => {
    testSingleCase(chrono.vi, "2 tuần trước", REF, (r) => {
        expect(r.start.get("day")).toBe(27); // Aug 10 - 14 days = Jul 27
        expect(r.start.get("month")).toBe(7);
    });
});
