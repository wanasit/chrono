import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.fr, "il y a 5 jours, on a fait quelque chose", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("il y a 5 jours");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    testSingleCase(chrono.fr, "il y a 10 jours, on a fait quelque chose", new Date(2012, 7, 10, 13, 30), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("il y a 10 jours");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31, 13, 30));
    });

    testSingleCase(chrono.fr, "il y a 15 minutes", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("il y a 15 minutes");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.fr, "   il y a    12 heures", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("il y a    12 heures");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    testSingleCase(
        chrono.fr,
        "il y a 12 heures il s'est passé quelque chose",
        new Date(2012, 7, 10, 12, 14),
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("il y a 12 heures");
            expect(result.start.get("hour")).toBe(0);
            expect(result.start.get("minute")).toBe(14);

            expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
        }
    );
});

test("Test - Single Expression (Casual)", function () {
    testSingleCase(chrono.fr, "il y a 5 mois, on a fait quelque chose", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("il y a 5 mois");

        expect(result.start).toBeDate(new Date(2012, 3 - 1, 10));
    });

    testSingleCase(chrono.fr, "il y a 5 ans, on a fait quelque chose", new Date(2012, 8 - 1, 10, 22, 22), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2007);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("il y a 5 ans");

        expect(result.start).toBeDate(new Date(2007, 8 - 1, 10, 22, 22));
    });

    testSingleCase(
        chrono.fr,
        "il y a une semaine, on a fait quelque chose",
        new Date(2012, 8 - 1, 3, 8, 34),
        (result) => {
            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2012);
            expect(result.start.get("month")).toBe(7);
            expect(result.start.get("day")).toBe(27);

            expect(result.index).toBe(0);
            expect(result.text).toBe("il y a une semaine");

            expect(result.start).toBeDate(new Date(2012, 7 - 1, 27, 8, 34));
        }
    );
});
