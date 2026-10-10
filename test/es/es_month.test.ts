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

    testUnexpectedResult(chrono.es, "32Agosto", reference);
    testUnexpectedResult(chrono.es, "32 Agosto", reference);
    testUnexpectedResult(chrono.es, "32º de Agosto", reference);
    testUnexpectedResult(chrono.es, "32ª Agosto", reference);
    testUnexpectedResult(chrono.es, "32° Agosto", reference);
    testUnexpectedResult(chrono.es, "32ro Agosto", reference);
    testUnexpectedResult(chrono.es, "32era Agosto", reference);
    testUnexpectedResult(chrono.es, "32avo Agosto", reference);
    testUnexpectedResult(chrono.es, "32-Agosto", reference);
    testUnexpectedResult(chrono.es, "32/Agosto", reference);
    testUnexpectedResult(chrono.es, "32, Agosto", reference);
    testUnexpectedResult(chrono.es, "32 de-Agosto", reference);
    testUnexpectedResult(chrono.es, "32 de/Agosto", reference);
    testUnexpectedResult(chrono.es, "32 de,Agosto", reference);
    testUnexpectedResult(chrono.es, "32 de de Agosto", reference);
    testUnexpectedResult(chrono.es, "32 a32 Agosto", reference);
    testUnexpectedResult(chrono.es, "32a32 Agosto", reference);
    testUnexpectedResult(chrono.es, "32de32 Agosto", reference);
    testUnexpectedResult(chrono.es, "32desde32 Agosto", reference);
    testUnexpectedResult(chrono.es, "32ao32 Agosto", reference);
    testUnexpectedResult(chrono.es, "32-32 Agosto", reference);
    testUnexpectedResult(chrono.es, "32–32 Agosto", reference);
    testUnexpectedResult(chrono.es, "32 32 Agosto", reference);
});

test("Test - Compact day ranges", function () {
    testSingleCase(chrono.es, "1 a3 Agosto", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(1);
        expect(result.end.get("day")).toBe(3);
    });

    testSingleCase(chrono.es, "1a3 Agosto", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(1);
        expect(result.end.get("day")).toBe(3);
    });

    testSingleCase(chrono.es, "1de3 Agosto", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(1);
        expect(result.end.get("day")).toBe(3);
    });

    testSingleCase(chrono.es, "1desde3 Agosto", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(1);
        expect(result.end.get("day")).toBe(3);
    });

    testSingleCase(chrono.es, "1ao3 Agosto", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(1);
        expect(result.end.get("day")).toBe(3);
    });

    testSingleCase(chrono.es, "1-3 Agosto", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(1);
        expect(result.end.get("day")).toBe(3);
    });

    testSingleCase(chrono.es, "1–3 Agosto", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(1);
        expect(result.end.get("day")).toBe(3);
    });

    testSingleCase(chrono.es, "1 3 Agosto", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(1);
        expect(result.end.get("day")).toBe(3);
    });
});
