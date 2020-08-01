import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Positive time units", () => {
    testSingleCase(chrono, "next 2 weeks", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono, "next 2 days", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "next two years", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2018);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "next 2 weeks 3 days", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(18);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Negative time units", () => {
    testSingleCase(chrono, "last 2 weeks", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "last two weeks", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "past 2 days", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(29);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "+2 months, 5 days", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Plus '+' sign", () => {
    testSingleCase(chrono.casual, "+15 minutes", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 29));
    });

    testSingleCase(chrono.casual, "+15min", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 29));
    });

    testSingleCase(chrono.casual, "+1 day 2 hour", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 11, 14, 14));
    });
});

test("Test - Minus '-' sign", () => {
    testSingleCase(chrono.casual, "-3y", new Date(2015, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 14));
    });

    testSingleCase(chrono, "-2hr5min", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(9);
        expect(result.start.get("minute")).toBe(55);
    });
});
