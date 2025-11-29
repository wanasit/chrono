import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Italian Locale Basics", function () {
    testSingleCase(chrono.it, "La scadenza è il 15 marzo 2024", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("il 15 marzo 2024");
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono.it, "Ci incontriamo domani alle 10:00", new Date(2012, 7, 10, 8, 9), (result) => {
        expect(result.text).toBe("domani alle 10:00");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.it, "ieri sera", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("ieri sera");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(20);
    });
});

test("Test - Italian Locale with explicit strictMode", function () {
    const text = "venerdì";

    expect(chrono.it.parse(text).length).toBeGreaterThan(0);

    expect(chrono.it.strict.parse(text).length).toBe(0);
});
