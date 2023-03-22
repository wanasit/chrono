import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src";

test("Test - Single Expression", function () {
    testSingleCase(chrono.fr, "8h10", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8h10");

        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));
    });

    testSingleCase(chrono.fr, "8h10m", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8h10m");

        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));
    });

    testSingleCase(chrono.fr, "8h10m00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8h10m00");

        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(true);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));
    });

    testSingleCase(chrono.fr, "8h10m00s", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8h10m00s");

        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(true);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));
    });

    testSingleCase(chrono.fr, "8:10 PM", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8:10 PM");

        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(10);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 20, 10));
    });

    testSingleCase(chrono.fr, "8h10 PM", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8h10 PM");

        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(10);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 20, 10));
    });

    testSingleCase(chrono.fr, "1230pm", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1230pm");

        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 30));
    });

    testSingleCase(chrono.fr, "5:16p", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5:16p");

        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(16);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 16));
    });

    testSingleCase(chrono.fr, "5h16p", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5h16p");

        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(16);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 16));
    });

    testSingleCase(chrono.fr, "5h16mp", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5h16mp");

        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(16);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 16));
    });

    testSingleCase(chrono.fr, "5:16 p.m.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5:16 p.m.");

        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(16);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 16));
    });

    testSingleCase(chrono.fr, "5h16 p.m.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5h16 p.m.");

        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(16);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 16));
    });

    testSingleCase(chrono.fr, "RDV à 6.13 AM", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(4);
        expect(result.text).toBe("à 6.13 AM");

        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(13);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 13));
    });

    testSingleCase(chrono.fr, "13h-15h", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("13h-15h");

        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 15, 0));
    });

    testSingleCase(chrono.fr, "13-15h", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("13-15h");

        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 15, 0));
    });

    testSingleCase(chrono.fr, "1-3pm", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1-3pm");

        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 15, 0));
    });

    testSingleCase(chrono.fr, "11pm-2", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("11pm-2");

        expect(result.start.get("hour")).toBe(23);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 23, 0));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(2);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(0);

        expect(result.end).toBeDate(new Date(2012, 7, 11, 2, 0));
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.fr, "8:10 - 12.32", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8:10 - 12.32");

        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(12);
        expect(result.end.get("minute")).toBe(32);

        expect(result.end.isCertain("day")).toBe(false);
        expect(result.end.isCertain("month")).toBe(false);
        expect(result.end.isCertain("year")).toBe(false);
        expect(result.end.isCertain("hour")).toBe(true);
        expect(result.end.isCertain("minute")).toBe(true);
        expect(result.end.isCertain("second")).toBe(false);
        expect(result.end.isCertain("millisecond")).toBe(false);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12, 32));
    });

    testSingleCase(chrono.fr, "8:10 - 12h32", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8:10 - 12h32");

        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(12);
        expect(result.end.get("minute")).toBe(32);

        expect(result.end.isCertain("day")).toBe(false);
        expect(result.end.isCertain("month")).toBe(false);
        expect(result.end.isCertain("year")).toBe(false);
        expect(result.end.isCertain("hour")).toBe(true);
        expect(result.end.isCertain("minute")).toBe(true);
        expect(result.end.isCertain("second")).toBe(false);
        expect(result.end.isCertain("millisecond")).toBe(false);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12, 32));
    });

    testSingleCase(chrono.fr, " de 6:30pm à 11:00pm ", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 30));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(23);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 0));
    });

    testSingleCase(chrono.fr, " 2012 à 10:12:59", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe("à 10:12:59");

        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(12);
        expect(result.start.get("second")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.end).toBeNull();
    });
});

test("Test - Impossible", function () {
    testUnexpectedResult(chrono.fr, "8:62", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.fr, "25:12", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.fr, "12h12:99s", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.fr, "13.12 PM", new Date(2012, 7, 10));
});

test("Test - Date + Time Expression", function () {
    testSingleCase(chrono.fr, "Quelque chose se passe le 2014-04-18 à 3h00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("2014-04-18 à 3h00");

        expect(result.start.get("year")).toBe(2014);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(18);
        expect(result.start.get("hour")).toBe(3);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("millisecond")).toBe(0);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2014, 4 - 1, 18, 3, 0));
    });

    testSingleCase(chrono.fr, "Quelque chose se passe le 10 Août 2012 à 10:12:59", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("10 Août 2012 à 10:12:59");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(12);
        expect(result.start.get("second")).toBe(59);
        expect(result.start.get("millisecond")).toBe(0);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 10, 12, 59));
    });

    testSingleCase(chrono.fr, "Quelque chose se passe le 15juin 2016 20h", new Date(2016, 6, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("15juin 2016 20h");

        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(15);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("millisecond")).toBe(0);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2016, 6 - 1, 15, 20, 0, 0));
    });

    testSingleCase(
        chrono.fr,
        "Quelque chose se passe le 2014-04-18 7:00 - 8h00 ...",
        new Date(2012, 7, 10),
        (result) => {
            expect(result.index).toBe(26);
            expect(result.text).toBe("2014-04-18 7:00 - 8h00");

            expect(result.start.get("year")).toBe(2014);
            expect(result.start.get("month")).toBe(4);
            expect(result.start.get("day")).toBe(18);
            expect(result.start.get("hour")).toBe(7);
            expect(result.start.get("minute")).toBe(0);
            expect(result.start.get("second")).toBe(0);
            expect(result.start.get("millisecond")).toBe(0);
            expect(result.start.isCertain("meridiem")).toBe(false);
            expect(result.start.isCertain("millisecond")).toBe(false);

            expect(result.start).toBeDate(new Date(2014, 4 - 1, 18, 7, 0));

            expect(result.end.get("year")).toBe(2014);
            expect(result.end.get("month")).toBe(4);
            expect(result.end.get("day")).toBe(18);
            expect(result.end.get("hour")).toBe(8);
            expect(result.end.get("minute")).toBe(0);
            expect(result.end.get("second")).toBe(0);
            expect(result.end.get("millisecond")).toBe(0);
            expect(result.end.isCertain("meridiem")).toBe(false);
            expect(result.end.isCertain("millisecond")).toBe(false);

            expect(result.end).toBeDate(new Date(2014, 4 - 1, 18, 8, 0));
        }
    );

    testSingleCase(
        chrono.fr,
        "Quelque chose se passe le 2014-04-18 de 7:00 à 20:00 ...",
        new Date(2012, 7, 10),
        (result) => {
            expect(result.index).toBe(26);
            expect(result.text).toBe("2014-04-18 de 7:00 à 20:00");

            expect(result.start.get("year")).toBe(2014);
            expect(result.start.get("month")).toBe(4);
            expect(result.start.get("day")).toBe(18);
            expect(result.start.get("hour")).toBe(7);
            expect(result.start.get("minute")).toBe(0);
            expect(result.start.get("second")).toBe(0);
            expect(result.start.get("millisecond")).toBe(0);
            expect(result.start.isCertain("meridiem")).toBe(false);
            expect(result.start.isCertain("millisecond")).toBe(false);

            expect(result.start).toBeDate(new Date(2014, 4 - 1, 18, 7, 0));

            expect(result.end.get("year")).toBe(2014);
            expect(result.end.get("month")).toBe(4);
            expect(result.end.get("day")).toBe(18);
            expect(result.end.get("hour")).toBe(20);
            expect(result.end.get("minute")).toBe(0);
            expect(result.end.get("second")).toBe(0);
            expect(result.end.get("millisecond")).toBe(0);
            expect(result.start.isCertain("meridiem")).toBe(false);
            expect(result.end.isCertain("millisecond")).toBe(false);

            expect(result.end).toBeDate(new Date(2014, 4 - 1, 18, 20, 0));
        }
    );
});

test("Test - Timezone extraction", function () {
    testSingleCase(chrono.fr, "Vendredi à 2 pm", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(false);
        expect(!result.start.get("timezoneOffset")).not.toBeNull();
    });

    testSingleCase(chrono.fr, "vendredi 2 pm EST", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(-300);
    });

    testSingleCase(chrono.fr, "vendredi 15h CET", new Date(2016, 1, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(60);
    });

    testSingleCase(chrono.fr, "vendredi 15h cest", new Date(2016, 1, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(120);
    });

    testSingleCase(chrono.fr, "Vendredi à 2 pm est", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(-300);
    });

    testSingleCase(chrono.fr, "Vendredi à 2 pm j'ai rdv...", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe("Vendredi à 2 pm");
        expect(result.start.isCertain("timezoneOffset")).toBe(false);
        expect(!result.start.get("timezoneOffset")).not.toBeNull();
    });

    testSingleCase(chrono.fr, "Vendredi à 2 pm je vais faire quelque chose", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe("Vendredi à 2 pm");
        expect(result.start.isCertain("timezoneOffset")).toBe(false);
        expect(!result.start.get("timezoneOffset")).not.toBeNull();
    });
});

test("Test - Random date + time expression", function () {
    testSingleCase(chrono.fr, "lundi 29/4/2013 630-930am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "mercredi 1/5/2013 1115am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "vendredi 3/5/2013 1230pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "dimanche 6/5/2013  750am-910am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "lundi 13/5/2013 630-930am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "Vendredi 21/6/2013 2:30", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "mardi 7/2/2013 1-230 pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "mardi 7/2/2013 1-23h0", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "mardi 7/2/2013 1h-23h0m", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "Lundi, 24/6/2013, 7:00pm - 8:30pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "Jeudi6/5/2013 de 7h à 10h", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "18h", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "18-22h", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "11h-13", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "à 12h", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.fr, "Mercredi, 3 juil 2013 14h", (result, text) => {
        expect(result.text).toBe(text);
    });

    testUnexpectedResult(chrono.fr, "that I need to know or am I covered?");
});
