import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Casual date expression", function () {
    testSingleCase(chrono.de, "Die Deadline ist jetzt", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("jetzt");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start.get("second")).toBe(10);
        expect(result.start.get("millisecond")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.de, "Die Deadline ist heute", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("heute");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.de, "Die Deadline ist morgen", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("morgen");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        //expect(result.start.get("hour")).toBe(8);
    });

    testSingleCase(chrono.de, "Die Deadline ist morgen", new Date(2012, 8 - 1, 10, 1), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(1);
    });

    testSingleCase(chrono.de, "Die Deadline war gestern", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("gestern");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    testSingleCase(chrono.de, "Die Deadline war letzte Nacht ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("letzte Nacht");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 0));
    });

    testSingleCase(chrono.de, "Die Deadline war gestern Nacht ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("gestern Nacht");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(22);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 22));
    });

    testSingleCase(chrono.de, "Die Deadline war heute Morgen ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("heute Morgen");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });

    testSingleCase(chrono.de, "Die Deadline war heute Nachmittag ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("heute Nachmittag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });

    testSingleCase(chrono.de, "Die Deadline war heute Abend ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("heute Abend");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(18);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18));
    });
});

test("Test - Casual time expression", function () {
    testSingleCase(chrono.de, "Die Deadline ist mittags", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("mittags");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
    });

    testSingleCase(chrono.de, "um Mitternacht", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
    });

    testSingleCase(chrono.de, "um Mitternacht", new Date(2012, 7, 10, 1), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
    });
});

test("Test - Combined Expression", function () {
    testSingleCase(chrono.de, "Die Deadline ist heute 17 Uhr", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("heute 17 Uhr");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });

    testSingleCase(chrono.de, "Die Deadline ist heute um 17 Uhr", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("heute um 17 Uhr");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });
});

test("Test - Casual date range", function () {
    testSingleCase(chrono.de, "Der Event ist heute - nächsten Freitag", new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("heute - nächsten Freitag");

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

    testSingleCase(chrono.de, "Der Event ist heute - nächsten Freitag", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("heute - nächsten Freitag");

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

test("Test - Random text", function () {
    testSingleCase(chrono.de, "heute Nacht", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.de, "heute Nacht um 20 Uhr", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.de, "heute Abend um 8", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.de, "8 Uhr abends", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.de, "Do", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(4);
    });

    testSingleCase(chrono.de, "Donnerstag", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(4);
    });

    testSingleCase(chrono.de, "gestern Nachmittag", new Date(2016, 10 - 1, 1), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(chrono.de, "morgen Morgen", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("hour")).toBe(6);
    });

    testSingleCase(chrono.de, "uebermorgen Abend", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("hour")).toBe(18);
    });

    testSingleCase(chrono.de, "vorgestern Vormittag", new Date(2016, 10 - 1, 1), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(29);
        expect(result.start.get("hour")).toBe(9);
    });
});

test("Test - Random negative text", function () {
    testUnexpectedResult(chrono.de, "nicheute");

    testUnexpectedResult(chrono.de, "heutenicht");

    testUnexpectedResult(chrono.de, "angestern");

    testUnexpectedResult(chrono.de, "jetztig");

    testUnexpectedResult(chrono.de, "ljetztlich");
});
