import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.pt, "O prazo é agora", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("agora");

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

    testSingleCase(chrono.pt, "O prazo é hoje", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("hoje");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.pt, "O prazo é Amanhã", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("Amanhã");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    testSingleCase(chrono.pt, "O prazo é Amanhã", new Date(2012, 7, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 11, 1));
    });

    testSingleCase(chrono.pt, "O prazo foi ontem", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("ontem");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    testSingleCase(chrono.pt, "O prazo foi ontem à noite ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("ontem à noite");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(22);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 22));
    });

    testSingleCase(chrono.pt, "O prazo foi esta manhã ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("esta manhã");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });

    testSingleCase(chrono.pt, "O prazo foi esta tarde ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(12);
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
    testSingleCase(chrono.pt, "O prazo é hoje às 5PM", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("hoje às 5PM");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });
});

test("Test - Random text", function () {
    testSingleCase(chrono.pt, "esta noite", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.pt, "esta noite 8pm", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.pt, "esta noite às 8", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.pt, "quinta", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(4);
    });

    testSingleCase(chrono.pt, "sexta", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(5);
    });

    testSingleCase(chrono.pt, "ao meio-dia", new Date(2020, 8, 1, 11), (result) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start).toBeDate(new Date(2020, 8, 1, 12));
    });

    testSingleCase(chrono.pt, "a meia-noite", new Date(2020, 8, 1, 11), (result) => {
        expect(result.start.get("hour")).toBe(0);
        expect(result.start).toBeDate(new Date(2020, 8, 2));
    });
});

test("Test - Random negative text", function () {
    testUnexpectedResult(chrono.pt, "naohoje");

    testUnexpectedResult(chrono.pt, "hyamanhã");

    testUnexpectedResult(chrono.pt, "xontem");

    testUnexpectedResult(chrono.pt, "porhora");

    testUnexpectedResult(chrono.pt, "agoraxsd");
});
