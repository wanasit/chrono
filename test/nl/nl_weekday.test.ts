import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.nl, "maandag", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("maandag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 7, 6, 12));
    });

    testSingleCase(chrono.nl, "maandag (forward dates only)", new Date(2012, 7, 9), { forwardDate: true }, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("maandag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 7, 13, 12));
    });

    testSingleCase(chrono.nl, "donderdag", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("donderdag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    testSingleCase(chrono.nl, "zondag", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("zondag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 12, 12));
    });

    testSingleCase(chrono.nl, "De deadline is vorige vrijdag...", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("vorige vrijdag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 3, 12));
    });

    testSingleCase(chrono.nl, "De deadline is vorige vrijdag...", new Date(2012, 7, 12), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("vorige vrijdag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(
        chrono.nl,
        "Laten we een meeting hebben op volgende week vrijdag",
        new Date(2015, 3, 16),
        (result) => {
            expect(result.index).toBe(28);
            expect(result.text).toBe("op volgende week vrijdag");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2015);
            expect(result.start.get("month")).toBe(4);
            expect(result.start.get("day")).toBe(24);
            expect(result.start.get("weekday")).toBe(5);

            expect(result.start).toBeDate(new Date(2015, 3, 24, 12));
        }
    );

    testSingleCase(chrono.nl, "Ik plan een vrije dag op volgende week dinsdag", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(22);
        expect(result.text).toBe("op volgende week dinsdag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2015);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(21);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2015, 3, 21, 12));
    });
});

test("Test - Weekday With Casual Time", function () {
    testSingleCase(chrono.nl, "Laten we op dinsdag ochtend afspreken", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("op dinsdag ochtend");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2015);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(21);
        expect(result.start.get("weekday")).toBe(2);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2015, 3, 21, 6));
    });
});

test("Test - Weekday Overlap", function () {
    testSingleCase(chrono.nl, "zondag, 7 december 2014", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("zondag, 7 december 2014");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2014);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start).toBeDate(new Date(2014, 12 - 1, 7, 12));
    });

    testSingleCase(chrono.nl, "zondag 7/12/2014", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("zondag 7/12/2014");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2014);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start).toBeDate(new Date(2014, 12 - 1, 7, 12));
    });
});

test("Test - forward dates only option", function () {
    testSingleCase(
        chrono.nl,
        "deze vrijdag tot deze maandag",
        new Date(2016, 8 - 1, 4),
        { forwardDate: true },
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("deze vrijdag tot deze maandag");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2016);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(5);
            expect(result.start.get("weekday")).toBe(5);

            expect(result.start.isCertain("day")).toBe(false);
            expect(result.start.isCertain("month")).toBe(false);
            expect(result.start.isCertain("year")).toBe(false);
            expect(result.start.isCertain("weekday")).toBe(true);

            expect(result.start).toBeDate(new Date(2016, 8 - 1, 5, 12));

            expect(result.end).not.toBeNull();
            expect(result.end.get("year")).toBe(2016);
            expect(result.end.get("month")).toBe(8);
            expect(result.end.get("day")).toBe(8);
            expect(result.end.get("weekday")).toBe(1);

            expect(result.end.isCertain("day")).toBe(false);
            expect(result.end.isCertain("month")).toBe(false);
            expect(result.end.isCertain("year")).toBe(false);
            expect(result.end.isCertain("weekday")).toBe(true);

            expect(result.end).toBeDate(new Date(2016, 8 - 1, 8, 12));
        }
    );
});
