import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Timezone abbreviation", function () {
    testSingleCase(chrono.it, "10 agosto 2012 10:00 CET", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(120);

        expect(result.text).toBe("10 agosto 2012 10:00 CET");
    });

    testSingleCase(chrono.it, "10 agosto 2012 10:00 CEST", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("timezoneOffset")).toBe(120);

        expect(result.text).toBe("10 agosto 2012 10:00 CEST");
    });
});

test("Test - Timezone offset", function () {
    testSingleCase(chrono.it, "10 agosto 2012 10:00 +0100", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("timezoneOffset")).toBe(60);

        expect(result.text).toBe("10 agosto 2012 10:00 +0100");
    });

    testSingleCase(chrono.it, "10 agosto 2012 10:00 +01:00", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("timezoneOffset")).toBe(60);

        expect(result.text).toBe("10 agosto 2012 10:00 +01:00");
    });

    testSingleCase(chrono.it, "10 agosto 2012 10:00 +02:00", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("timezoneOffset")).toBe(120);

        expect(result.text).toBe("10 agosto 2012 10:00 +02:00");
    });
});
