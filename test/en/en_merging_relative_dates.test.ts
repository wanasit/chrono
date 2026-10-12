import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.casual, "2 weeks after yesterday", new Date(2022, 2 - 1, 2), (result) => {
        expect(result.text).toBe("2 weeks after yesterday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(15);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);

        expect(result.start).toBeDate(new Date(2022, 2 - 1, 15, 0));
    });

    testSingleCase(chrono.casual, "2 months before 02/02", new Date(2022, 2 - 1, 2), (result) => {
        expect(result.text).toBe("2 months before 02/02");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(2);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);

        expect(result.start).toBeDate(new Date(2021, 12 - 1, 2, 12));
    });

    testSingleCase(chrono.casual, "2 days after next Friday", new Date(2022, 2 - 1, 2), (result) => {
        expect(result.text).toBe("2 days after next Friday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(13);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);

        expect(result.start).toBeDate(new Date(2022, 2 - 1, 13, 12));
    });
});

// A parsed result must be internally self-consistent: if it reports a certain weekday,
// that weekday has to match the day-of-week of the date it computed. "[weekday] in N weeks"
// used to merge the leading weekday onto a relative-offset date, keeping the original weekday
// while computing the date purely from the offset, so the reported weekday contradicted the
// date (e.g. weekday=Saturday on a date that is a Wednesday).
test("Test - Weekday does not contradict a relative-offset date", () => {
    // Ref date is a Wednesday so "+ N weeks" lands on a Wednesday, never the named weekday.
    const refWednesday = new Date(2026, 6 - 1, 24, 12);

    const cases = ["Saturday in 3 weeks", "Monday in 2 weeks"];
    for (const text of cases) {
        for (const result of chrono.parse(text, refWednesday)) {
            if (result.start.isCertain("weekday")) {
                expect(result.start.get("weekday")).toBe(result.start.date().getDay());
            }
        }
    }
});

test("Test - Relative date after a date keeps the reference timezone", () => {
    // Mar 1 to Mar 15, 2024 crosses the US DST change, so these only fail on a US system timezone
    const reference = { instant: new Date("2024-02-20T12:00:00Z"), timezone: "JST" };
    testSingleCase(chrono, "2 weeks after 2024-03-01", reference, (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date("2024-03-15T12:00:00+09:00"));
    });

    testSingleCase(chrono, "2 weeks after 2024-03-01", new Date(2024, 2 - 1, 20, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2024, 3 - 1, 15, 12));
    });
});
