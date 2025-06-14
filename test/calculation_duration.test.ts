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
