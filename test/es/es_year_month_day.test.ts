import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Year-Month-Day format", () => {
    testSingleCase(chrono.es, "2020-12-25", (result) => {
        expect(result.start.get("year")).toBe(2020);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(25);

        expect(result.text).toBe("2020-12-25");
    });

    testSingleCase(chrono.es, "2021/01/15", (result) => {
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(15);

        expect(result.text).toBe("2021/01/15");
    });

    testSingleCase(chrono.es, "2019.03.20", (result) => {
        expect(result.start.get("year")).toBe(2019);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(20);

        expect(result.text).toBe("2019.03.20");
    });

    testSingleCase(chrono.es, "La fecha es 2022-06-30", (result) => {
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(30);

        expect(result.text).toBe("2022-06-30");
        expect(result.index).toBe(12);
    });
});
