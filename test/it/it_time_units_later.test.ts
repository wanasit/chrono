import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.it, "tra 5 giorni faremo qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("tra 5 giorni");

        expect(result.start).toBeDate(new Date(2012, 7, 15));
    });

    testSingleCase(chrono.it, "fra 10 giorni faremo qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("fra 10 giorni");

        expect(result.start).toBeDate(new Date(2012, 7, 20));
    });

    testSingleCase(chrono.it, "tra 15 minuti", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("tra 15 minuti");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.it, "tra un giorno faremo qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.index).toBe(0);
        expect(result.text).toBe("tra un giorno");

        expect(result.start).toBeDate(new Date(2012, 7, 11));
    });

    testSingleCase(chrono.it, "fra una settimana faremo qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(17);

        expect(result.index).toBe(0);
        expect(result.text).toBe("fra una settimana");

        expect(result.start).toBeDate(new Date(2012, 7, 17));
    });

    testSingleCase(chrono.it, "5 minuti dopo", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 minuti dopo");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(19);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.it, "5 minuti più tardi", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 minuti più tardi");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(19);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });
});

test("Test - Nested time later", function () {
    testSingleCase(chrono.it, "tra 5 giorni e 12 ore", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("tra 5 giorni e 12 ore");
        expect(result.start.get("day")).toBe(16);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 16, 0, 14));
    });

    testSingleCase(chrono.it, "fra 3 settimane e 2 giorni", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("fra 3 settimane e 2 giorni");
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("month")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 8, 2, 12, 14));
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.it, "2020");

    testUnexpectedResult(chrono.it, "numero di 5 ore");
});
