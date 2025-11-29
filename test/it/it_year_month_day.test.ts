import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", function () {
    testSingleCase(chrono.it, "2012-8-10", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2012-8-10");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.it, "2012/8/10", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2012/8/10");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.it, "Il 2012/8/10", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("2012/8/10");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });
});

test("Test - Range expression", function () {
    testSingleCase(chrono.it, "2012/8/10 - 2012/8/15", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2012/8/10 - 2012/8/15");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(15);

        expect(result.end).toBeDate(new Date(2012, 7, 15, 12));
    });
});

test("Test - Impossible dates", function () {
    testUnexpectedResult(chrono.it, "2012/8/32");

    testUnexpectedResult(chrono.it, "2012/13/10");

    testUnexpectedResult(chrono.it, "2012/0/10");

    testUnexpectedResult(chrono.it, "2012/8/0");
});
