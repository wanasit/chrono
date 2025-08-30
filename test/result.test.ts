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

test("Test - Checking non-existing date during DST skip", () => {
    // Only CET (or CEST) timezones where the DST starts on "Sunday, March 27, 2022" at "02:00 (2 am) local time"
    const dateDstPre = new Date(2022, 3 - 1, 27, 2);
    const dateDstPost = new Date(2022, 3 - 1, 27, 3);
    if (dateDstPre.getTime() == dateDstPost.getTime()) {
        const reference = new ReferenceWithTimezone(new Date());

        // On "Sunday, March 27, 2022" at "02:00 local time", the clock is moved forward to "03:00 local time".
        // Thus, the time between "02:00 and 02:59:59" does not exist.
        expect(
            new ParsingComponents(reference, { year: 2022, month: 3, day: 27, hour: 2, minute: 0 }).isValidDate()
        ).toBe(false);
        expect(
            new ParsingComponents(reference, { year: 2022, month: 3, day: 27, hour: 2, minute: 1 }).isValidDate()
        ).toBe(false);
        expect(
            new ParsingComponents(reference, { year: 2022, month: 3, day: 27, hour: 2, minute: 59 }).isValidDate()
        ).toBe(false);

        // Otherwise, it
        expect(
            new ParsingComponents(reference, { year: 2022, month: 3, day: 27, hour: 1, minute: 59 }).isValidDate()
        ).toBe(true);
        expect(
            new ParsingComponents(reference, { year: 2022, month: 3, day: 27, hour: 3, minute: 0 }).isValidDate()
        ).toBe(true);
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
