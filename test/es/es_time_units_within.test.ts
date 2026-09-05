import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.es, "Tenemos que hacer algo en 5 días.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(23);
        expect(result.text).toBe("en 5 días");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.es, "Tenemos que hacer algo en cinco días.", new Date(2012, 7, 10, 11, 12), (result) => {
        expect(result.index).toBe(23);
        expect(result.text).toBe("en cinco días");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15, 11, 12));
    });

    testSingleCase(chrono.es, "en 5 minutos", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en 5 minutos");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.es, "por 5 minutos", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("por 5 minutos");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.es, "en 1 hora", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en 1 hora");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono.es, "establecer un temporizador de 5 minutos", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(27);
        expect(result.text).toBe("de 5 minutos");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.es, "En 5 minutos me voy a casa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("En 5 minutos");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.es, "En 5 segundos un auto se moverá", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("En 5 segundos");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });

    testSingleCase(chrono.es, "en dos semanas", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en dos semanas");

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12, 14));
    });

    testSingleCase(chrono.es, "dentro de un mes", new Date(2012, 7, 10, 7, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dentro de un mes");

        expect(result.start).toBeDate(new Date(2012, 8, 10, 7, 14));
    });

    testSingleCase(chrono.es, "en algunos meses", new Date(2012, 6, 10, 22, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en algunos meses");

        expect(result.start).toBeDate(new Date(2012, 9, 10, 22, 14));
    });

    testSingleCase(chrono.es, "en un año", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en un año");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono.es, "dentro de un año", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dentro de un año");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono.es, "En 5 Minutos hay que mover un coche", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("En 5 Minutos");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.es, "En 5 minutos hay que mover un coche.", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("En 5 minutos");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });
});

test("Test - ASCII unit aliases", function () {
    const reference = new Date(2012, 7, 10, 12, 14);
    const cases = [
        ["en 3 días", new Date(2012, 7, 13, 12, 14)],
        ["en 3 dias", new Date(2012, 7, 13, 12, 14)],
        ["en un año", new Date(2013, 7, 10, 12, 14)],
        ["en un ano", new Date(2013, 7, 10, 12, 14)],
    ] as const;

    cases.forEach(([expression, expectedDate]) => {
        testSingleCase(chrono.es, expression, reference, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(expectedDate);
        });
        testSingleCase(chrono.es.strict, expression, reference, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(expectedDate);
        });
    });
});

test("Test - Forward date option", function () {
    const reference = new Date(2012, 7, 10, 12, 14);
    const cases = [
        ["3 días", new Date(2012, 7, 13, 12, 14), true],
        ["3 dias", new Date(2012, 7, 13, 12, 14), true],
        ["2 horas", new Date(2012, 7, 10, 14, 14), true],
        ["una semana", new Date(2012, 7, 17, 12, 14), true],
        ["un año", new Date(2013, 7, 10, 12, 14), false],
        ["un ano", new Date(2013, 7, 10, 12, 14), false],
        ["1 dia 2 horas", new Date(2012, 7, 11, 14, 14), true],
    ] as const;

    cases.forEach(([expression, expectedDate, isDateCertain]) => {
        testSingleCase(chrono.es, expression, reference, { forwardDate: true }, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.tags()).toContain("result/relativeDate");
            expect(result.start).toBeDate(expectedDate);
            expect(result.start.isCertain("year")).toBeTruthy();
            expect(result.start.isCertain("month")).toBe(isDateCertain);
            expect(result.start.isCertain("day")).toBe(isDateCertain);
        });
    });
});

test("Test - Bare durations require casual forward date", function () {
    const reference = new Date(2012, 7, 10, 12, 14);
    const expressions = ["3 días", "3 dias", "2 horas", "una semana", "un año", "un ano"];

    expressions.forEach((expression) => {
        testUnexpectedResult(chrono.es, expression, reference);
        testUnexpectedResult(chrono.es.strict, expression, reference, { forwardDate: true });
    });

    testUnexpectedResult(chrono.es, "El proyecto dura 3 días", reference);
});
