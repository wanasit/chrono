import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";
import { Meridiem } from "../../src/";

test("Test - Simple Expression", function () {
    testSingleCase(chrono.de, "18:10", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("18:10");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 10));
    });

    testSingleCase(chrono.de, "um 14 Uhr", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.de, "um 7 morgens", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(7);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
        expect(result.start.isCertain("meridiem")).toBeTruthy();
    });

    testSingleCase(chrono.de, "11:00 Uhr vormittags", new Date(2012, 7, 10), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
        expect(result.start.isCertain("meridiem")).toBeTruthy();
    });

    testSingleCase(chrono.de, "um 7 morgens", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(7);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
        expect(result.start.isCertain("meridiem")).toBeTruthy();
    });

    testSingleCase(chrono.de, "11:00 Uhr vormittags", new Date(2012, 7, 10), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
        expect(result.start.isCertain("meridiem")).toBeTruthy();
    });

    testSingleCase(chrono.de, "um 8 Uhr nachmittags", new Date(2012, 7, 10), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
        expect(result.start.isCertain("meridiem")).toBeTruthy();
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.de, "18:10 - 22.32", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("18:10 - 22.32");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 10));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(22);
        expect(result.end.get("minute")).toBe(32);

        expect(result.end.isCertain("day")).toBe(false);
        expect(result.end.isCertain("month")).toBe(false);
        expect(result.end.isCertain("year")).toBe(false);
        expect(result.end.isCertain("hour")).toBe(true);
        expect(result.end.isCertain("minute")).toBe(true);
        expect(result.end.isCertain("second")).toBe(false);
        expect(result.end.isCertain("millisecond")).toBe(false);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 22, 32));
    });

    testSingleCase(chrono.de, " von 6:30 bis 23:00 ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("von 6:30 bis 23:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 30));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(23);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 0));
    });
});

test("Test - Timezone extraction", function () {
    testSingleCase(chrono.de, "um 14 Uhr", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(false);
        expect(!result.start.get("timezoneOffset")).not.toBeNull();
    });

    testSingleCase(chrono.de, "um 14 Uhr CET", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(60);
    });

    testSingleCase(chrono.de, "14 Uhr cet", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(60);
    });
});

test("Test - Random date + time expression", function () {
    testSingleCase(chrono.de, "um 12", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.de, "am Mittag", (result, text) => {
        expect(result.text).toBe("Mittag");
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.de, "am Freitag um 14 Uhr cetteln wir etwas an", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe("am Freitag um 14 Uhr");
        expect(result.start.isCertain("timezoneOffset")).toBe(false);
        expect(!result.start.get("timezoneOffset")).not.toBeNull();
    });

    testSingleCase(chrono.de, "Freitag um 14 Uhr CET", new Date(2016, 3, 28), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(60);
    });
});
