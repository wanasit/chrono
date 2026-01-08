import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src/";

test("Test - Single Expression", function () {
    testSingleCase(chrono.es, "en 5 días, haremos algo", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("en 5 días");
        expect(result.tags()).toContain("result/relativeDate");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.es, "dentro de 10 días haremos algo", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("dentro de 10 días");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    testSingleCase(chrono.es, "en 15 minutos", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en 15 minutos");

        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.es, "   en 12 horas", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("en 12 horas");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 0, 14));
    });

    testSingleCase(chrono.es, "en 1h", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("en 1h");
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });
});

test("Test - Single Expression (Casual)", function () {
    testSingleCase(chrono.es, "en 5 meses, haremos algo", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("en 5 meses");

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10));
    });

    testSingleCase(chrono.es, "en 2 años, haremos algo", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2014);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("en 2 años");

        expect(result.start).toBeDate(new Date(2014, 8 - 1, 10));
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.es, "en unas horas");
});
