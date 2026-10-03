import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

const ORDINAL_CASES: Array<[number, string[]]> = [
    [1, ["primero", "primera"]],
    [2, ["segundo", "segunda"]],
    [3, ["tercero", "tercera"]],
    [4, ["cuarto", "cuarta"]],
    [5, ["quinto", "quinta"]],
    [6, ["sexto", "sexta"]],
    [7, ["séptimo", "septimo", "séptima", "septima"]],
    [8, ["octavo", "octava"]],
    [9, ["noveno", "novena"]],
    [10, ["décimo", "decimo", "décima", "decima"]],
    [11, ["undécimo", "undecimo"]],
    [12, ["duodécimo", "duodecimo"]],
    [13, ["decimotercero"]],
    [14, ["decimocuarto"]],
    [15, ["decimoquinto"]],
    [16, ["decimosexto"]],
    [17, ["decimoséptimo", "decimoseptimo"]],
    [18, ["decimoctavo"]],
    [19, ["decimonoveno"]],
    [20, ["vigésimo", "vigesimo"]],
    [21, ["vigésimo primero", "vigesimo primero"]],
    [22, ["vigésimo segundo", "vigesimo segundo"]],
    [23, ["vigésimo tercero", "vigesimo tercero"]],
    [24, ["vigésimo cuarto", "vigesimo cuarto"]],
    [25, ["vigésimo quinto", "vigesimo quinto"]],
    [26, ["vigésimo sexto", "vigesimo sexto"]],
    [27, ["vigésimo séptimo", "vigesimo septimo"]],
    [28, ["vigésimo octavo", "vigesimo octavo"]],
    [29, ["vigésimo noveno", "vigesimo noveno"]],
    [30, ["trigésimo", "trigesimo"]],
    [31, ["trigésimo primero", "trigesimo primero"]],
];

test("Test - Single expression", function () {
    testSingleCase(chrono.es, "10 Agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Agosto 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.es, "10 Agosto 234 AC", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Agosto 234 AC");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(-234);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(-234, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.es, "10 Agosto 88 d. C.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Agosto 88 d. C.");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.es, "Dom 15Sep", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Dom 15Sep");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.es, "DOM 15SEP", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("DOM 15SEP");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.es, "La fecha límite es 10 Agosto", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe("10 Agosto");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.es, "La fecha límite es el martes, 10 de enero", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(22);
        expect(result.text).toBe("martes, 10 de enero");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.es, "La fecha límite es el miércoles, 10 de enero ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(22);
        expect(result.text).toBe("miércoles, 10 de enero");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(3);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.es, "10 de Agosto de 2012", new Date(2010, 1, 1), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 de Agosto de 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });
});

test("Test - Range expression", function () {
    testSingleCase(chrono.es, "10 - 22 Agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 - 22 Agosto 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.es, "10 a 22 Agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 a 22 Agosto 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.es, "10 Agosto - 12 Septiembre", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Agosto - 12 Septiembre");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 9 - 1, 12, 12));
    });

    testSingleCase(chrono.es, "10 Agosto - 12 Septiembre 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 Agosto - 12 Septiembre 2013");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2013);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2013, 9 - 1, 12, 12));
    });
});

test("Test - Combined expression", function () {
    testSingleCase(chrono.es, "12 de julio a las 19:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 de julio a las 19:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 12, 19, 0));
    });

    testSingleCase(chrono.es, "duodécimo de julio a las 19:00", new Date(2012, 7, 10), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 12, 19));
    });
});

test("Test - Ordinal words", function () {
    ORDINAL_CASES.forEach(([day, ordinals]) => {
        ordinals.forEach((ordinal) => {
            testSingleCase(chrono.es, `${ordinal} de diciembre`, new Date(2012, 1 - 1, 1), (result, text) => {
                expect(result.text).toBe(text);
                expect(result.start.get("day")).toBe(day);
                expect(result.start.get("month")).toBe(12);
            });
        });
    });

    testSingleCase(
        chrono.es,
        "vigésimo primero a vigésimo tercero de diciembre",
        new Date(2012, 1 - 1, 1),
        (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start.get("day")).toBe(21);
            expect(result.end.get("day")).toBe(23);
        }
    );

    testSingleCase(chrono.es, "La fecha es primero de septiembre.", new Date(2012, 1 - 1, 1), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("primero de septiembre");
    });
});

test("Test - Numeric ordinal suffixes", function () {
    ["", "º", "ª", "°", "ro", "do", "to", "mo", "er", "vo", "no", "ma", "era", "ero", "avo", "ava"].forEach(
        (suffix) => {
            const ordinal = `1${suffix}`;
            testSingleCase(chrono.es, `${ordinal} de septiembre`, new Date(2012, 1 - 1, 1), (result, text) => {
                expect(result.text).toBe(text);
                expect(result.start.get("day")).toBe(1);
                expect(result.start.get("month")).toBe(9);
            });
        }
    );
});

test("Test - Impossible Dates (Strict Mode)", function () {
    testUnexpectedResult(chrono.es.strict, "32 Agosto 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.es.strict, "29 Febrero 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.es.strict, "32 Agosto", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.es.strict, "trigésimo primero de febrero", new Date(2012, 7, 10));
});
