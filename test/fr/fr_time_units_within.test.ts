import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.fr, "On doit faire quelque chose dans 5 jours.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(28);
        expect(result.text).toBe("dans 5 jours");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(
        chrono.fr,
        "On doit faire quelque chose dans cinq jours.",
        new Date(2012, 7, 10, 11, 12),
        (result) => {
            expect(result.index).toBe(28);
            expect(result.text).toBe("dans cinq jours");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2012);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(15);

            expect(result.start).toBeDate(new Date(2012, 8 - 1, 15, 11, 12));
        }
    );

    testSingleCase(chrono.fr, "dans 5 minutes", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dans 5 minutes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.fr, "pour 5 minutes", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("pour 5 minutes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.fr, "en 1 heure", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en 1 heure");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono.fr, "Dans 5 minutes je vais rentrer chez moi", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Dans 5 minutes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.fr, "Dans 5 secondes une voiture va bouger", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Dans 5 secondes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });

    testSingleCase(chrono.fr, "dans deux semaines", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dans deux semaines");

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12, 14));
    });

    testSingleCase(chrono.fr, "dans un mois", new Date(2012, 7, 10, 7, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dans un mois");

        expect(result.start).toBeDate(new Date(2012, 8, 10, 7, 14));
    });

    testSingleCase(chrono.fr, "dans quelques mois", new Date(2012, 7, 10, 22, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dans quelques mois");

        expect(result.start).toBeDate(new Date(2012, 10, 10, 22, 14));
    });

    testSingleCase(chrono.fr, "en une année", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en une année");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono.fr, "dans une Année", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dans une Année");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(
        chrono.fr,
        "Dans 5 Minutes une voiture doit être bougée",
        new Date(2012, 7, 10, 12, 14),
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("Dans 5 Minutes");

            expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
        }
    );

    testSingleCase(chrono.fr, "Dans 5 mins une voiture doit être bougée", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Dans 5 mins");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });
});
