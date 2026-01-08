import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Persian Time Units Ago", () => {
    testSingleCase(chrono.fa, "5 روز پیش", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 روز پیش");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 5, 12));
    });

    testSingleCase(chrono.fa, "2 ساعت قبل", new Date(2012, 7, 10, 15, 0), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2 ساعت قبل");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 0));
    });

    testSingleCase(chrono.fa, "3 هفته پیش", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 6, 20, 12));
    });
});
