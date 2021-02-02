import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult, testWithExpectedDate } from "../test_util";

test("Test - Parsing Offset Expression", function () {
    testSingleCase(chrono.nl, "    04/2016   ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(4);
        expect(result.text).toBe("04/2016");
    });
});

test("Test - Single Expression", function () {
    testSingleCase(chrono.nl, "Het evenement gaat door (04/2016)", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(25);
        expect(result.text).toBe("04/2016");

        expect(result.start).toBeDate(new Date(2016, 4 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "Gepubliceerd: 06/2004", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2004);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(14);
        expect(result.text).toBe("06/2004");

        expect(result.start).toBeDate(new Date(2004, 6 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "8/10/2012", new Date(2012, 9, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);

        expect(result.index).toBe(0);
        expect(result.text).toBe("8/10/2012");

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 10 - 1, 8, 12));
    });

    testSingleCase(chrono.nl, ": 8/1/2012", new Date(2012, 0, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(8);

        expect(result.index).toBe(2);
        expect(result.text).toBe("8/1/2012");

        expect(result.start).toBeDate(new Date(2012, 0, 8, 12));
    });

    testSingleCase(chrono.nl, "8/10", new Date(2012, 10 - 1, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);

        expect(result.index).toBe(0);
        expect(result.text).toBe("8/10");

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 10 - 1, 8, 12));
    });

    testSingleCase(chrono.nl, "De deadline is 8/10/2012", new Date(2012, 10 - 1, 8), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("8/10/2012");

        expect(result.start).toBeDate(new Date(2012, 10 - 1, 8, 12));
    });

    testSingleCase(chrono.nl, "De deadline is dinsdag 11/3/2015", new Date(2015, 10, 3), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("dinsdag 11/3/2015");

        expect(result.start).toBeDate(new Date(2015, 2, 11, 12));
    });

    testSingleCase(chrono.nl, "28/2/2014", (result) => {
        expect(result.text).toBe("28/2/2014");
    });

    testWithExpectedDate(chrono.nl, "30-12-16", new Date(2016, 12 - 1, 30, 12));

    testSingleCase(chrono.nl, "vrijdag 30-12-16", (result) => {
        expect(result.text).toBe("vrijdag 30-12-16");
        expect(result).toBeDate(new Date(2016, 12 - 1, 30, 12));
    });
});

test("Test - Single Expression Little-Endian", function () {
    testSingleCase(chrono.nl, "8/10/2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);

        expect(result.index).toBe(0);
        expect(result.text).toBe("8/10/2012");

        expect(result.start).toBeDate(new Date(2012, 10 - 1, 8, 12));
    });

    testWithExpectedDate(chrono.nl, "30-12-16", new Date(2016, 12 - 1, 30, 12));

    testSingleCase(chrono.nl, "vrijdag 30-12-16", (result) => {
        expect(result.text).toBe("vrijdag 30-12-16");
        expect(result).toBeDate(new Date(2016, 12 - 1, 30, 12));
    });
});

test("Test - Single Expression Little-Endian with Month name", function () {
    testSingleCase(chrono.nl, "8 oktober 2012", new Date(2012, 10 - 1, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);

        expect(result.index).toBe(0);
        expect(result.text).toBe("8 oktober 2012");

        expect(result.start).toBeDate(new Date(2012, 10 - 1, 8, 12));
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.nl, "10/8/2012 - 15/8/2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10/8/2012 - 15/8/2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(15);

        expect(result.end).toBeDate(new Date(2012, 8 - 1, 15, 12));
    });
});

test("Test - Splitter variances patterns", function () {
    const expectDate = new Date(2015, 5 - 1, 25, 12, 0);

    testWithExpectedDate(chrono.nl, "2015-05-25", expectDate);
    testWithExpectedDate(chrono.nl, "2015/05/25", expectDate);
    testWithExpectedDate(chrono.nl, "2015.05.25", expectDate);
    testWithExpectedDate(chrono.nl, "25-05-2015", expectDate);
    testWithExpectedDate(chrono.nl, "25/05/2015", expectDate);
    testWithExpectedDate(chrono.nl, "25.05.2015", expectDate);

    // Also, guessing ambiguous date
    testWithExpectedDate(chrono.nl, "25/05/2015", expectDate);
});

test("Test - Impossible Dates and Unexpected Results", function () {
    testUnexpectedResult(chrono.nl, "8/32/2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.nl, "8/32", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.nl, "2/29/2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.nl, "2014/22/29", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.nl, "2014/13/22", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.nl, "80-32-89-89", new Date(2012, 7, 10));
});

test("Test - forward dates only option", function () {
    testSingleCase(chrono, "31/5", new Date(1999, 6 - 1, 1), { forwardDate: true }, (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2000);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("31/5");

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(false);

        expect(result.start).toBeDate(new Date(2000, 5 - 1, 31, 12));
    });
});
