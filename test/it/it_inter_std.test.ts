import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression Start with Year", function () {
    testSingleCase(chrono.it, "2012-8-10", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2012-8-10");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.it, "È il 2012-08-10", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(5);
        expect(result.text).toBe("2012-08-10");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.it, "2012-08-32");

    // Note: 2012-13-10 may be parsed as October 13 in little-endian format

    testUnexpectedResult(chrono.it, "2012-00-10");

    testUnexpectedResult(chrono.it, "2012-08-00");
});
