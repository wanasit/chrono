import { ParsingComponents, ParsingResult, ReferenceWithTimezone } from "../src/results";

test("Test - Create & manipulate parsing components", () => {
    const reference = ReferenceWithTimezone.fromDate(new Date());
    const components = new ParsingComponents(reference, { year: 2014, month: 11, day: 24 });

    expect(components.get("year")).toBe(2014);
    expect(components.get("month")).toBe(11);
    expect(components.get("day")).toBe(24);
    expect(components.date()).toBeDefined();
    expect(components.tags().size).toBe(0);

    // null
    expect(components.get("weekday")).toBeNull();
    expect(components.isCertain("weekday")).toBe(false);

    // "imply"
    components.imply("weekday", 1);
    expect(components.get("weekday")).toBe(1);
    expect(components.isCertain("weekday")).toBe(false);

    // "assign" overrides "imply"
    components.assign("weekday", 2);
    expect(components.get("weekday")).toBe(2);
    expect(components.isCertain("weekday")).toBe(true);

    // "imply" doesn't override "assign"
    components.imply("year", 2013);
    expect(components.get("year")).toBe(2014);

    // "assign" overrides "assign"
    components.assign("year", 2013);
    expect(components.get("year")).toBe(2013);

    components.addTag("custom/testing_component_tag");
    expect(components.tags().size).toBe(1);
    expect(components.tags()).toContain("custom/testing_component_tag");
    expect(components.toString()).toContain("custom/testing_component_tag");
});

test("Test - Creating component from reference date (and duration)", () => {
    {
        const reference = ReferenceWithTimezone.fromDate(new Date("Sat, Aug 27 2022 12:52:11"));
        const components = ParsingComponents.createRelativeFromReference(reference);
        expect(components.date()).toStrictEqual(new Date("Sat, Aug 27 2022 12:52:11"));
        expect(components.isCertain("day")).toBe(true);
        expect(components.isCertain("hour")).toBe(true);
    }
    {
        const reference = ReferenceWithTimezone.fromDate(new Date("Sat, Aug 27 2022 12:52:11"));
        const components = ParsingComponents.createRelativeFromReference(reference, { day: 3 });
        expect(components.date()).toStrictEqual(new Date("Sat, Aug 30 2022 12:52:11"));
        expect(components.isCertain("day")).toBe(true);
        expect(components.isCertain("hour")).toBe(false);
    }
    {
        const reference = ReferenceWithTimezone.fromDate(new Date("Sat, Aug 27 2022 12:52:11"));
        const components = ParsingComponents.createRelativeFromReference(reference, { day: 1, hour: 3 });
        expect(components.date()).toStrictEqual(new Date("Sat, Aug 28 2022 15:52:11"));
        expect(components.isCertain("day")).toBe(true);
        expect(components.isCertain("hour")).toBe(true);
    }
});

test("Test - Create & manipulate parsing results", () => {
    const reference = new ReferenceWithTimezone(new Date());
    const text = "1 - 2 hour later";

    const startComponents = ParsingComponents.createRelativeFromReference(reference, { "hour": 1 }).addTag(
        "custom/testing_start_component_tag"
    );

    const endComponents = ParsingComponents.createRelativeFromReference(reference, { "hour": 2 }).addTag(
        "custom/testing_end_component_tag"
    );

    const result = new ParsingResult(reference, 0, text, startComponents, endComponents);

    // The result's date() should be the same as the start components' date()
    expect(result.date()).toStrictEqual(startComponents.date());

    // The result's tags should include both the start and end components' tags
    expect(result.tags()).toContain("custom/testing_start_component_tag");
    expect(result.tags()).toContain("custom/testing_end_component_tag");

    // The result's toString() should include the text and tags
    expect(result.toString()).toContain(text);
    expect(result.toString()).toContain("custom/testing_start_component_tag");
    expect(result.toString()).toContain("custom/testing_end_component_tag");

    // The result's addTag() and addTags() should add the tags to both start/end components
    result.addTag("custom/testing_result_tag1");
    result.addTags(["custom/testing_result_tag2"]);
    expect(startComponents.tags()).toContain("custom/testing_result_tag1");
    expect(startComponents.tags()).toContain("custom/testing_result_tag2");
    expect(endComponents.tags()).toContain("custom/testing_result_tag1");
    expect(endComponents.tags()).toContain("custom/testing_result_tag2");
});

test("Test - Calendar checking with implied components", () => {
    const reference = new ReferenceWithTimezone(new Date());

    {
        const components = new ParsingComponents(reference, {
            "day": 13,
            "month": 3,
            "year": 2021,
            "hour": 14,
            "minute": 22,
            "second": 14,
            "millisecond": 0,
        });
        components.imply("timezoneOffset", -300);

        expect(components.isValidDate()).toBe(true);
    }
});

test("Test - Calendar Checking", () => {
    const reference = new ReferenceWithTimezone(new Date());

    {
        const components = new ParsingComponents(reference, { year: 2014, month: 11, day: 24 });
        expect(components.isValidDate()).toBe(true);
    }

    {
        const components = new ParsingComponents(reference, { year: 2014, month: 11, day: 24, hour: 12 });
        expect(components.isValidDate()).toBe(true);
    }

    {
        const components = new ParsingComponents(reference, { year: 2014, month: 11, day: 24, hour: 12, minute: 30 });
        expect(components.isValidDate()).toBe(true);
    }

    {
        const components = new ParsingComponents(reference, {
            year: 2014,
            month: 11,
            day: 24,
            hour: 12,
            minute: 30,
            second: 30,
        });
        expect(components.isValidDate()).toBe(true);
    }

    {
        const components = new ParsingComponents(reference, { year: 2014, month: 13, day: 24 });
        expect(components.isValidDate()).toBe(false);
    }

    {
        const components = new ParsingComponents(reference, { year: 2014, month: 11, day: 32 });
        expect(components.isValidDate()).toBe(false);
    }

    {
        const components = new ParsingComponents(reference, { year: 2014, month: 11, day: 24, hour: 24 });
        expect(components.isValidDate()).toBe(false);
    }

    {
        const components = new ParsingComponents(reference, { year: 2014, month: 11, day: 24, hour: 12, minute: 60 });
        expect(components.isValidDate()).toBe(false);
    }

    {
        const components = new ParsingComponents(reference, {
            year: 2014,
            month: 11,
            day: 24,
            hour: 12,
            minute: 30,
            second: 60,
        });
        expect(components.isValidDate()).toBe(false);
    }
});

test("Test - DST-gap times resolve consistently on hosts that observe the gap", () => {
    // Jest cannot change the process timezone mid-run (assigning process.env.TZ does not invalidate
    // V8's cached zone). US zones spring forward on 2022-03-13, CET on 2022-03-27.
    const reference = new ReferenceWithTimezone(new Date());

    for (const { month, day } of [
        { month: 3, day: 13 },
        { month: 3, day: 27 },
    ]) {
        // "02:00" local time is skipped only if the host springs forward on this date.
        const hostSkipsGap =
            new Date(2022, month - 1, day, 2).getTime() === new Date(2022, month - 1, day, 3).getTime();
        if (!hostSkipsGap) continue;

        // A time in the gap is still a valid calendar date. Before the fix it was rejected on these
        // hosts, which dropped the result via UnlikelyFormatFilter (see #465).
        expect(new ParsingComponents(reference, { year: 2022, month, day, hour: 2, minute: 30 }).isValidDate()).toBe(
            true
        );

        // With an explicit offset the instant is fully determined and must not depend on the host's
        // gap: "02:30 +00:00" is 02:30Z. Before the fix this shifted by an hour on these hosts.
        const inGap = new ParsingComponents(reference, {
            year: 2022,
            month,
            day,
            hour: 2,
            minute: 30,
            second: 0,
            millisecond: 0,
            timezoneOffset: 0,
        });
        const expected = `2022-03-${String(day).padStart(2, "0")}T02:30:00.000Z`;
        expect(inGap.date().toISOString()).toBe(expected);
    }
});

test("Test - Getting timezone adjust date from references", () => {
    {
        const reference = ReferenceWithTimezone.fromInput({
            instant: new Date("Wed Jun 09 2021 07:21:32 GMT+0900 (JST)"),
            timezone: 9 * 60,
        });
        expect(reference.getDateWithAdjustedTimezone()).toStrictEqual(new Date(2021, 6 - 1, 9, 7, 21, 32));
    }
    {
        const reference = ReferenceWithTimezone.fromInput({
            instant: new Date("Wed Jun 09 2021 07:21:32 GMT+0900 (JST)"),
            timezone: "JST",
        });
        expect(reference.getDateWithAdjustedTimezone()).toStrictEqual(new Date(2021, 6 - 1, 9, 7, 21, 32));
    }
    {
        const reference = ReferenceWithTimezone.fromInput({
            instant: new Date("Wed Jun 09 2021 07:21:32 GMT-0500 (CDT)"),
            timezone: "CDT",
        });
        expect(reference.getDateWithAdjustedTimezone()).toStrictEqual(new Date(2021, 6 - 1, 9, 7, 21, 32));
    }
});

test("Test - ParsingComponents.addDurationAsImplied", () => {
    {
        const reference = ReferenceWithTimezone.fromDate(new Date("Sat, Aug 27 2022 12:52:11"));
        const components = ParsingComponents.createRelativeFromReference(reference);
        components.addDurationAsImplied({ hour: 3 });

        expect(components.date()).toStrictEqual(new Date("Sat, Aug 27 2022 15:52:11"));
        expect(components.isCertain("second")).toBe(false);
        expect(components.isCertain("minute")).toBe(false);
        expect(components.isCertain("hour")).toBe(false);
    }
    {
        const reference = ReferenceWithTimezone.fromDate(new Date("Sat, Aug 27 2022 12:52:11"));
        const components = ParsingComponents.createRelativeFromReference(reference);
        components.addDurationAsImplied({ day: 3 });
        expect(components.date()).toStrictEqual(new Date("Sat, Aug 30 2022 12:52:11"));
        expect(components.isCertain("day")).toBe(false);
        expect(components.isCertain("weekday")).toBe(false);
        expect(components.isCertain("month")).toBe(false);
        expect(components.isCertain("year")).toBe(false);
    }
});

test("Test - ParsingComponents.addDurationAsImplied on different timezones", () => {
    {
        // Thu Feb 27 2025 17:00:00 GMT+0000
        // Fri Feb 28 2025 02:00:00 GMT+0900 (JST)
        const refInstant = new Date("Thu Feb 27 2025 17:00:00 GMT+0000");
        const reference = ReferenceWithTimezone.fromInput({ instant: refInstant, timezone: "JST" });
        const components = ParsingComponents.createRelativeFromReference(reference);
        components.addDurationAsImplied({ hour: 3 });
        expect(components.date()).toStrictEqual(new Date("Fri Feb 28 2025 05:00:00 GMT+0900 (JST)"));

        components.addDurationAsImplied({ day: 3 });
        expect(components.date()).toStrictEqual(new Date("Mon Mar 3 2025 05:00:00 GMT+0900 (JST)"));
    }
    {
        // Thu Feb 27 2025 17:00:00 GMT+0000
        // Thu Feb 27 2025 09:00:00 GMT-0800 (PST)
        const refInstant = new Date("Thu Feb 27 2025 17:00:00 GMT+0000");
        const reference = ReferenceWithTimezone.fromInput({ instant: refInstant, timezone: "PST" });
        const components = ParsingComponents.createRelativeFromReference(reference);
        components.addDurationAsImplied({ hour: 3 });
        expect(components.date()).toStrictEqual(new Date("Thu Feb 27 2025 12:00:00 GMT-0800 (PST)"));

        components.addDurationAsImplied({ day: 3 });
        expect(components.date()).toStrictEqual(new Date("Mon Mar 2 2025 12:00:00 GMT-0800 (PST)"));
    }
});
