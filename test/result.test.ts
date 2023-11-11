import { ParsingComponents, ParsingResult, ReferenceWithTimezone } from "../src/results";

test("Test - Create & manipulate parsing components", () => {
    const reference = new ReferenceWithTimezone(new Date());
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
