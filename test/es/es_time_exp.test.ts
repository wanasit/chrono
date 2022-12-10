import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.es, "Estaremos a las 6.13 AM", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("las 6.13 AM");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(13);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 13));
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.es, "8:10 - 12.32", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8:10 - 12.32");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(12);
        expect(result.end.get("minute")).toBe(32);

        expect(result.end.isCertain("day")).toBe(false);
        expect(result.end.isCertain("month")).toBe(false);
        expect(result.end.isCertain("year")).toBe(false);
        expect(result.end.isCertain("hour")).toBe(true);
        expect(result.end.isCertain("minute")).toBe(true);
        expect(result.end.isCertain("second")).toBe(false);
        expect(result.end.isCertain("millisecond")).toBe(false);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12, 32));
    });

    testSingleCase(chrono.es, " de 6:30pm a 11:00pm ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("de 6:30pm a 11:00pm");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 30));

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(23);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 0));
    });
});

test("Test - Date + Time Expression", function () {
    testSingleCase(chrono.es, "Algo pasó el 10 de Agosto de 2012 10:12:59 pm", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe("10 de Agosto de 2012 10:12:59 pm");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("minute")).toBe(12);
        expect(result.start.get("second")).toBe(59);
        expect(result.start.get("millisecond")).toBe(0);
        expect(result.start.isCertain("millisecond")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 22, 12, 59));
    });
});

test("Test - Time Expression's Meridiem imply", function () {
    testSingleCase(chrono.es, "de 1pm a 3", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("de 1pm a 3");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("millisecond")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);
        expect(result.start.isCertain("meridiem")).toBe(true);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("second")).toBe(0);
        expect(result.end.get("millisecond")).toBe(0);
        expect(result.end.isCertain("meridiem")).toBe(true);
    });
});

test("Test - Random date + time expression", function () {
    testSingleCase(chrono.es, "lunes 4/29/2013 630-930am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "martes 5/1/2013 1115am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "miércoles 5/3/2013 1230pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "domingo 5/6/2013  750am-910am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "lunes 5/13/2013 630-930am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "miércoles 5/15/2013 1030am", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "jueves 6/21/2013 2:30", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "martes 7/2/2013 1-230 pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "Lunes, 6/24/2013, 7:00pm - 8:30pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "Miércoles, 3 Julio de 2013 a las 2pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "6pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "6 pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "7-10pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "11.1pm", (result, text) => {
        expect(result.text).toBe(text);
    });

    testSingleCase(chrono.es, "las 12", (result, text) => {
        expect(result.text).toBe(text);
    });
});
