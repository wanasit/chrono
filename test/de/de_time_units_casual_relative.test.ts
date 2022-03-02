import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

// test("Test - fr - modifier mandatory just after", function () {
//     testUnexpectedResult(chrono.de, "le mois d'avril");
//
//     testUnexpectedResult(chrono.de, "le mois d'avril prochain");
// });

test("Test - de - relative date", function () {
    testSingleCase(chrono.de, "kommende Woche", new Date(2017, 5 - 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(19);
    });

    testSingleCase(chrono.de, "in 2 Wochen", new Date(2017, 5 - 1, 12, 18, 11), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(26);
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(11);
    });

    testSingleCase(chrono.de, "in drei Wochen", new Date(2017, 5 - 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(2);
    });

    testSingleCase(chrono.de, "letzten Monat", new Date(2017, 5 - 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono.de, "in den 30 vorangegangenen Tagen", new Date(2017, 5 - 1, 12), (result, text) => {
        expect(result.text).toBe("30 vorangegangenen Tagen");
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono.de, "die vergangenen 24 Stunden", new Date(2017, 5 - 1, 12, 11, 27), (result, text) => {
        expect(result.text).toBe("vergangenen 24 Stunden");
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(27);
    });

    testSingleCase(chrono.de, "in den folgenden 90 sekunden", new Date(2017, 5 - 1, 12, 11, 27, 3), (result, text) => {
        expect(result.text).toBe("folgenden 90 sekunden");
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(28);
        expect(result.start.get("second")).toBe(33);
    });

    testSingleCase(chrono.de, "die letzten acht Minuten", new Date(2017, 5 - 1, 12, 11, 27), (result, text) => {
        expect(result.text).toBe("letzten acht Minuten");
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(19);
        expect(result.start.get("second")).toBe(0);
    });

    testSingleCase(chrono.de, "letztes Quartal", new Date(2017, 5 - 1, 12, 11, 27), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(27);
        expect(result.start.get("second")).toBe(0);

        expect(result.start.isCertain("month")).toBeFalsy();
        expect(result.start.isCertain("day")).toBeFalsy();
        expect(result.start.isCertain("hour")).toBeFalsy();
        expect(result.start.isCertain("minute")).toBeFalsy();
        expect(result.start.isCertain("second")).toBeFalsy();
    });

    testSingleCase(chrono.de, "kommendes Jahr", new Date(2017, 5 - 1, 12, 11, 27), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2018);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(27);
        expect(result.start.get("second")).toBe(0);

        expect(result.start.isCertain("month")).toBeFalsy();
        expect(result.start.isCertain("day")).toBeFalsy();
        expect(result.start.isCertain("hour")).toBeFalsy();
        expect(result.start.isCertain("minute")).toBeFalsy();
        expect(result.start.isCertain("second")).toBeFalsy();
    });
});
