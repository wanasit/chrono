import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - h\u00f4m qua l\u00fac 7 gi\u1edd (morning reference = AM context)", () => {
    // Reference at 6am => implicit meridiem AM => 7 gi\u1edd = 7:00 AM
    testSingleCase(chrono.vi, "h\u00f4m qua l\u00fac 7 gi\u1edd", new Date(2012, 7, 10, 6), (r) => {
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("day")).toBe(9);
        expect(r.start.get("hour")).toBe(7);
    });
});

test("Test - ng\u00e0y mai l\u00fac 15 gi\u1edd", () => {
    testSingleCase(chrono.vi, "ng\u00e0y mai l\u00fac 15 gi\u1edd", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("day")).toBe(11);
        expect(r.start.get("hour")).toBe(15);
    });
});

test("Test - h\u00f4m nay bu\u1ed5i s\u00e1ng", () => {
    testSingleCase(chrono.vi, "h\u00f4m nay bu\u1ed5i s\u00e1ng", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("day")).toBe(10);
        expect(r.start.get("hour")).toBe(9);
    });
});
