import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

// Note: Middle endian format (Month Day Year) is not commonly used in Italian
// These tests are included for completeness

test("Test - Single expression", function () {
    testSingleCase(chrono.it, "agosto 10, 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("agosto 10, 2012");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.it, "agosto 10", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("agosto 10");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });
});

test("Test - Impossible Dates", function () {
    testUnexpectedResult(chrono.it, "agosto 32, 2014");

    testUnexpectedResult(chrono.it, "febbraio 29, 2014");
});
