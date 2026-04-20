import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

const REF = new Date(2012, 7, 10, 12); // 2012-08-10 noon

test("Test - từ ngày X đến ngày Y (đến connector)", () => {
    testSingleCase(chrono.vi, "từ ngày 5 tháng 8 đến ngày 10 tháng 8 năm 2012", REF, (r) => {
        expect(r.start.get("day")).toBe(5);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("year")).toBe(2012);

        expect(r.end).not.toBeNull();
        expect(r.end.get("day")).toBe(10);
        expect(r.end.get("month")).toBe(8);
        expect(r.end.get("year")).toBe(2012);
    });
});

test("Test - em dash separator (–)", () => {
    testSingleCase(chrono.vi, "ngày 1 tháng 4 – ngày 30 tháng 4 năm 2000", REF, (r) => {
        expect(r.start.get("day")).toBe(1);
        expect(r.start.get("month")).toBe(4);

        expect(r.end).not.toBeNull();
        expect(r.end.get("day")).toBe(30);
        expect(r.end.get("month")).toBe(4);
        expect(r.end.get("year")).toBe(2000);
    });
});

test("Test - hyphen separator (-)", () => {
    testSingleCase(chrono.vi, "ngày 3 tháng 9 - ngày 5 tháng 9 năm 1945", REF, (r) => {
        expect(r.start.get("day")).toBe(3);
        expect(r.start.get("month")).toBe(9);
        expect(r.start.get("year")).toBe(1945);

        expect(r.end).not.toBeNull();
        expect(r.end.get("day")).toBe(5);
        expect(r.end.get("month")).toBe(9);
        expect(r.end.get("year")).toBe(1945);
    });
});

test("Test - tới connector", () => {
    testSingleCase(chrono.vi, "tháng 3 tới tháng 5 năm 1975", REF, (r) => {
        expect(r.start.get("month")).toBe(3);

        expect(r.end).not.toBeNull();
        expect(r.end.get("month")).toBe(5);
        expect(r.end.get("year")).toBe(1975);
    });
});

test("Test - start is before end", () => {
    testSingleCase(chrono.vi, "ngày 1 tháng 1 đến ngày 31 tháng 12 năm 2020", REF, (r) => {
        expect(r.end).not.toBeNull();
        const startDate = r.start.date();
        const endDate = r.end.date();
        expect(startDate.getTime()).toBeLessThan(endDate.getTime());
    });
});
