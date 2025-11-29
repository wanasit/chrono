import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Relative Expressions", function () {
    testSingleCase(chrono.it, "la settimana prossima", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono.it, "la settimana scorsa", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(24);
    });

    testSingleCase(chrono.it, "il mese prossimo", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(chrono.it, "il mese scorso", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(chrono.it, "l'anno prossimo", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(22);
    });

    testSingleCase(chrono.it, "l'anno scorso", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2019);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(22);
    });
});
