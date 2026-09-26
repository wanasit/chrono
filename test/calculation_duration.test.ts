import { addDuration, reverseDuration } from "../src/calculation/duration";

test("Test - Adding Duration w/ single timeunit", () => {
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "year": 1 });
        expect(output).toStrictEqual(new Date("Sun, Aug 27 2023 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "month": 1 });
        expect(output).toStrictEqual(new Date("Wed, Sep 27 2022 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "week": 1 });
        expect(output).toStrictEqual(new Date("Sat, Sep 3 2022 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "day": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 28 2022 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "hour": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 13:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "minute": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 12:53:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "second": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 12:52:12"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11:00");
        const output = addDuration(reference, { "millisecond": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 12:52:11:01"));
    }
});

test("Test - Adding Duration w/ single timeunit shorten", () => {
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "y": 1 });
        expect(output).toStrictEqual(new Date("Sun, Aug 27 2023 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "M": 1 });
        expect(output).toStrictEqual(new Date("Wed, Sep 27 2022 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "w": 1 });
        expect(output).toStrictEqual(new Date("Sat, Sep 3 2022 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "d": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 28 2022 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "h": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 13:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "m": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 12:53:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "s": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 12:52:12"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11:00");
        const output = addDuration(reference, { "ms": 1 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 12:52:11:01"));
    }
});

test("Test - Adding Duration w/ multiple timeunits", () => {
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "month": 1, "day": 4 });
        expect(output).toStrictEqual(new Date("Wed, Oct 1 2022 12:52:11"));
    }
    {
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "month": 1, "day": 4, "hour": 12 });
        expect(output).toStrictEqual(new Date("Wed, Oct 2 2022 00:52:11"));
    }
});

test("Test - Adding Duration w/ months past the end of the target month", () => {
    {
        const reference = new Date("Tue, Jan 31 2023 12:52:11");
        const output = addDuration(reference, { "month": 1 });
        expect(output).toStrictEqual(new Date("Tue, Feb 28 2023 12:52:11"));
    }
    {
        const reference = new Date("Wed, Jan 31 2024 12:52:11");
        const output = addDuration(reference, { "month": 1 });
        expect(output).toStrictEqual(new Date("Thu, Feb 29 2024 12:52:11"));
    }
    {
        const reference = new Date("Sun, Dec 31 2023 12:52:11");
        const output = addDuration(reference, { "month": -1 });
        expect(output).toStrictEqual(new Date("Thu, Nov 30 2023 12:52:11"));
    }
    {
        const reference = new Date("Thu, Aug 31 2023 12:52:11");
        const output = addDuration(reference, { "quarter": 1 });
        expect(output).toStrictEqual(new Date("Thu, Nov 30 2023 12:52:11"));
    }
    {
        const reference = new Date("Thu, Feb 29 2024 12:52:11");
        const output = addDuration(reference, { "year": 1 });
        expect(output).toStrictEqual(new Date("Fri, Feb 28 2025 12:52:11"));
    }
    {
        const reference = new Date("Thu, Feb 29 2024 12:52:11");
        const output = addDuration(reference, { "year": 1, "month": 1 });
        expect(output).toStrictEqual(new Date("Sat, Mar 29 2025 12:52:11"));
    }
    {
        const reference = new Date("Tue, Jan 31 2023 12:52:11");
        const output = addDuration(reference, { "month": 1, "day": 1 });
        expect(output).toStrictEqual(new Date("Wed, Mar 1 2023 12:52:11"));
    }
    {
        const reference = new Date("Sun, May 31 2023 12:52:11");
        const output = addDuration(reference, { "quarter": -1 });
        expect(output).toStrictEqual(new Date("Tue, Feb 28 2023 12:52:11"));
    }
    {
        const reference = new Date("Thu, Feb 29 2024 12:52:11");
        const output = addDuration(reference, { "year": -1 });
        expect(output).toStrictEqual(new Date("Tue, Feb 28 2023 12:52:11"));
    }
    {
        // The fraction becomes 2 weeks, added after the day is capped to Feb 28
        const reference = new Date("Tue, Jan 31 2023 12:52:11");
        const output = addDuration(reference, { "month": 1.5 });
        expect(output).toStrictEqual(new Date("Tue, Mar 14 2023 12:52:11"));
    }
    {
        // US timezones skipped 02:00 to 03:00 on Apr 1, 2001, so the time must not pass through that day
        const reference = new Date("Thu, Mar 15 2001 02:30:00");
        expect(addDuration(reference, { "month": 1 })).toStrictEqual(new Date("Sun, Apr 15 2001 02:30:00"));
        expect(addDuration(new Date("Sun, Apr 15 2001 02:30:00"), { "month": -1 })).toStrictEqual(reference);
    }
});

test("Test - Adding Duration w/ fractions", () => {
    {
        // 0.5 year (aka. half year) => 6 months
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "year": 0.5 });
        expect(output).toStrictEqual(new Date("Mon, Feb 27 2023 12:52:11"));
    }
    {
        // 0.5 month => 2 weeks
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "month": 0.5 });
        expect(output).toStrictEqual(new Date("Sat, Sep 10 2022 12:52:11"));
    }
    {
        // 0.5 week => 4 days (actually 3.5 days, but we round up to 4 days)
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "week": 0.5 });
        expect(output).toStrictEqual(new Date("Sat, Aug 31 2022 12:52:11"));
    }
    {
        // 0.5 day (aka. half day) => 12 hours
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "day": 0.5 });
        expect(output).toStrictEqual(new Date("Sat, Aug 28 2022 00:52:11"));
    }
    {
        // 0.5 hour (aka. half hour) => 30 minutes
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "hour": 0.5 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 13:22:11"));
    }
    {
        // 0.5 minute (aka. half minute) => 30 seconds
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "minute": 0.5 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 12:52:41"));
    }
    {
        // 0.5 second (aka. half second) => 500 milliseconds
        const reference = new Date("Sat, Aug 27 2022 12:52:11:00");
        const output = addDuration(reference, { "second": 0.5 });
        expect(output).toStrictEqual(new Date("Sat, Aug 27 2022 12:52:11:500"));
    }
});

test("Test - Adding Duration w/ multiple fractions", () => {
    {
        // 0.5 year (aka. half year) => 6 months
        const reference = new Date("Sat, Aug 27 2022 12:52:11");
        const output = addDuration(reference, { "year": 0.5, "month": 2 });
        expect(output).toStrictEqual(new Date("Thu, April 27 2023 12:52:11"));
    }
});

test("Test - Reverse Duration", () => {
    {
        const timeunits = { year: 5, month: 5 };
        expect(reverseDuration(timeunits)).toStrictEqual({ year: -5, month: -5 });
    }
    {
        const timeunits = { year: -5, month: -5 };
        expect(reverseDuration(timeunits)).toStrictEqual({ year: 5, month: 5 });
    }
});
