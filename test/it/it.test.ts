import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import ENTimeExpressionParser from "../../src/locales/it/parsers/ITTimeExpressionParser";
import { Meridiem } from "../../src";

test("Test - Date + Time Expression", function () {
    testSingleCase(chrono, "Qualcosa accade il 18/04/2014 13:00-16:00 appena", (result) => {
        expect(result.text).toBe("18/04/2014 13:00-16:00");

        expect(result.start).toBeDate(new Date(2014, 4 - 1, 18, 13));
        expect(result.end).toBeDate(new Date(2014, 4 - 1, 18, 16));
    });
});

test("Test - Time Expression", function () {
    testSingleCase(chrono, "tra le 15:30-16:30", new Date(2020, 7 - 1, 6), (result) => {
        expect(result.text).toBe("15:30-16:30");

        expect(result.start).toBeDate(new Date(2020, 7 - 1, 6, 15, 30));
        expect(result.end).toBeDate(new Date(2020, 7 - 1, 6, 16, 30));
    });

    testSingleCase(chrono, "4:00 GMT", new Date(2020, 7 - 1, 6), (result) => {
        expect(result.text).toBe("4:00 GMT");

        expect(result.start.get("hour")).toBe(9);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(-480);
    });
});

test("Test - Quoted Expressions", function () {
    testSingleCase(chrono, "Ci incontraimo per cena (21:00 GMT)?", new Date(2020, 7 - 1, 6), (result) => {
        expect(result.text).toContain("21:00 GMT");
    });

    testSingleCase(chrono, "intorno le '15:30-16:30'", new Date(2020, 7 - 1, 6), (result) => {
        expect(result.text).toContain("15:30-16:30");

        expect(result.start).toBeDate(new Date(2020, 7 - 1, 6, 15, 30));
        expect(result.end).toBeDate(new Date(2020, 7 - 1, 6, 16, 30));
    });

    testSingleCase(chrono, "Il giorno è '18/04/2014'", (result) => {
        expect(result.text).toContain("18/04/2014");
        expect(result.start).toBeDate(new Date(2014, 4 - 1, 18, 12));
    });
});

test("Test - Strict Mode", function () {
    testUnexpectedResult(chrono.strict, "Martedì");
});

test("Test - Random text", function () {
    testSingleCase(chrono, "Adam <Adam@supercalendar.com> написал(а):\nIl giorno è 02.07.2013", (result) => {
        expect(result.text).toBe("02.07.2013");
    });

    testSingleCase(chrono, "174 1 Novembre 2001-31 Marzo 2002", (result) => {
        expect(result.text).toBe("1 Novembre 2001-31 Marzo 2002");
    });

    testSingleCase(chrono, "...Giovedì, 15 dicembre 2011 la migliore rata disponibile ", (result) => {
        expect(result.text).toBe("Giovedì, 15 dicembre 2011");
        expect(result.start.get("year")).toBe(2011);
    });

    testSingleCase(chrono, "DOM 15 SETT 11:05-00:50", (result) => {
        expect(result.text).toBe("DOM 15 SETT 11:05-00:50");

        expect(result.end.get("hour")).toBe(12);
        expect(result.end.get("minute")).toBe(50);
    });

    testSingleCase(chrono, "VEN 13 SETT 13:29-VEN 13 SETT 15:29", (result) => {
        expect(result.text).toBe("VEN 13 SETT 13:29-VEN 13 SETT 15:29");

        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(29);

        expect(result.end.get("day")).toBe(13);
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(29);
    });

    testSingleCase(chrono, "9:00 alle 17:00, martedì, 20 maggio 2013", (result) => {
        expect(result.text).toBe("9:00 alle 17:00, martedì, 20 maggio 2013");

        expect(result.start).toBeDate(new Date(2013, 4, 20, 9, 0));
        expect(result.end).toBeDate(new Date(2013, 4, 20, 17, 0));
    });

    testSingleCase(chrono, "lunedì pomeriggio a ieri sera", new Date(2017, 7 - 1, 7), (result) => {
        expect(result.text).toBe("lunedì pomeriggio a ieri sera");
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("month")).toBe(7);
    });

    testSingleCase(chrono, "03-27-2022, 02:00", new Date(2017, 7 - 1, 7), (result) => {
        expect(result.text).toBe("03-27-2022, 02:00");
        expect(result.start.get("day")).toBe(27);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("hour")).toBe(2);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });
});

test("Test - Wikipedia Texts", function () {
    const text =
        "7 ottobre 2011, di cui non sono stati rivelati i dettagli per rispetto alla famiglia di Jobs.[239] " +
        "Lo stesso giorno Apple ha annunciato di non avere in programma un servizio pubblico, ma di aver incoraggiato " +
        'i "benemeriti" di inviare i loro messaggi di ricordo a un indirizzo e-mail creato per ricevere tali messaggi.[240] ' +
        "Domenica 16 ottobre 2011";

    const results = chrono.parse(text, new Date(2012, 7, 10));
    expect(results.length).toBe(2);

    {
        const result = results[0];
        expect(result.start.get("year")).toBe(2011);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(7);

        expect(result.index).toBe(0);
        expect(result.text).toBe("7 ottobre 2011");
    }

    {
        const result = results[1];
        expect(result.start.get("year")).toBe(2011);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(16);

        expect(result.index).toBe(297);
        expect(result.text).toBe("Domenica 16 ottobre 2011");
    }
});

test("Test - Parse multiple date results", function () {
    const text = "Ci vediamo alle 2:30. Altrimenti ci vedremo tra le 15:30 e le 16:30";
    const results = chrono.parse(text, new Date(2020, 7 - 1, 6));
    expect(results.length).toBe(2);

    {
        const result = results[0];
        expect(result.text).toBe("alle 2:30");
        expect(result.start.get("year")).toBe(2020);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("hour")).toBe(2);

        expect(result.end).toBeNull();
    }

    {
        const result = results[1];
        expect(result.text).toBe("15:30 e le 16:30");

        expect(result.start.get("hour")).toBe(15);
        expect(result.start.get("minute")).toBe(30);

        expect(result.end.get("hour")).toBe(16);
        expect(result.end.get("minute")).toBe(30);
    }
});

test("Test - Customize by removing time extraction", () => {
    const custom = chrono.en.casual.clone();
    custom.parsers = custom.parsers.filter((p) => !(p instanceof ENTimeExpressionParser));

    custom.parse("giovedì ore 9:00");

    testSingleCase(custom, "giovedì ore 9:00", new Date(2020, 11 - 1, 29), (result, text) => {
        expect(result.text).toBe("Thursday");
        expect(result.start.get("year")).toBe(2020);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(26);
    });
});
