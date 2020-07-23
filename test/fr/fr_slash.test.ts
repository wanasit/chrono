import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.fr, "8/2/2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8/2/2016");

        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(8);

        expect(result.start).toBeDate(new Date(2016, 2 - 1, 8, 12));
    });

    testSingleCase(chrono.fr, "le 8/2/2016", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(8);

        expect(result.start).toBeDate(new Date(2016, 2 - 1, 8, 12));
    });

    testSingleCase(chrono.fr, "le 8/2", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(8);

        expect(result.start).toBeDate(new Date(2013, 2 - 1, 8, 12));
    });
});

test("Test - Single Expression with weekday", function () {
    testSingleCase(chrono.fr, "lundi 8/2/2016", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("lundi 8/2/2016");
        expect(result.start).toBeDate(new Date(2016, 2 - 1, 8, 12));
    });

    testSingleCase(chrono.fr, "samedi 9/2/20 ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("samedi 9/2/20");

        expect(result.start.get("year")).toBe(2020);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(9);

        expect(result.start).toBeDate(new Date(2020, 2 - 1, 9, 12));
    });
});
