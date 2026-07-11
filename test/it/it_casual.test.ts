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

test("Test - Casual time keeps its meridiem when merged with an explicit time", () => {
    testSingleCase(chrono.it, "pomeriggio alle 5", new Date(2016, 7, 10, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.it, "sera alle 8", new Date(2016, 7, 10, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("meridiem")).toBe(1);
    });
});

test("Test - Casual time midnight and noon", () => {
    testSingleCase(chrono.it.casual, "La scadenza è mezzanotte", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe(" mezzanotte");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
    });

    testSingleCase(chrono.it.casual, "La scadenza è mezzogiorno", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe(" mezzogiorno");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("meridiem")).toBe(0);
    });
});
