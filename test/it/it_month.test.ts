import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Month Expressions", function () {
    testSingleCase(chrono.it, "settembre 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(0);
        expect(result.text).toBe("settembre 2012");

        expect(result.start).toBeDate(new Date(2012, 8, 1, 12));
    });

    testSingleCase(chrono.it, "set 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(0);
        expect(result.text).toBe("set 2012");

        expect(result.start).toBeDate(new Date(2012, 8, 1, 12));
    });

    testSingleCase(chrono.it, "Sarà a settembre", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("settembre");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 8, 1, 12));
    });
});

test("Test - Month Expressions with Year", function () {
    testSingleCase(chrono.it, "gennaio 2019", new Date(2018, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2019);
        expect(result.start.get("month")).toBe(1);

        expect(result.start).toBeDate(new Date(2019, 0, 1, 12));
    });

    testSingleCase(chrono.it, "dicembre 2018", new Date(2018, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2018);
        expect(result.start.get("month")).toBe(12);

        expect(result.start).toBeDate(new Date(2018, 11, 1, 12));
    });
});

test("Test - Month Forward Dates", function () {
    testSingleCase(chrono.it, "febbraio", new Date(2018, 7, 10), { forwardDate: true }, (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2019);
        expect(result.start.get("month")).toBe(2);

        expect(result.start).toBeDate(new Date(2019, 1, 1, 12));
    });
});
