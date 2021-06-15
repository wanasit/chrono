import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Positive time units", () => {
    // next 2 weeks
    testSingleCase(chrono.nl, "komende 2 weken", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(15);
    });

    // next 2 days
    testSingleCase(chrono.nl, "komende 2 dagen", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("hour")).toBe(12);
    });

    // next two years
    testSingleCase(chrono.nl, "komende 2 jaar", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2018);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    // next 2 weeks 3 days
    testSingleCase(chrono.nl, "komende 2 weken 3 dagen", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(18);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Negative time units", () => {
    // last 2 weeks
    testSingleCase(chrono.nl, "afgelopen 2 weken", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(12);
    });

    // last two weeks
    testSingleCase(chrono.nl, "afgelopen twee weken", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(12);
    });

    // past 2 days
    testSingleCase(chrono.nl, "afgelopen 2 dagen", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(29);
        expect(result.start.get("hour")).toBe(12);
    });

    // +2 months, 5 days
    testSingleCase(chrono.nl, "+2 maanden 5 dagen", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Plus '+' sign", () => {
    //+15 minutes
    testSingleCase(chrono.nl.casual, "+15 minuten", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 29));
    });

    testSingleCase(chrono.nl.casual, "+15min", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 29));
    });

    // +1 day 2 hour
    testSingleCase(chrono.nl.casual, "+1 dag 2 uur", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 11, 14, 14));
    });
});

test("Test - Minus '-' sign", () => {
    // -3y
    testSingleCase(chrono.nl.casual, "-3jr", new Date(2015, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 14));
    });

    // -2hr5min
    testSingleCase(chrono.nl, "-2u5min", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(9);
        expect(result.start.get("minute")).toBe(55);
    });
});
