import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.de, "Wir müssen etwas in 5 Tagen erledigen.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("in 5 Tagen");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.de, "Wir müssen etwas in fünf Tagen erledigen.", new Date(2012, 7, 10, 11, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("in fünf Tagen");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15, 11, 12));
    });

    testSingleCase(chrono.de, "in 5 Minuten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 5 Minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.de, "für 5 minuten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("für 5 minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.de, "in einer Stunde", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in einer Stunde");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono.de, "starte einen Timer für 5 Minuten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe("für 5 Minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.de, "In 5 Minuten gehe ich nach Hause", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 Minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.de, "In 5 Sekunden wird ein Auto fahren", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 Sekunden");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });

    testSingleCase(chrono.de, "in zwei Wochen", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in zwei Wochen");

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12, 14));
    });

    testSingleCase(chrono.de, "in einem Monat", new Date(2012, 7, 10, 7, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in einem Monat");

        expect(result.start).toBeDate(new Date(2012, 8, 10, 7, 14));
    });

    testSingleCase(chrono.de, "in einigen Monaten", new Date(2012, 6, 10, 22, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in einigen Monaten");

        expect(result.start).toBeDate(new Date(2012, 9, 10, 22, 14));
    });

    testSingleCase(chrono.de, "in einem Jahr", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in einem Jahr");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono.de, "in 20 Jahren", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 20 Jahren");

        expect(result.start).toBeDate(new Date(2032, 7, 10, 12, 14));
    });

    testSingleCase(chrono.de, "In 5 Minuten wird ein Auto fahren", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 Minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.de, "In 5 Min wird ein Auto fahren", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 Min");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });
});
