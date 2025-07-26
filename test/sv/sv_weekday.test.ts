import * as chrono from "../../src/locales/sv";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono, "måndag", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("måndag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);
    });

    testSingleCase(chrono, "på måndag", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("på måndag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);
    });
});

test("Test - Next/Last Week Expression", function () {
    testSingleCase(chrono, "nästa måndag", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("nästa måndag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("weekday")).toBe(1);
    });

    testSingleCase(chrono, "förra måndag", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("förra måndag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);
    });
});

test("Test - Weekday variations", function () {
    testSingleCase(chrono, "söndag", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(0);
    });

    testSingleCase(chrono, "tisdag", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(2);
    });

    testSingleCase(chrono, "fredag", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(5);
    });

    testSingleCase(chrono, "lördag", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(6);
    });
});
