import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.it, "Sarà il 25/12/2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("25/12/2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);

        expect(result.start).toBeDate(new Date(2012, 11, 25, 12));
    });

    testSingleCase(chrono.it, "Sarà il 25/12/12", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("25/12/12");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);

        expect(result.start).toBeDate(new Date(2012, 11, 25, 12));
    });

    testSingleCase(chrono.it, "Sarà il 25/12", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("25/12");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);

        expect(result.start).toBeDate(new Date(2012, 11, 25, 12));
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.it, "dal 25/12/2012 al 30/12/2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dal 25/12/2012 al 30/12/2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);

        expect(result.start).toBeDate(new Date(2012, 11, 25, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(12);
        expect(result.end.get("day")).toBe(30);

        expect(result.end).toBeDate(new Date(2012, 11, 30, 12));
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.it, "32/12/2012");

    testUnexpectedResult(chrono.it, "25/13/2012");

    testUnexpectedResult(chrono.it, "0/12/2012");
});
