import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - 'Este/Esta' expressions", () => {
    testSingleCase(chrono.es, "esta semana", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(19);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.es, "este mes", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.es, "este año", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Past relative expressions", () => {
    testSingleCase(chrono.es, "la semana pasada", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.es, "el mes pasado", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.es, "el último mes", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Future relative expressions", () => {
    testSingleCase(chrono.es, "la próxima semana", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.es, "el próximo mes", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.es, "el próximo año", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(11);
        expect(result.start.get("second")).toBe(32);
        expect(result.start.get("millisecond")).toBe(6);
    });

    testSingleCase(chrono.es, "el siguiente mes", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });
});
