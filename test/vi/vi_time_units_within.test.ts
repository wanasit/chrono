import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - trong N ng\u00e0y", () => {
    testSingleCase(chrono.vi, "trong 3 ng\u00e0y", new Date(2012, 7, 10, 12), (r) => {
        expect(r.text).toBe("trong 3 ng\u00e0y");
        expect(r.start.get("day")).toBe(13);
        expect(r.start.get("month")).toBe(8);
    });
});

test("Test - trong N tu\u1ea7n", () => {
    testSingleCase(chrono.vi, "Ho\u00e0n th\u00e0nh trong 2 tu\u1ea7n.", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("day")).toBe(24);
        expect(r.start.get("month")).toBe(8);
    });
});

test("Test - trong v\u00f2ng N th\u00e1ng", () => {
    testSingleCase(chrono.vi, "trong v\u00f2ng 3 th\u00e1ng", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("month")).toBe(11);
        expect(r.start.get("year")).toBe(2012);
    });
});
