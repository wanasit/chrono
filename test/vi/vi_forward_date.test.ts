import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - forwardDate: time-only rolls to next day when ref is past", () => {
    // "7 gi\u1edd s\u00e1ng" = 7:00 AM; ref is 8:00 AM same day \u2192 next day
    testSingleCase(chrono.vi, "7 gi\u1edd s\u00e1ng", new Date(2012, 7, 10, 8, 0), { forwardDate: true }, (r) => {
        expect(r.start.get("day")).toBe(11);
        expect(r.start.get("hour")).toBe(7);
    });
});

test("Test - forwardDate: weekday rolls to next occurrence", () => {
    // REF = Tuesday Aug 14, 2012; "th\u1ee9 hai" (Monday) last was Aug 13 \u2192 next Monday = Aug 20
    testSingleCase(chrono.vi, "th\u1ee9 hai", new Date(2012, 7, 14, 12), { forwardDate: true }, (r) => {
        expect(r.start.get("weekday")).toBe(1);
        expect(r.start.get("day")).toBe(20);
        expect(r.start.get("month")).toBe(8);
    });
});

test("Test - forwardDate: slash date without year rolls to next year", () => {
    // "15/3" = March 15; ref is Aug 10 (past March) \u2192 year 2013
    testSingleCase(chrono.vi, "15/3", new Date(2012, 7, 10, 12), { forwardDate: true }, (r) => {
        expect(r.start.get("day")).toBe(15);
        expect(r.start.get("month")).toBe(3);
        expect(r.start.get("year")).toBe(2013);
    });
});

test("Test - forwardDate: same weekday as ref stays on same day", () => {
    // REF = Thursday Aug 9, 2012; "thứ năm" (Thursday) = same day → stays on Aug 9 (not past)
    testSingleCase(chrono.vi, "th\u1ee9 n\u0103m", new Date(2012, 7, 9, 12), { forwardDate: true }, (r) => {
        expect(r.start.get("weekday")).toBe(4);
        expect(r.start.get("day")).toBe(9);
        expect(r.start.get("month")).toBe(8);
    });
});

test("Test - forwardDate: month without year rolls to next year", () => {
    // "th\u00e1ng 3" = March; ref is Aug 10 \u2192 next March = 2013
    testSingleCase(chrono.vi, "th\u00e1ng 3", new Date(2012, 7, 10, 12), { forwardDate: true }, (r) => {
        expect(r.start.get("month")).toBe(3);
        expect(r.start.get("year")).toBe(2013);
    });
});
