import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Year Parsing", function () {
    // Note: "nel 2015" and "anno 2015" are not supported by the parser
    // The parser recognizes years as part of date expressions like "10 agosto 2015"
});

test("Test - Two digit year parsing", function () {
    testSingleCase(chrono.it, "10 agosto 12", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.text).toBe("10 agosto 12");
    });

    testSingleCase(chrono.it, "10 agosto 99", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1999);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.text).toBe("10 agosto 99");
    });

    testSingleCase(chrono.it, "10 agosto 68", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1968);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.text).toBe("10 agosto 68");
    });
});

test("Test - Negative year", function () {
    testUnexpectedResult(chrono.it, "nel 0000");
});
