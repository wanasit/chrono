import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

const REF = new Date(2012, 7, 10, 12, 0, 0); // 2012-08-10

test("Test - ng\u00e0y D th\u00e1ng M n\u0103m YYYY (full with ng\u00e0y prefix)", () => {
    testSingleCase(
        chrono.vi,
        "Ng\u00e0y 30 th\u00e1ng 4 n\u0103m 1975 l\u00e0 ng\u00e0y gi\u1ea3i ph\u00f3ng.",
        REF,
        (r) => {
            expect(r.start.get("year")).toBe(1975);
            expect(r.start.get("month")).toBe(4);
            expect(r.start.get("day")).toBe(30);
            expect(r.start.isCertain("year")).toBe(true);
            expect(r.start.isCertain("month")).toBe(true);
            expect(r.start.isCertain("day")).toBe(true);
        }
    );

    testSingleCase(
        chrono.vi,
        "Hi\u1ec7p \u0111\u1ecbnh \u0111\u01b0\u1ee3c k\u00fd ng\u00e0y 27 th\u00e1ng 1 n\u0103m 1973.",
        REF,
        (r) => {
            expect(r.text).toBe("ng\u00e0y 27 th\u00e1ng 1 n\u0103m 1973");
            expect(r.start.get("year")).toBe(1973);
            expect(r.start.get("month")).toBe(1);
            expect(r.start.get("day")).toBe(27);
        }
    );

    testSingleCase(chrono.vi, "ng\u00e0y 2 th\u00e1ng 9 n\u0103m 1945", REF, (r) => {
        expect(r.start.get("year")).toBe(1945);
        expect(r.start.get("month")).toBe(9);
        expect(r.start.get("day")).toBe(2);
    });
});

test("Test - D th\u00e1ng M n\u0103m YYYY (no ng\u00e0y prefix)", () => {
    testSingleCase(
        chrono.vi,
        "7 th\u00e1ng 5 n\u0103m 1954 l\u00e0 ng\u00e0y ch\u1ea5m d\u1ee9t tr\u1eadn \u0110i\u1ec7n Bi\u00ean Ph\u1ee7.",
        REF,
        (r) => {
            expect(r.start.get("day")).toBe(7);
            expect(r.start.get("month")).toBe(5);
            expect(r.start.get("year")).toBe(1954);
        }
    );

    testSingleCase(chrono.vi, "1 th\u00e1ng 1 n\u0103m 1863", REF, (r) => {
        expect(r.start.get("day")).toBe(1);
        expect(r.start.get("month")).toBe(1);
        expect(r.start.get("year")).toBe(1863);
    });
});

test("Test - Date without year implies closest year", () => {
    testSingleCase(chrono.vi, "ng\u00e0y 15 th\u00e1ng 3", REF, (r) => {
        expect(r.start.get("day")).toBe(15);
        expect(r.start.get("month")).toBe(3);
        expect(r.start.isCertain("year")).toBe(false);
        expect(r.start.isCertain("day")).toBe(true);
        expect(r.start.isCertain("month")).toBe(true);
    });
});

test("Test - index position is correct", () => {
    testSingleCase(
        chrono.vi,
        "S\u1ef1 ki\u1ec7n ng\u00e0y 30 th\u00e1ng 4 n\u0103m 1975 quan tr\u1ecdng.",
        REF,
        (r) => {
            expect(r.index).toBe(8);
            expect(r.text).toBe("ng\u00e0y 30 th\u00e1ng 4 n\u0103m 1975");
            expect(r.start.get("year")).toBe(1975);
        }
    );
});

test("Test - negative: invalid month rejected", () => {
    // tháng 13 is rejected; without a year, no other parser fires
    testUnexpectedResult(chrono.vi, "ngày 1 tháng 13", REF);
    // "ngày 32 tháng 4" partially matches as "2 tháng 4" — day bounds enforced by VIStandardParser (day > 31)
});
