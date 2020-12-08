import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", function () {
    testSingleCase(chrono.fr, "10 Août 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Août 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "8 Février", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(8);

        expect(result.index).toBe(0);
        expect(result.text).toBe("8 Février");

        expect(result.start).toBeDate(new Date(2013, 2 - 1, 8, 12));
    });

    testSingleCase(chrono.fr, "1er Août 2012", new Date(2012, 7, 1), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(0);
        expect(result.text).toBe("1er Août 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 1, 12));
    });

    testSingleCase(chrono.fr, "10 Août 234 AC", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Août 234 AC");

        expect(result.start.get("year")).toBe(-234);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(-234, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "10 Août 88 p. Chr. n.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Août 88 p. Chr. n.");

        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.fr, "Dim 15 Sept", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Dim 15 Sept");

        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.fr, "DIM 15SEPT", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("DIM 15SEPT");

        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.fr, "La date limite est le 10 Août", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(22);
        expect(result.text).toBe("10 Août");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "La date limite est le Mardi 10 janvier", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(22);
        expect(result.text).toBe("Mardi 10 janvier");

        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "La date limite est Mar 10 Jan", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe("Mar 10 Jan");

        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "31 mars 2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("31 mars 2016");

        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(31);

        expect(result.start).toBeDate(new Date(2016, 3 - 1, 31, 12));
    });
});

test("Test - Range expression", function () {
    testSingleCase(chrono.fr, "10 - 22 août 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 - 22 août 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.fr, "10 au 22 août 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 au 22 août 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.fr, "10 août - 12 septembre", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 août - 12 septembre");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 9 - 1, 12, 12));
    });

    testSingleCase(chrono.fr, "10 août - 12 septembre 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 août - 12 septembre 2013");

        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2013);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2013, 9 - 1, 12, 12));
    });
});

test("Test - Date/Time combined expression", function () {
    testSingleCase(chrono.fr, "12 juillet à 19:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 juillet à 19:00");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 12, 19, 0));
    });

    testSingleCase(chrono.fr, "5 mai 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 mai 12:00");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 5, 12, 0));
    });

    testSingleCase(chrono.fr, "7 Mai 11:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("7 Mai 11:00");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("hour")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 7, 11, 0));
    });
});

test("Test - Accentuated text parsing", function () {
    testSingleCase(chrono.fr, "10 Août 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Août 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "10 Février 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Février 2012");

        expect(result.start).toBeDate(new Date(2012, 2 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "10 Décembre 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Décembre 2012");

        expect(result.start).toBeDate(new Date(2012, 12 - 1, 10, 12));
    });
});

test("Test - Unaccentuated text parsing", function () {
    testSingleCase(chrono.fr, "10 Aout 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Aout 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "10 Fevrier 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Fevrier 2012");

        expect(result.start).toBeDate(new Date(2012, 2 - 1, 10, 12));
    });

    testSingleCase(chrono.fr, "10 Decembre 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Decembre 2012");

        expect(result.start).toBeDate(new Date(2012, 12 - 1, 10, 12));
    });
});

test("Test - Impossible Dates", function () {
    testUnexpectedResult(chrono.fr, "32 Août 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.fr, "29 Février 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.fr, "32 Aout", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.fr, "29 Fevrier", new Date(2013, 7, 10));
});
