import * as chrono from "../../src/locales/sv";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", function () {
    testSingleCase(chrono, "den 15 augusti", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono, "15 augusti 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono, "15 aug 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });
});

test("Test - Range expression", function () {
    testSingleCase(chrono, "15-16 augusti", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(16);
    });

    testSingleCase(chrono, "15 till 16 augusti", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(16);
    });
});

test("Test - Impossible Dates", function () {
    testUnexpectedResult(chrono, "32 augusti", new Date(2012, 7, 10));
});
