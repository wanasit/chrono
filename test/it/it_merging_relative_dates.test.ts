import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Merging dates with time", function () {
    testSingleCase(chrono.it, "domani alle 13:00", new Date(2012, 7, 10, 8, 9), (result) => {
        expect(result.text).toBe("domani alle 13:00");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.it, "ieri alle 10:00", new Date(2012, 7, 10, 8, 9), (result) => {
        expect(result.text).toBe("ieri alle 10:00");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.it, "venerdì prossimo alle 18:00", new Date(2012, 7, 9), (result) => {
        expect(result.text).toBe("venerdì prossimo alle 18:00");
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(0);
    });
});

test("Test - A bare number followed by a colon should not merge backwards over the date that follows", function () {
    // Same failure mode as in English: a stray "24:" label must not eat the date after it just
    // because ":" is also a valid date/time connector in Italian.
    testSingleCase(chrono.it.strict, "24: 23 luglio 2026 alle 15:30", new Date(2026, 7 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe("23 luglio 2026 alle 15:30");
        expect(text).not.toBe(result.text);

        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(23);

        expect(result.start.get("hour")).toBe(15);
        expect(result.start.get("minute")).toBe(30);
    });
});

test("Test - Relative date after a date keeps the reference timezone", () => {
    // Mar 1 to Mar 15, 2024 crosses the US DST change, so these only fail on a US system timezone
    const reference = { instant: new Date("2024-02-20T12:00:00Z"), timezone: "JST" };
    testSingleCase(chrono.it, "2 settimane dopo 2024-03-01", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date("2024-03-15T12:00:00+09:00"));
    });

    testSingleCase(chrono.it, "2024-03-01 + 2 settimane", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date("2024-03-15T12:00:00+09:00"));
    });

    testSingleCase(chrono.it, "2 settimane dopo 2024-03-01", new Date(2024, 2 - 1, 20, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2024, 3 - 1, 15, 12));
    });
});
