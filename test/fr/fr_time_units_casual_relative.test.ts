import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - fr - modifier mandatory just after", function () {
    testUnexpectedResult(chrono.fr, "le mois d'avril");

    testUnexpectedResult(chrono.fr, "le mois d'avril prochain");
});

test("Test - fr - relative date", function () {
    testSingleCase(chrono.fr, "la semaine prochaine", new Date(2017, 5 - 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(19);
    });

    testSingleCase(chrono.fr, "les 2 prochaines semaines", new Date(2017, 5 - 1, 12, 18, 11), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(26);
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(11);
    });

    testSingleCase(chrono.fr, "les trois prochaines semaines", new Date(2017, 5 - 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(2);
    });

    testSingleCase(chrono.fr, "le mois dernier", new Date(2017, 5 - 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono.fr, "les 30 jours précédents", new Date(2017, 5 - 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono.fr, "les 24 heures passées", new Date(2017, 5 - 1, 12, 11, 27), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(27);
    });

    testSingleCase(chrono.fr, "les 90 secondes suivantes", new Date(2017, 5 - 1, 12, 11, 27, 3), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(28);
        expect(result.start.get("second")).toBe(33);
    });

    testSingleCase(chrono.fr, "les huit dernieres minutes", new Date(2017, 5 - 1, 12, 11, 27), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(19);
        expect(result.start.get("second")).toBe(0);
    });

    testSingleCase(chrono.fr, "le dernier trimestre", new Date(2017, 5 - 1, 12, 11, 27), (result, text) => {
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

    testSingleCase(chrono.fr, "l'année prochaine", new Date(2017, 5 - 1, 12, 11, 27), (result, text) => {
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
