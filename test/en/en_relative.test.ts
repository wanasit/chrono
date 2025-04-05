import * as chrono from "../../src";
import { testSingleCase } from "../test_util";
import { ParsingResult } from "../../src/results";

test("Test - 'This' expressions", () => {
    testSingleCase(chrono, "this week", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(19);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "this month", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "this month", new Date(2017, 11 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "this year", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Past relative expressions", () => {
    testSingleCase(chrono, "last week", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "lastmonth", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "last day", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "last month", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "past week", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Future relative expressions", () => {
    testSingleCase(chrono, "next hour", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(13);
    });

    testSingleCase(chrono, "next week", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "next day", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono, "next month", new Date(2016, 10 - 1, 1, 12), (result, text) => {
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

    testSingleCase(chrono, "next year", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
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

    testSingleCase(chrono, "next quarter", new Date(2021, 1 - 1, 22, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(false);
    });

    testSingleCase(chrono, "next qtr", new Date(2021, 10 - 1, 22, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(false);
    });

    testSingleCase(chrono, "next two quarter", new Date(2021, 1 - 1, 22, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("hour")).toBe(false);
    });

    testSingleCase(chrono, "after this year", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
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

    testSingleCase(chrono, "Connect back after this year", new Date(2022, 4 - 1, 16, 12), (result, text) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(16);
    });
});

test("Test - Relative date components' certainty", () => {
    const refDate = new Date(2016, 10 - 1, 7, 12);

    testSingleCase(chrono, "next hour", refDate, (result, text) => {
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

    testSingleCase(chrono, "next month", refDate, (result, text) => {
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

test("Test - Relative date when the timezone is irrelevant", () => {
    {
        // Sun Nov 29 2020 13:24:13 GMT+0900 (JST)
        // Sun Nov 29 2020 05:24:13 GMT+0100 (BST)
        const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");

        // The "now" is always exactly the same as the reference instant (regardless of the timezone).
        const text = "now";
        const result = chrono.parse(text, refInstant)[0] as ParsingResult;
        expect(result).toBeDate(new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (JST)"));
        expect(result).toBeDate(new Date("Sun Nov 29 2020 05:24:13 GMT+0100 (BST)"));

        result.start.imply("timezoneOffset", 60);
        expect(result).toBeDate(new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (JST)"));
        expect(result).toBeDate(new Date("Sun Nov 29 2020 05:24:13 GMT+0100 (BST)"));
    }
    {
        // Sun Nov 29 2020 13:24:13 GMT+0900 (JST)
        // Sun Nov 29 2020 05:24:13 GMT+0100 (BST)
        const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");

        // Always "10 minutes" from the reference instant (regardless of the target timezone).
        const text = "in 10 minutes";
        const result = chrono.parse(text, refInstant)[0] as ParsingResult;
        expect(result).toBeDate(new Date("Sun Nov 29 2020 13:34:13 GMT+0900 (JST)"));
        expect(result).toBeDate(new Date("Sun Nov 29 2020 05:34:13 GMT+0100 (BST)"));

        result.start.imply("timezoneOffset", 60);
        expect(result).toBeDate(new Date("Sun Nov 29 2020 13:34:13 GMT+0900 (JST)"));
        expect(result).toBeDate(new Date("Sun Nov 29 2020 05:34:13 GMT+0100 (BST)"));
    }
    {
        // Sun Nov 29 2020 13:24:13 GMT+0900 (JST)
        // Sun Nov 29 2020 05:24:13 GMT+0100 (BST)
        const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");

        // Always "10 minutes" from the reference instant (regardless of the reference timezone).
        const text = "in 10 minutes";
        {
            const result = chrono.parse(text, { instant: refInstant, timezone: "BST" })[0] as ParsingResult;
            expect(result).toBeDate(new Date("Sun Nov 29 2020 13:34:13 GMT+0900 (JST)"));
            expect(result).toBeDate(new Date("Sun Nov 29 2020 05:34:13 GMT+0100 (BST)"));
        }
        {
            const result = chrono.parse(text, { instant: refInstant, timezone: "JST" })[0] as ParsingResult;
            expect(result).toBeDate(new Date("Sun Nov 29 2020 13:34:13 GMT+0900 (JST)"));
            expect(result).toBeDate(new Date("Sun Nov 29 2020 05:34:13 GMT+0100 (BST)"));
        }
    }
    {
        // Sun Nov 29 2020 13:24:13 GMT+0900 (JST)
        // Sun Nov 29 2020 05:24:13 GMT+0100 (BST)
        const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");

        const text = "in 20 minutes";
        const result = chrono.parse(text, { instant: refInstant, timezone: null })[0] as ParsingResult;
        expect(result).toBeDate(new Date("Sun Nov 29 2020 13:44:13 GMT+0900 (JST)"));
        expect(result).toBeDate(new Date("Sun Nov 29 2020 05:44:13 GMT+0100 (BST)"));

        // Although the timezone is not specified, we need to assume it is similar to the system default.
        // We also must allow the timezoneOffset to be overridden. Otherwise, the relative meaning is incorrect.
        // expect(result.start.isCertain("timezoneOffset")).toBe(false);
    }
});

test("Test - Relative date when the timezone is relevant but unknown", () => {
    // Sun Nov 29 2020 13:24:13 (unknown timezone = system timezone)
    const refInstant = new Date(2020, 11 - 1, 29, 13, 24, 13, 0);

    // In the same (system) timezone, the "tomorrow" is 'Nov 30 2020'
    const text = "tomorrow at 5pm";
    const result = chrono.parse(text, refInstant)[0] as ParsingResult;
    expect(result).toBeDate(new Date(2020, 11 - 1, 30, 17, 0, 0, 0));
    expect(result.start.get("month")).toBe(11);
    expect(result.start.get("day")).toBe(30);
    expect(result.start.get("hour")).toBe(17);
});

test("Test - Relative date when the timezone is relevant and known", () => {
    // Sun Nov 29 2020 13:24:13 GMT+0900 (JST)
    // Sun Nov 29 2020 05:24:13 GMT+0100 (BST)
    // Sat Nov 28 2020 21:24:13 GMT-0700 (PDT)
    const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");
    {
        // In JST (Nov 29 2020 13:24:13 GMT+0900), the "tomorrow" is 'Nov 30 2020'
        const text = "tomorrow at 5pm";
        const result = chrono.parse(text, { instant: refInstant, timezone: "JST" })[0] as ParsingResult;
        expect(result).toBeDate(new Date("Mon Nov 30 2020 17:00:00 GMT+0900 (JST)"));
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(17);

        // However, when implying the output timezone to be GMT+0100,
        result.start.imply("timezoneOffset", 60);
        expect(result).toBeDate(new Date("Mon Nov 30 2020 17:00:00 GMT+0100 (BST)"));
    }
    {
        // In BST (Nov 29 2020 05:24:13 GMT+0100), the "tomorrow" is 'Nov 30 2020'
        const text = "tomorrow at 5pm";
        const result = chrono.parse(text, { instant: refInstant, timezone: "BST" })[0] as ParsingResult;
        expect(result).toBeDate(new Date("Mon Nov 30 2020 17:00:00 GMT+0100 (BST)"));
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(17);

        // However, when implying the output timezone to be GMT+0900,
        result.start.imply("timezoneOffset", 540);
        expect(result).toBeDate(new Date("Mon Nov 30 2020 17:00:00 GMT+0900 (JST)"));
    }
    {
        // In PST (Sat Nov 28 2020 21:24:13 GMT-0700), the "tomorrow" is 'Nov 29 2020'
        const text = "tomorrow at 5pm";
        const result = chrono.parse(text, { instant: refInstant, timezone: -7 * 60 })[0] as ParsingResult;
        expect(result).toBeDate(new Date("Sun Nov 29 2020 17:00:00 GMT-0700 (PST)"));
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(29);
        expect(result.start.get("hour")).toBe(17);

        // However, when implying the output timezone to be GMT+0900,
        result.start.imply("timezoneOffset", 540);
        expect(result).toBeDate(new Date("Sun Nov 29 2020 17:00:00 GMT+0900 (JST)"));
    }
});

test("Test - Relative date when the timezone is relevant and known (2nd scenario)", () => {
    // Thu Feb 27 2025 17:00:00 GMT+0000
    // Thu Feb 27 2025 09:00:00 GMT-0800 (PST)
    const refInstant = new Date("2025-02-27T17:00:00.000Z");
    {
        const text = "tomorrow at 9am";
        const result = chrono.parse(text, { instant: refInstant, timezone: "PST" })[0] as ParsingResult;
        expect(result).toBeDate(new Date("Fri Feb 28 2025 09:00:00 GMT-0800 (PST)"));
        expect(result).toBeDate(new Date("2025-02-28T17:00:00.000Z"));
    }
    {
        const text = "in 2 weeks at 9am";
        const result = chrono.parse(text, { instant: refInstant, timezone: "PST" })[0] as ParsingResult;
        expect(result).toBeDate(new Date("Thu Mar 13 2025 09:00:00 GMT-0800 (PST)"));
        expect(result).toBeDate(new Date("2025-03-13T17:00:00.000Z"));
    }
    {
        const text = "2 weeks ago at 9am";
        const result = chrono.parse(text, { instant: refInstant, timezone: "PST" })[0] as ParsingResult;
        expect(result).toBeDate(new Date("Thu Feb 13 2025 09:00:00 GMT-0800 (PST)"));
        expect(result).toBeDate(new Date("2025-02-13T17:00:00.000Z"));
    }
    {
        const text = "next friday at 9am";
        const result = chrono.parse(text, { instant: refInstant, timezone: "PST" })[0] as ParsingResult;
        expect(result).toBeDate(new Date("Fri Mar 07 2025 09:00:00 GMT-0800 (PST)"));
        expect(result).toBeDate(new Date("2025-03-07T17:00:00.000Z"));
    }
});
