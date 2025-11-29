import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.it, "entro 5 giorni faremo qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("entro 5 giorni");

        expect(result.start).toBeDate(new Date(2012, 7, 15));
    });

    testSingleCase(chrono.it, "entro 15 minuti", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("entro 15 minuti");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.it, "entro un giorno faremo qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.index).toBe(0);
        expect(result.text).toBe("entro un giorno");

        expect(result.start).toBeDate(new Date(2012, 7, 11));
    });

    testSingleCase(chrono.it, "entro una settimana faremo qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(17);

        expect(result.index).toBe(0);
        expect(result.text).toBe("entro una settimana");

        expect(result.start).toBeDate(new Date(2012, 7, 17));
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.it, "entro 15 minuti forse");

    testUnexpectedResult(chrono.it, "2020");

    testUnexpectedResult(chrono.it, "numero di 5 ore");
});
