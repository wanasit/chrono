import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.it, "5 giorni fa abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 giorni fa");

        expect(result.start).toBeDate(new Date(2012, 7, 5));
    });

    testSingleCase(chrono.it, "10 giorni fa abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 giorni fa");

        expect(result.start).toBeDate(new Date(2012, 6, 31));
    });

    testSingleCase(chrono.it, "15 minuti fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuti fa");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.it, "un giorno fa abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("un giorno fa");

        expect(result.start).toBeDate(new Date(2012, 7, 9));
    });

    testSingleCase(chrono.it, "una settimana fa abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);

        expect(result.index).toBe(0);
        expect(result.text).toBe("una settimana fa");

        expect(result.start).toBeDate(new Date(2012, 7, 3));
    });
});

test("Test - Nested time ago", function () {
    testSingleCase(chrono.it, "5 giorni e 12 ore fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 giorni e 12 ore fa");
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 5, 0, 14));
    });

    testSingleCase(chrono.it, "3 settimane e 2 giorni fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("3 settimane e 2 giorni fa");
        expect(result.start.get("day")).toBe(18);
        expect(result.start.get("month")).toBe(7);

        expect(result.start).toBeDate(new Date(2012, 6, 18, 12, 14));
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.it, "15 minuti fa forse");

    testUnexpectedResult(chrono.it, "in 5 minuti");

    testUnexpectedResult(chrono.it, "2020");

    testUnexpectedResult(chrono.it, "numero di 5 ore");
});
