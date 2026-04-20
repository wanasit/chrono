import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

const REF = new Date(2012, 7, 10, 12); // 2012-08-10

test("Test - Strict rejects casual date expressions", () => {
    testUnexpectedResult(chrono.vi.strict, "h\u00f4m nay", REF);
    testUnexpectedResult(chrono.vi.strict, "h\u00f4m qua", REF);
    testUnexpectedResult(chrono.vi.strict, "ng\u00e0y mai", REF);
    testUnexpectedResult(chrono.vi.strict, "ng\u00e0y kia", REF);
});

test("Test - Strict rejects casual time-of-day expressions", () => {
    testUnexpectedResult(chrono.vi.strict, "bu\u1ed5i s\u00e1ng", REF);
    testUnexpectedResult(chrono.vi.strict, "bu\u1ed5i tr\u01b0a", REF);
    testUnexpectedResult(chrono.vi.strict, "bu\u1ed5i chi\u1ec1u", REF);
    testUnexpectedResult(chrono.vi.strict, "bu\u1ed5i t\u1ed1i", REF);
});

test("Test - Strict rejects casual relative expressions", () => {
    testUnexpectedResult(chrono.vi.strict, "tu\u1ea7n n\u00e0y", REF);
    testUnexpectedResult(chrono.vi.strict, "th\u00e1ng tr\u01b0\u1edbc", REF);
    testUnexpectedResult(chrono.vi.strict, "n\u0103m sau", REF);
});

test("Test - Strict rejects weekday-only expressions", () => {
    testUnexpectedResult(chrono.vi.strict, "th\u1ee9 hai", REF);
    testUnexpectedResult(chrono.vi.strict, "ch\u1ee7 nh\u1eadt", REF);
});

test("Test - Strict accepts standard full dates and times", () => {
    testSingleCase(chrono.vi.strict, "ng\u00e0y 30 th\u00e1ng 4 n\u0103m 1975", REF, (r) => {
        expect(r.start.get("year")).toBe(1975);
        expect(r.start.get("month")).toBe(4);
        expect(r.start.get("day")).toBe(30);
    });

    testSingleCase(chrono.vi.strict, "l\u00fac 7 gi\u1edd 30 ph\u00fat", REF, (r) => {
        expect(r.start.get("hour")).toBe(7);
        expect(r.start.get("minute")).toBe(30);
    });
});

test("Test - Strict accepts explicit time unit expressions", () => {
    testSingleCase(chrono.vi.strict, "3 ng\u00e0y tr\u01b0\u1edbc", REF, (r) => {
        expect(r.start.get("day")).toBe(7);
        expect(r.start.get("month")).toBe(8);
    });

    testSingleCase(chrono.vi.strict, "2 tu\u1ea7n sau", REF, (r) => {
        expect(r.start.get("day")).toBe(24);
        expect(r.start.get("month")).toBe(8);
    });
});
