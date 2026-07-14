import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src/";

test("Test - Single Expression", function () {
    testSingleCase(chrono.es, "hace 5 días, hicimos algo", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("hace 5 días");
        expect(result.tags()).toContain("result/relativeDate");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    testSingleCase(chrono.es, "hace 10 días, hicimos algo", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("hace 10 días");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });

    testSingleCase(chrono.es, "hace 15 minutos", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("hace 15 minutos");
        expect(result.tags()).toContain("result/relativeDate");
        expect(result.tags()).toContain("result/relativeDateAndTime");

        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.es, "   hace 12 horas", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("hace 12 horas");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    testSingleCase(chrono.es, "hace 1h", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("hace 1h");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.es, "hace 12 segundos hice algo", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("hace 12 segundos");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(48);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 48));
    });

    testSingleCase(chrono.es, "hace tres segundos hice algo", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("hace tres segundos");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(57);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 57));
    });
});

test("Test - Single Expression (Casual)", function () {
    testSingleCase(chrono.es, "hace 5 meses, hicimos algo", new Date(2012, 10 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("hace 5 meses");

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 10));
    });

    testSingleCase(chrono.es, "hace 5 años, hicimos algo", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2007);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("hace 5 años");

        expect(result.start).toBeDate(new Date(2007, 8 - 1, 10));
    });

    testSingleCase(chrono.es, "hace una semana, hicimos algo", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe("hace una semana");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 27));
    });

    testSingleCase(chrono.es, "hace pocos días, hicimos algo", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("hace pocos días");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });
});

test("Test - Nested time ago", function () {
    testSingleCase(chrono.es, "hace 15 horas 29 minutos", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("hace 15 horas 29 minutos");
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(7);
        expect(result.start.get("minute")).toBe(1);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.es, "hace 1 día 21 horas ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("hace 1 día 21 horas");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(1);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.es, "hace 1d 21 h 25m ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("hace 1d 21 h 25m");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(1);
        expect(result.start.get("minute")).toBe(5);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });
});

test("Test - Strict mode", function () {
    testSingleCase(chrono.es.strict, "hace 5 minutos", new Date(2012, 7, 10, 12, 14), (result, text) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 9));
    });

    testUnexpectedResult(chrono.es.strict, "hace 5m", new Date(2012, 7, 10, 12, 14));
    testUnexpectedResult(chrono.es.strict, "hace 5 h", new Date(2012, 7, 10, 12, 14));
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.es, "hace unas horas");
});
