import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Simple Weekday Expression", () => {
    testSingleCase(chrono.de, "Montag", new Date(2012, 7, 9), (result) => {
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

    testSingleCase(chrono.de, "am Donnerstag", new Date(2012, 7, 9), (result) => {
        expect(result.text).toBe("am Donnerstag");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    testSingleCase(chrono.de, "Sonntag", new Date(2012, 7, 9), (result) => {
        expect(result.text).toBe("Sonntag");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 12, 12));
    });

    testSingleCase(chrono.de, "Die Deadline war letzten Freitag...", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("letzten Freitag");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 3, 12));
    });

    testSingleCase(chrono.de, "Treffen wir uns am Freitag nächste Woche", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("am Freitag nächste Woche");

        expect(result.start.get("year")).toBe(2015);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2015, 3, 24, 12));
    });

    testSingleCase(
        chrono.de,
        "Ich habe vor, am Dienstag nächste Woche freizunehmen",
        new Date(2015, 3, 18),
        (result) => {
            expect(result.index).toBe(14);
            expect(result.text).toBe("am Dienstag nächste Woche");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2015);
            expect(result.start.get("month")).toBe(4);
            expect(result.start.get("day")).toBe(21);
            expect(result.start.get("weekday")).toBe(2);

            expect(result.start).toBeDate(new Date(2015, 3, 21, 12));
        }
    );
});

test("Test - Weekday with forward date option", () => {
    testSingleCase(
        chrono.de,
        "diesen Freitag bis diesen Montag",
        new Date(2016, 8 - 1, 4),
        { forwardDate: true },
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("diesen Freitag bis diesen Montag");

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

test("Test - Weekday Overlap", function () {
    testSingleCase(chrono.de, "Sonntag, den 7. Dezember 2014", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Sonntag, den 7. Dezember 2014");

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

    testSingleCase(chrono.de, "Sonntag 7.12.2014", new Date(2012, 7, 9), (result) => {
        expect(result.text).toBe("Sonntag 7.12.2014");

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
