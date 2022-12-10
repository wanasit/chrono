import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.es, "La fecha límite es ahora", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe("ahora");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start.get("second")).toBe(10);
        expect(result.start.get("millisecond")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.es, "La fecha límite es hoy", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe("hoy");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.es, "La fecha límite es Mañana", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe("Mañana");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    testSingleCase(chrono.es, "La fecha límite es mañana", new Date(2012, 7, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 11, 1));
    });

    testSingleCase(chrono.es, "La fecha límite fue ayer", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe("ayer");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    testSingleCase(chrono.es, "La fecha límite fue ayer de noche ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe("ayer de noche");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(22);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 22));
    });

    testSingleCase(chrono.es, "La fecha límite fue esta mañana ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe("esta mañana");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });

    testSingleCase(chrono.es, "La fecha límite fue esta tarde ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe("esta tarde");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });
});

test("Test - Combined Expression", function () {
    testSingleCase(chrono.es, "La fecha límite es hoy a las 5PM", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe("hoy a las 5PM");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });
});

test("Test - Random text", function () {
    testSingleCase(chrono.es, "esta noche", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.es, "esta noche 8pm", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.es, "esta noche a las 8", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.es, "jueves", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(4);
    });

    testSingleCase(chrono.es, "viernes", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(5);
    });

    testSingleCase(chrono.es, "el mediodía", new Date(2020, 8, 1, 11), (result) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start).toBeDate(new Date(2020, 8, 1, 12));
    });

    testSingleCase(chrono.es, "la medianoche", new Date(2020, 8, 1, 11), (result) => {
        expect(result.start.get("hour")).toBe(0);
        expect(result.start).toBeDate(new Date(2020, 8, 2));
    });
});

test("Test - Random negative text", function () {
    testUnexpectedResult(chrono.es, "nohoy");

    testUnexpectedResult(chrono.es, "hymañana");

    testUnexpectedResult(chrono.es, "xayer");

    testUnexpectedResult(chrono.es, "porhora");

    testUnexpectedResult(chrono.es, "ahoraxsd");
});
