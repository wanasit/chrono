import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", () => {
    testSingleCase(chrono.it, "Ci vediamo ad Agosto 2017.", (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(14);
        expect(result.text).toBe("Agosto 2017");

        expect(result.start).toBeDate(new Date(2017, 8 - 1, 1, 12));
    });

    testSingleCase(chrono.it, "Agosto 10, 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("Agosto 10, 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.it, "La scadenza è Agosto 10", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.text).toBe("Agosto 10");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });
});
