import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.ja, "2012/3/31", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2012/3/31");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(31);

        expect(result.start).toBeDate(new Date(2012, 3 - 1, 31, 12));
    });
    testSingleCase(chrono.ja, "12/31", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12/31");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(31);

        expect(result.start).toBeDate(new Date(2012, 12 - 1, 31, 12));
    });

    testSingleCase(chrono.ja, "8/5", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8/5");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5, 12));
    });
});
