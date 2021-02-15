import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - The normal within expression", () => {
    testSingleCase(chrono.nl, "we have to make something binnen 5 dagen.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("binnen 5 dagen");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.nl, "we have to make something binnen vijf dagen.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("binnen vijf dagen");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.nl, "we have to make something binnen de 10 dagen", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("binnen de 10 dagen");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    testSingleCase(chrono.nl, "binnen 5 minuten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("binnen 5 minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.nl, "wait voor 5 minuten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("voor 5 minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.nl, "binnen 1 uur", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("binnen 1 uur");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono.nl, "Binnen 5 minuten ben ik thuis", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Binnen 5 minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(
        chrono.nl,
        "Binnen de 5 minuten moet een auto zich verzetten",
        new Date(2012, 7, 10, 12, 14),
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("Binnen de 5 minuten");

            expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
        }
    );

    testSingleCase(
        chrono.nl,
        "Binnen 5 seconden moet een auto zich verzetten",
        new Date(2012, 7, 10, 12, 14),
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("Binnen 5 seconden");

            expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
        }
    );

    testSingleCase(chrono.nl, "Binnen de 2 weken", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Binnen de 2 weken");

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12, 14));
    });

    testSingleCase(chrono.nl, "Binnen een maand", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Binnen een maand");

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12, 14));
    });

    testSingleCase(chrono.nl, "Binnen een jaar", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Binnen een jaar");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono.nl, "Binnen 5 minuten A car need to move", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Binnen 5 minuten");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.nl, "Binnen 5 min a car need to move", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Binnen 5 min");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.nl, "binnen een week", new Date(2016, 10 - 1, 1), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
    });
});

test("Test - Single Expression (Implied)", () => {
    testSingleCase(chrono.nl, "Binnen de 30 dagen", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(!result.start.isCertain("year")).not.toBeNull();
        expect(!result.start.isCertain("month")).not.toBeNull();
        expect(!result.start.isCertain("day")).not.toBeNull();
        expect(!result.start.isCertain("hour")).not.toBeNull();
        expect(!result.start.isCertain("minute")).not.toBeNull();
        expect(!result.start.isCertain("second")).not.toBeNull();
    });
});

test("Test - Implied time values", () => {
    testSingleCase(chrono.nl, "Binnen 24 uur", new Date(2020, 7 - 1, 10, 12, 14), (result) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2020);
    });

    testSingleCase(chrono.nl, "binnen een dag", new Date(2020, 7 - 1, 10, 12, 14), (result) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2020);
    });
});

test("Test - Time units' certainty", () => {
    testSingleCase(chrono.nl, "binnen 2 minuten", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(54);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeTruthy();
        expect(result.start.isCertain("hour")).toBeTruthy();
        expect(result.start.isCertain("minute")).toBeTruthy();
    });

    testSingleCase(chrono.nl, "binnen 2 uur", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(16);
        expect(result.start.get("minute")).toBe(52);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeTruthy();
        expect(result.start.isCertain("hour")).toBeTruthy();
        expect(result.start.isCertain("minute")).toBeTruthy();
    });

    testSingleCase(chrono.nl, "binnen de 12 maand", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(52);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeFalsy();
        expect(result.start.isCertain("hour")).toBeFalsy();
        expect(result.start.isCertain("minute")).toBeFalsy();
    });

    testSingleCase(chrono.nl, "binnen de 3 dagen", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(52);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeTruthy();
        expect(result.start.isCertain("hour")).toBeFalsy();
        expect(result.start.isCertain("minute")).toBeFalsy();
    });
});
