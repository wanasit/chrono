import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Persian Weekdays", () => {
    // Aug 9, 2012 is Thursday. Monday is closest in the past (Aug 6 = -3 days vs Aug 13 = +4 days)
    testSingleCase(chrono.fa, "دوشنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("دوشنبه");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 6, 12));
    });

    // Friday is 1 day forward from Thursday
    testSingleCase(chrono.fa, "جمعه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("جمعه");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    // Saturday is 2 days forward from Thursday
    testSingleCase(chrono.fa, "شنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("شنبه");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("weekday")).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    // Sunday is 3 days forward from Thursday (Aug 12)
    testSingleCase(chrono.fa, "یکشنبه", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("weekday")).toBe(0);
        expect(result.start.get("day")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 12, 12));
    });
});

test("Test - Persian Weekdays with Modifiers", () => {
    // Test "next Monday" from Thursday
    testSingleCase(chrono.fa, "دوشنبه آینده", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("weekday")).toBe(1);
    });

    // Test "last Monday" from Thursday
    testSingleCase(chrono.fa, "دوشنبه گذشته", new Date(2012, 7, 9, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);
    });
});
