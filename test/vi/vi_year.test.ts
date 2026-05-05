import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

const REF = new Date(2012, 7, 10, 12);

test("Test - n\u0103m YYYY", () => {
    testSingleCase(chrono.vi, "Vi\u1ec7t Nam th\u1ed1ng nh\u1ea5t v\u00e0o n\u0103m 1976.", REF, (r) => {
        expect(r.text).toBe("n\u0103m 1976");
        expect(r.start.get("year")).toBe(1976);
    });

    testSingleCase(chrono.vi, "C\u00e1ch m\u1ea1ng n\u0103m 1789.", REF, (r) => {
        expect(r.start.get("year")).toBe(1789);
    });
});

test("Test - n\u0103m BC (TCN)", () => {
    testSingleCase(chrono.vi, "N\u0103m 179 TCN, tri\u1ec1u \u0110i\u1ec7t b\u1ecb di\u1ec7t.", REF, (r) => {
        expect(r.start.get("year")).toBe(-179);
    });

    testSingleCase(chrono.vi, "V\u0103n minh c\u00f3 t\u1eeb n\u0103m 3000 TCN.", REF, (r) => {
        expect(r.start.get("year")).toBe(-3000);
    });
});

test("Test - 3-digit year", () => {
    testSingleCase(chrono.vi, "n\u0103m 938 l\u00e0 n\u0103m \u0111\u1ed9c l\u1eadp.", REF, (r) => {
        expect(r.start.get("year")).toBe(938);
    });
});

test("Test - year with month and day", () => {
    testSingleCase(chrono.vi, "ng\u00e0y 2 th\u00e1ng 9 n\u0103m 1945", REF, (r) => {
        expect(r.start.get("year")).toBe(1945);
        expect(r.start.isCertain("year")).toBe(true);
    });
});

test("Test - negative: bare 4-digit number not a year", () => {
    testUnexpectedResult(chrono.vi, "C\u00f3 1975 ng\u01b0\u1eddi tham gia.", REF);
});
