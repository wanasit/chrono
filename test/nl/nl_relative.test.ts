import * as chrono from "../../src";
import { testSingleCase } from "../test_util";
import { ParsingResult } from "../../src/results";

test("Test - 'This' expressions", () => {
    // this week
    testSingleCase(chrono.nl, "deze week", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(19);
        expect(result.start.get("hour")).toBe(12);
    });

    // this month
    testSingleCase(chrono.nl, "deze maand", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    // this year
    testSingleCase(chrono.nl, "dit jaar", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Past relative expressions", () => {
    // last week
    testSingleCase(chrono.nl, "afgelopen week", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("hour")).toBe(12);
    });

    // last month
    testSingleCase(chrono.nl, "afgelopen maand", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    // last day
    testSingleCase(chrono.nl, "afgelopen dag", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(12);
    });

    // past week
    testSingleCase(chrono.nl, "vorige week", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Future relative expressions", () => {
    // next hour
    testSingleCase(chrono.nl, "komende uur", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(13);
    });

    // next week
    testSingleCase(chrono.nl, "volgende week", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
        expect(result.start.get("hour")).toBe(12);
    });

    // next day
    testSingleCase(chrono.nl, "volgende dag", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("hour")).toBe(12);
    });

    // next month
    testSingleCase(chrono.nl, "volgende maand", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(false);
    });

    // next year
    testSingleCase(chrono.nl, "volgend jaar", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(11);
        expect(result.start.get("second")).toBe(32);
        expect(result.start.get("millisecond")).toBe(6);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(false);
        expect(result.start.isCertain("minute")).toBe(false);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);
        expect(result.start.isCertain("timezoneOffset")).toBe(false);
    });
});

test("Test - Relative date components' certainty", () => {
    const refDate = new Date(2016, 10 - 1, 7, 12);

    // next hour
    testSingleCase(chrono.nl, "komende uur", refDate, (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("timezoneOffset")).toBe(refDate.getTimezoneOffset() * -1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
    });

    // next month
    testSingleCase(chrono.nl, "volgende maand", refDate, (result, text) => {
        //const expectedDate = new Date(2016, 11, 7, 12);

        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("hour")).toBe(12);
        //expect(result.start.get("timezoneOffset")).toBe(-expectedDate.getTimezoneOffset());

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(false);
        expect(result.start.isCertain("timezoneOffset")).toBe(false);
    });
});

test("Test - Relative date components' certainty and imply timezone", () => {
    const refDate = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");

    {
        // now
        const text = "nu";
        const result = chrono.nl.parse(text, refDate)[0] as ParsingResult;

        expect(result.text).toBe(text);
        result.start.imply("timezoneOffset", 60);

        expect(result).toBeDate(new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)"));
        expect(result).toBeDate(new Date("Sun Nov 29 2020 5:24:13 GMT+0100"));
    }

    {
        // tomorrow at 5pm
        const text = "morgen om 17 uur";
        const result = chrono.nl.parse(text, refDate)[0] as ParsingResult;

        expect(result.text).toBe(text);
        result.start.imply("timezoneOffset", 60);

        expect(result).toBeDate(new Date("Sun Dec 1 2020 1:00:00 GMT+0900 (Japan Standard Time)"));
        expect(result).toBeDate(new Date("Sun Nov 30 2020 17:00:00 GMT+0100"));
    }

    {
        // in 10 minutes
        const text = "binnen 10 minuten";
        const result = chrono.nl.parse(text, refDate)[0] as ParsingResult;

        expect(result.text).toBe(text);
        result.start.imply("timezoneOffset", 60);

        expect(result).toBeDate(new Date("Sun Nov 29 2020 13:34:13 GMT+0900 (Japan Standard Time)"));
        expect(result).toBeDate(new Date("Sun Nov 29 2020 5:34:13 GMT+0100"));
    }
});
