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

test("Test - Range Expression", function () {
    testSingleCase(chrono.ja, "2013/12/26~2014/1/7", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2013/12/26~2014/1/7");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(26);

        expect(result.start).toBeDate(new Date(2013, 12 - 1, 26, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2014);
        expect(result.end.get("month")).toBe(1);
        expect(result.end.get("day")).toBe(7);

        expect(result.end).toBeDate(new Date(2014, 1 - 1, 7, 12));
    });
});
