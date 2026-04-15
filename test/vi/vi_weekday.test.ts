import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

// REF: 2012-08-09 Thu
const REF = new Date(2012, 7, 9);

test("Test - full weekday names", () => {
    testSingleCase(chrono.vi, "H\u1ecdn v\u00e0o th\u1ee9 hai", REF, (r) => {
        expect(r.start.get("weekday")).toBe(1);
    });
    testSingleCase(chrono.vi, "th\u1ee9 ba", REF, (r) => {
        expect(r.start.get("weekday")).toBe(2);
    });
    testSingleCase(chrono.vi, "th\u1ee9 t\u01b0", REF, (r) => {
        expect(r.start.get("weekday")).toBe(3);
    });
    testSingleCase(chrono.vi, "th\u1ee9 n\u0103m", REF, (r) => {
        expect(r.start.get("weekday")).toBe(4);
    });
    testSingleCase(chrono.vi, "th\u1ee9 s\u00e1u", REF, (r) => {
        expect(r.start.get("weekday")).toBe(5);
    });
    testSingleCase(chrono.vi, "th\u1ee9 b\u1ea3y", REF, (r) => {
        expect(r.start.get("weekday")).toBe(6);
    });
    testSingleCase(chrono.vi, "ch\u1ee7 nh\u1eadt", REF, (r) => {
        expect(r.start.get("weekday")).toBe(0);
    });
});

test("Test - abbreviations t2-t7 / cn", () => {
    testSingleCase(chrono.vi, "H\u1ecdn t2", REF, (r) => {
        expect(r.start.get("weekday")).toBe(1);
    });
    testSingleCase(chrono.vi, "t7", REF, (r) => {
        expect(r.start.get("weekday")).toBe(6);
    });
    testSingleCase(chrono.vi, "cn", REF, (r) => {
        expect(r.start.get("weekday")).toBe(0);
    });
});

test("Test - weekday implies a date", () => {
    testSingleCase(chrono.vi, "th\u1ee9 hai t\u1edbi", REF, (r) => {
        expect(r.start.get("weekday")).toBe(1);
        expect(r.start.isCertain("day")).toBe(false); // implied, not certain
    });
});

test("Test - next weekday modifiers (tới/sau)", () => {
    // REF is Thu 2012-08-09; next Monday = 2012-08-13
    testSingleCase(chrono.vi, "th\u1ee9 hai t\u1edbi", REF, (r) => {
        expect(r.start.get("weekday")).toBe(1);
        expect(r.start.get("day")).toBe(13);
    });
    testSingleCase(chrono.vi, "th\u1ee9 hai sau", REF, (r) => {
        expect(r.start.get("weekday")).toBe(1);
        expect(r.start.get("day")).toBe(13);
    });
});

test("Test - last weekday modifier (qua)", () => {
    // REF is Thu 2012-08-09; last Monday = 2012-08-06
    testSingleCase(chrono.vi, "th\u1ee9 hai qua", REF, (r) => {
        expect(r.start.get("weekday")).toBe(1);
        expect(r.start.get("day")).toBe(6);
    });
});
