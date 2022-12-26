import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src/";

test("Test - Single Expression", function () {
    testSingleCase(chrono.de, "vor 5 Tagen haben wir was gemacht", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 5 Tagen");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    testSingleCase(chrono.de, "vor 10 Tagen taten wir was", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 10 Tagen");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });

    testSingleCase(chrono.de, "vor 15 Minuten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 15 Minuten");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.de, "15 Minuten früher", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 Minuten früher");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.de, "15 Minuten zuvor", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 Minuten zuvor");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.de, "15 Minuten vorher", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 Minuten vorher");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.de, "   vor 12 Stunden", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("vor 12 Stunden");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    testSingleCase(chrono.de, "vor 1h", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 1h");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.de, "vor 1Std.", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 1Std");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.de, "   vor einer halben Stunde", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("vor einer halben Stunde");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(44);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 44));
    });

    testSingleCase(chrono.de, "   vor einer viertel Stunde", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("vor einer viertel Stunde");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.de, "   vor einer dreiviertel Stunde", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("vor einer dreiviertel Stunde");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(29);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 29));
    });

    testSingleCase(chrono.de, "vor 12 Stunden tat ich was", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 12 Stunden");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    testSingleCase(chrono.de, "vor 12 Sekunden tat ich was", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 12 Sekunden");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(48);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 48));
    });

    testSingleCase(chrono.de, "vor drei Sekunden tat ich was", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("vor drei Sekunden");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(57);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 57));
    });

    testSingleCase(chrono.de, "vor 5 Tagen tag ich was", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 5 Tagen");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    testSingleCase(chrono.de, "vor 5 d tat ich was", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 5 d");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    testSingleCase(chrono.de, "   vor Einer Halben Stunde tat ich...", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("vor Einer Halben Stunde");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(44);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 44));
    });

    testSingleCase(chrono.de, "vor einem Tage tat ich was", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor einem Tage");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 9));
    });

    testSingleCase(chrono.de, "vor einer Min.", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("vor einer Min");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13));
    });
});

test("Test - Single Expression (Casual)", function () {
    testSingleCase(chrono.de, "vor 5 Monaten, da sahen wir was", new Date(2012, 10 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 5 Monaten");

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 10));
    });

    testSingleCase(chrono.de, "vor 5 Jahren, da sahen wir was", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2007);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor 5 Jahren");

        expect(result.start).toBeDate(new Date(2007, 8 - 1, 10));
    });

    testSingleCase(chrono.de, "vor einer Woche, da sahen wir was", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor einer Woche");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 27));
    });

    testSingleCase(chrono.de, "vor zwei Wochen, da sahen wir was", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor zwei Wochen");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 20));
    });

    testSingleCase(chrono.de, "vorletzte Woche, da sahen wir was", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vorletzte Woche");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 20));
    });

    testSingleCase(chrono.de, "vorvorletzte Woche, da sahen wir was", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(13);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vorvorletzte Woche");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 13));
    });

    testSingleCase(chrono.de, "vor ein paar Tagen, da sahen wir was", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(0);
        expect(result.text).toBe("vor ein paar Tagen");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 1));
    });
});

//test("Test - Nested time ago", function () {
//    testSingleCase(chrono.de, "vor 15 Stunden 29 Minuten", new Date(2012, 7, 10, 22, 30), (result) => {
//        expect(result.text).toBe("vor 15 Stunden 29 Minuten");
//        expect(result.start.get("day")).toBe(10);
//        expect(result.start.get("hour")).toBe(7);
//        expect(result.start.get("minute")).toBe(1);
//        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
//    });

//    testSingleCase(chrono.de, "vor 1 Tag und 21 Stunden ", new Date(2012, 7, 10, 22, 30), (result) => {
//        expect(result.text).toBe("vor 1 Tag und 21 Stunden");
//        expect(result.start.get("day")).toBe(9);
//        expect(result.start.get("hour")).toBe(1);
//        expect(result.start.get("minute")).toBe(30);
//        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
//    });

//    testSingleCase(chrono.de, "vor 3 min 49 sek ", new Date(2012, 7, 10, 22, 30), (result) => {
//        expect(result.text).toBe("vor 3 min 49 sek ");
//        expect(result.start.get("day")).toBe(10);
//        expect(result.start.get("hour")).toBe(22);
//        expect(result.start.get("minute")).toBe(26);
//        expect(result.start.get("second")).toBe(11);
//        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
//    });
//});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.de, "15 Stunden 29 min");
    testUnexpectedResult(chrono.de, "ein paar stunden");
    testUnexpectedResult(chrono.de, "5 Tage");
});
