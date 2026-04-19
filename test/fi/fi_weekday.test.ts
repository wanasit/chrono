import * as chrono from "../../src/locales/fi";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono, "maanantai", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("maanantai");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);
    });

    testSingleCase(chrono, "maanantaina", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("maanantaina");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);
    });
});

test("Test - Next/Last Week Expression", function () {
    testSingleCase(chrono, "ensi maanantai", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ensi maanantai");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("weekday")).toBe(1);
    });

    testSingleCase(chrono, "viime maanantai", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("viime maanantai");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);
    });
});

test("Test - Weekday variations", function () {
    testSingleCase(chrono, "sunnuntai", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(0);
    });

    testSingleCase(chrono, "tiistai", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(2);
    });

    testSingleCase(chrono, "keskiviikko", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(3);
    });

    testSingleCase(chrono, "torstai", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(4);
    });

    testSingleCase(chrono, "perjantai", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(5);
    });

    testSingleCase(chrono, "lauantai", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(6);
    });
});

test("Test - Weekday abbreviations", function () {
    testSingleCase(chrono, "ma", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(1);
    });

    testSingleCase(chrono, "pe", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(5);
    });

    testSingleCase(chrono, "su", new Date(2012, 7, 9), (result) => {
        expect(result.start.get("weekday")).toBe(0);
    });
});
