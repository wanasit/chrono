import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.it, "Alle 18:10", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Alle 18:10");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 10));
    });

    testSingleCase(chrono.it, "Alle 6:10", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Alle 6:10");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 10));
    });
});

test("Test - Time Expression with Meridiem", function () {
    testSingleCase(chrono.it, "6 del pomeriggio", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("6 del pomeriggio");

        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 0));
    });

    testSingleCase(chrono.it, "ore 6 in punto", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(4);
        expect(result.text).toBe("6 in punto");

        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0));
    });

    testSingleCase(chrono.it, "6 della mattina", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("6 della mattina");

        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0));
    });

    testSingleCase(chrono.it, "Alle 20 sera", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Alle 20 sera");
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);
    });
});

test("Test - Casual Time Expression", function () {
    testSingleCase(chrono.it, "Stasera", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Stasera");
        expect(result.start.get("hour")).toBe(22); // Implied "evening" hours?
    });

    // Check if this parser handles range
    testSingleCase(chrono.it, "10:00 - 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10:00 - 12:00");

        expect(result.start.get("hour")).toBe(10);
        expect(result.end.get("hour")).toBe(12);
    });
});
