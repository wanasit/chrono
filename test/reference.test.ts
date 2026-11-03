import { runInNewContext } from "vm";
import * as chrono from "../src";

test("Test - Parsing with a Date from another realm", () => {
    const instant = "2025-06-07T12:34:56.789Z";
    const localDate = new Date(instant);
    const foreignDate: Date = runInNewContext("new Date(instant)", { instant });
    const expected = new Date("2025-06-06T12:34:56.789Z");

    expect(foreignDate instanceof Date).toBe(false);
    expect(chrono.parseDate("1 day ago", localDate)).toEqual(expected);
    expect(chrono.parseDate("1 day ago", foreignDate)).toEqual(expected);

    const results = chrono.parse("Logged 1 day ago.", foreignDate);
    expect(results).toHaveLength(1);
    expect(results[0].index).toBe(7);
    expect(results[0].text).toBe("1 day ago");
    expect(results[0].refDate).toBe(foreignDate);
    expect(results[0].date()).toEqual(expected);
});

test.each([
    ["local", new Date(NaN)],
    ["foreign", runInNewContext("new Date(NaN)") as Date],
])("Test - Preserve an invalid %s Date reference", (_realm, date: Date) => {
    const reference = chrono.ReferenceWithTimezone.fromInput(date);
    expect(reference.instant).toBe(date);
    expect(reference.timezoneOffset).toBeNull();
    expect(Number.isNaN(reference.instant.getTime())).toBe(true);
    expect(chrono.parseDate("1 day ago", date)).toBeNull();
});

test("Test - A foreign Date is recognized without its tag or getTime method", () => {
    const date: Date = runInNewContext("new Date('2025-06-07T12:34:56.789Z')");
    Object.defineProperty(date, Symbol.toStringTag, { value: "Object" });
    date.getTime = () => {
        throw new Error("Do not call the instance method to identify a Date");
    };

    expect(chrono.ReferenceWithTimezone.fromInput(date).instant).toBe(date);
    expect(chrono.parseDate("1 day ago", date)).toEqual(new Date("2025-06-06T12:34:56.789Z"));
});

test("Test - ParsingReference objects keep their instant and timezone", () => {
    const instant = "2025-06-07T12:34:56.789Z";
    const foreignDate: Date = runInNewContext("new Date(instant)", { instant });
    const input = { instant: foreignDate, timezone: "JST" };
    const reference = chrono.ReferenceWithTimezone.fromInput(input);

    expect(reference.instant).toBe(foreignDate);
    expect(reference.timezoneOffset).toBe(540);
    expect(chrono.parseDate("today at 9am", input)).toEqual(new Date("2025-06-07T00:00:00.000Z"));
});

test("Test - A Date tag or wrapped value does not override a ParsingReference", () => {
    const instant = new Date("2025-06-07T12:34:56.789Z");
    const input = {
        instant,
        timezone: "JST",
        [Symbol.toStringTag]: "Date",
        valueOf: () => instant.getTime(),
        getTime: () => instant.getTime(),
    };
    const reference = chrono.ReferenceWithTimezone.fromInput(input);

    expect(Object.prototype.toString.call(input)).toBe("[object Date]");
    expect(reference.instant).toBe(instant);
    expect(reference.timezoneOffset).toBe(540);
    expect(chrono.parseDate("today at 9am", input)).toEqual(new Date("2025-06-07T00:00:00.000Z"));
});

test("Test - Omitted references and Date-like objects still default to now", () => {
    const now = new Date("2025-06-07T12:34:56.789Z");
    const wrappedDate: Date = runInNewContext("new Date('2000-01-01T00:00:00Z')");
    const dateLike = {
        [Symbol.toStringTag]: "Date",
        valueOf: () => wrappedDate.getTime(),
        getTime: () => wrappedDate.getTime(),
    };

    jest.useFakeTimers().setSystemTime(now);
    try {
        for (const input of [undefined, null, {}, dateLike, new Proxy(wrappedDate, {})]) {
            const reference = chrono.ReferenceWithTimezone.fromInput(input);
            expect(reference.instant.getTime()).toBe(now.getTime());
            expect(reference.timezoneOffset).toBeNull();
            expect(chrono.parseDate("1 day ago", input)).toEqual(new Date("2025-06-06T12:34:56.789Z"));
        }
        const reference = chrono.ReferenceWithTimezone.fromInput({ timezone: "JST" });
        expect(reference.instant.getTime()).toBe(now.getTime());
        expect(reference.timezoneOffset).toBe(540);
    } finally {
        jest.useRealTimers();
    }
});
