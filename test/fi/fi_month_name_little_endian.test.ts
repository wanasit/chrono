import * as chrono from "../../src/locales/fi";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", function () {
    testSingleCase(chrono, "15. elokuuta", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono, "15 elokuuta 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono, "15. elo 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono, "3 tammikuuta", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(3);
    });

    testSingleCase(chrono, "1 joulukuuta 2023", new Date(2023, 10, 1), (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(1);
    });
});

test("Test - Range expression", function () {
    testSingleCase(chrono, "15-16 elokuuta", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(16);
    });
});

test("Test - Impossible Dates", function () {
    testUnexpectedResult(chrono, "32 elokuuta", new Date(2012, 7, 10));
});
