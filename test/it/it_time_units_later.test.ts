import * as chrono from "../../src";
import { testSingleCase } from "../test_util";
import { Meridiem } from "../../src";

test("Test - Later Expression", function () {
    //2 days later
    testSingleCase(chrono.it, "2 giorni dopo", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2 giorni dopo");

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 12));
    });
    
    //5 minutes later
    testSingleCase(chrono.it, "5 minuti dopo", new Date(2012, 7, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 minuti dopo");

        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 10, 5));
    });

    testSingleCase(chrono.it, "3 settimane dopo", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 settimane dopo");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31, 10, 0));
    });
});

test("Test - From now Expression", () => {
    testSingleCase(chrono.it, "fra 5 giorni, faremo qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("fra 5 giorni");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.it, "10 giorni fa, abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 giorni fa");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    testSingleCase(chrono.it, "15 minuti da ora", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuti da ora");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.it, "15 minuti fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuti fa");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.it, "15 minuti in ritardo", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuti in ritardo");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.it, "   tra 12 ore", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("tra 12 ore");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 0, 14));
    });

    testSingleCase(chrono.it, "   tra 12 h", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("tra 12 h");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.it, "   mezz'ora da adesso", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("mezz'ora da adesso");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(44);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    testSingleCase(chrono.it, "12 ore fa ho fatto qualcosa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 ore fa");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 0, 14));
    });

    testSingleCase(chrono.it, "12 secondi fa ho fatto qualcosa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 secondi fa");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("second")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 12));
    });

    testSingleCase(chrono.it, "tre secondi fa ho fatto qualcosa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("tre secondi fa");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("second")).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 3));
    });

    testSingleCase(chrono.it, "Cinque Giorni fa ho fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("Cinque Giorni fa");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.it, "   fra Mezz'ora", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("fra Mezz'ora");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(44);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    testSingleCase(chrono.it, "Un giorno fa, abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.index).toBe(0);
        expect(result.text).toBe("Un giorno fa");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11));
    });

    testSingleCase(chrono.it, "un minuto in ritardo", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("un minuto in ritardo");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 15));
    });

    testSingleCase(chrono.it, "fra 1 ora", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("fra 1 ora");
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono.it, "fra 1,5 ore", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("fra 1,5 ore");
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 10));
    });
});

test("Test - Strict mode", function () {
    testSingleCase(chrono.it.strict, "15 minuti da adesso", new Date(2012, 7, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.it.strict, "25 minuti dopo", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("25 minuti dopo");
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 5));
    });
});
