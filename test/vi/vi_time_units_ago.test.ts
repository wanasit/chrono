import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - N ng\u00e0y tr\u01b0\u1edbc", () => {
    testSingleCase(chrono.vi, "S\u1ef1 ki\u1ec7n 3 ng\u00e0y tr\u01b0\u1edbc.", new Date(2012, 7, 10, 12), (r) => {
        expect(r.text).toBe("3 ng\u00e0y tr\u01b0\u1edbc");
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("day")).toBe(7);
    });
});

test("Test - N tu\u1ea7n tr\u01b0\u1edbc", () => {
    testSingleCase(chrono.vi, "2 tu\u1ea7n tr\u01b0\u1edbc", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("day")).toBe(27); // Aug 27 - 14 = July 27
        expect(r.start.get("month")).toBe(7);
    });
});

test("Test - N th\u00e1ng tr\u01b0\u1edbc", () => {
    testSingleCase(chrono.vi, "3 th\u00e1ng tr\u01b0\u1edbc", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("month")).toBe(5);
        expect(r.start.get("year")).toBe(2012);
    });
});

test("Test - N n\u0103m tr\u01b0\u1edbc", () => {
    testSingleCase(chrono.vi, "5 n\u0103m tr\u01b0\u1edbc", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("year")).toBe(2007);
    });
});

test("Test - qua variant (1 tháng qua)", () => {
    testSingleCase(chrono.vi, "1 tháng qua", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("month")).toBe(7);
        expect(r.start.get("year")).toBe(2012);
    });
});
