import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src/";
import * as it from "../../src/locales/it";

test("Test - Single Expression", () => {
    testSingleCase(it.casual, "La scadenza è adesso", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("adesso");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start.get("second")).toBe(10);
        expect(result.start.get("millisecond")).toBe(11);
        expect(result.start.get("timezoneOffset")).toBe(result.refDate.getTimezoneOffset() * -1);

        expect(result.start).toBeDate(result.refDate);
        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(it.casual, "La scadenza è oggi", new Date(2012, 7, 10, 14, 12), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("oggi");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 12));
    });

    testSingleCase(it.casual, "La scadenza è domani", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("domani");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 17, 10));
    });

    testSingleCase(it.casual, "La scadenza è domani", new Date(2012, 7, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 11, 1));
    });

    testSingleCase(it.casual, "La scadenza era ieri", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("ieri");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    testSingleCase(it.casual, "La scadenza era ieri sera ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("ieri sera");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 0));
    });

    testSingleCase(it.casual, "La scadenza era stamattina ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("stamattina");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });

    testSingleCase(it.casual, "La scadenza era questo pomeriggio ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("questo pomeriggio");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });

    testSingleCase(it.casual, "La scadenza era stasera ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("stasera");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(22);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 22));
    });

    testSingleCase(it.casual, "La scadenza è mezzanotte ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("mezzanotte");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
    });

    // "Mezzanotte" alle 0~2, assume sia la mezzanotte passata
    testSingleCase(it.casual, "La scadenza era mezzanotte ", new Date(2012, 8 - 1, 10, 1), (result) => {
        expect(result.text).toBe("mezzanotte");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("millisecond")).toBe(0);
    });

    // "Mezzanotte" alle 0~2 con opzione forwardDate, dovrebbe essere la prossima notte
    testSingleCase(
        it.casual,
        "La scadenza era mezzanotte ",
        new Date(2012, 8 - 1, 10, 1),
        { forwardDate: true },
        (result) => {
            expect(result.text).toBe("mezzanotte");
            expect(result.start.get("year")).toBe(2012);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(11);
            expect(result.start.get("hour")).toBe(0);
            expect(result.start.get("minute")).toBe(0);
            expect(result.start.get("second")).toBe(0);
            expect(result.start.get("millisecond")).toBe(0);
        }
    );
});

test("Test - Combined Expression", () => {
    testSingleCase(it.casual, "La scadenza è oggi alle 17", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("oggi alle 17");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });

    testSingleCase(it.casual, "Domani a mezzogiorno", new Date(2012, 8 - 1, 10, 14), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 12));
    });
});

test("Test - Casual date range", () => {
    testSingleCase(it.casual, "L'evento è oggi - venerdì prossimo", new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(11);
        expect(result.text).toBe("oggi - venerdì prossimo");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 4, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(it.casual, "L'evento è oggi - venerdì prossimo", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(11);
        expect(result.text).toBe("oggi - venerdì prossimo");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(17);
        expect(result.end.get("hour")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 7, 17, 12));
    });
});

test("Test - Casual time implication", () => {
    testSingleCase(
        it.casual,
        "ferie da stamattina a domani",
        new Date(2012, 8 - 1, 4, 12),
        (result) => {
            expect(result.text).toBe("stamattina a domani");

            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(4);
            expect(result.start.get("hour")).toBe(6);
            expect(result.start.isCertain("hour")).toBe(false);

            expect(result.end.get("month")).toBe(8);
            expect(result.end.get("day")).toBe(5);
            expect(result.end.get("hour")).toBe(12);
            expect(result.end.isCertain("hour")).toBe(false);
        }
    );

    testSingleCase(
        it.casual,
        "ferie da oggi a domani pomeriggio",
        new Date(2012, 8 - 1, 4, 12),
        (result) => {
            expect(result.text).toBe("oggi a domani pomeriggio");

            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(4);
            expect(result.start.get("hour")).toBe(12);
            expect(result.start.isCertain("hour")).toBe(false);

            expect(result.end.get("month")).toBe(8);
            expect(result.end.get("day")).toBe(5);
            expect(result.end.get("hour")).toBe(15);
            expect(result.end.isCertain("hour")).toBe(false);
        }
    );
});

test("Test - Random text", () => {
    testSingleCase(it, "stasera", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
    });

    testSingleCase(it, "stasera alle 20", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(it, "stasera alle 8", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(it, "gio", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(4);
    });

    testSingleCase(it, "questa sera", new Date(2016, 10 - 1, 1), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
    });

    testSingleCase(it, "ieri pomeriggio", new Date(2016, 10 - 1, 1), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(it, "domani mattina", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("hour")).toBe(6);
    });

    testSingleCase(it, "questo pomeriggio alle 3", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(it.casual, "a mezzanotte il 12 agosto", new Date(2012, 8 - 1, 10, 15), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("millisecond")).toBe(0);
    });
});

test("Test - Random negative text", () => {
    testUnexpectedResult(it, "nonoggi");

    testUnexpectedResult(it, "xieri");

    testUnexpectedResult(it, "domaniX");
});
