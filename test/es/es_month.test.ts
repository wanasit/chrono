import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

const reference = new Date(2023, 8 - 1, 10);

test("Test - Month-only expression", function () {
    testSingleCase(chrono.es, "septiembre", reference, (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start).toBeDate(new Date(2023, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.es, "en septiembre", reference, (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("septiembre");
        expect(result.start).toBeDate(new Date(2023, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.es, "septiembre de 2027", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2027);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start).toBeDate(new Date(2027, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.es, "setiembre", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("month")).toBe(9);
    });

    testSingleCase(chrono.es, "en sep", reference, (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("sep");
        expect(result.start.get("month")).toBe(9);
    });

    testSingleCase(chrono.es, "La fecha es septiembre.", reference, (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("septiembre");
    });
});

test("Test - Forward date option", function () {
    testSingleCase(chrono.es, "septiembre", reference, { forwardDate: true }, (result) => {
        expect(result.start).toBeDate(new Date(2023, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.es, "septiembre", new Date(2023, 10 - 1, 10), { forwardDate: true }, (result) => {
        expect(result.start).toBeDate(new Date(2024, 9 - 1, 1, 12));
    });
});

test("Test - Month-only negative cases", function () {
    testUnexpectedResult(chrono.es, "sep", reference);
    testUnexpectedResult(chrono.es, "ene", reference);
    testUnexpectedResult(chrono.es, "dic", reference);
    testUnexpectedResult(chrono.es.strict, "septiembre", reference);

    const suffixes = ["", "º", "ª", "°", "ro", "do", "to", "mo", "er", "vo", "no", "ma", "era", "ero", "avo", "ava"];
    const separators = ["", " ", " de ", "-", "/", ", ", " de-", " de/", " de,", " de de "];
    suffixes.forEach((suffix) => {
        separators.forEach((separator) => {
            testUnexpectedResult(chrono.es, `32${suffix}${separator}Agosto`, reference);
        });
    });

    [" a", "a", "de", "desde", "ao", "-", "–", " "].forEach((connector) => {
        testUnexpectedResult(chrono.es, `32${connector}32 Agosto`, reference);
        testSingleCase(chrono.es, `1${connector}3 Agosto`, reference, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start.get("day")).toBe(1);
            expect(result.end.get("day")).toBe(3);
        });
    });
});
