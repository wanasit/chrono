import { testSingleCase, testUnexpectedResult } from "../test_util";
import * as chrono from "../../src";

test("Test - Single Expression (YYYY.MM.DD)", function () {
    testSingleCase(chrono.it, "2012.08.10", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2012.08.10");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.it, "La scadenza è 2012.08.10", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("2012.08.10");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.it.strict, "2014.02.28", (result) => {
        expect(result.text).toBe("2014.02.28");
    });

    testSingleCase(chrono.it.strict, "2014.12.28", (result) => {
        expect(result.text).toBe("2014.12.28");
        expect(result).toBeDate(new Date(2014, 12 - 1, 28, 12));
    });
});

test("Test - Not parse unlikely YYYY.MM.DD pattern", function () {
    testUnexpectedResult(chrono.it, "2012.80.10", new Date(2012, 7, 10));
});

test("Test - Not parse impossible dates", function () {
    testUnexpectedResult(chrono.it, "2014.08.32");
    testUnexpectedResult(chrono.it, "2014.02.30");
});
