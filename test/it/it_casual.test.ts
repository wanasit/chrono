import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", () => {
    testSingleCase(chrono.it.casual, "La scadenza è ora", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("ora");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start.get("second")).toBe(10);
        expect(result.start.get("millisecond")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.it.casual, "La scadenza è oggi", new Date(2012, 7, 10, 14, 12), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("oggi");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 12));
    });

    testSingleCase(chrono.it.casual, "La scadenza è domani", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("domani");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 17, 10));
    });
});
