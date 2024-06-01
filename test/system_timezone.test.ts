import * as chrono from "../src/";
import { testSingleCase } from "./test_util";

test("Test - Timezone difference on reference example", function () {
    testSingleCase(
        chrono,
        "Friday at 4pm",
        {
            instant: new Date("Wed Jun 09 2021 07:00:00 GMT-0500 (CDT)"),
            timezone: "CDT",
        },
        (result) => {
            expect(result).toBeDate(new Date("Fri Jun 11 2021 16:00:00 GMT-0500 (CDT)"));
            expect(result).toBeDate(new Date("Fri Jun 12 2021 06:00:00 GMT+0900 (JST)"));
        }
    );
});

test("Test - Timezone difference on default timezone", function () {
    const INPUT = "Friday at 4pm";
    const REF_INSTANT = new Date(2021, 6 - 1, 9, 7, 0, 0);
    const EXPECTED_INSTANT = new Date(2021, 6 - 1, 11, 16, 0, 0);

    testSingleCase(chrono, INPUT, REF_INSTANT, (result) => {
        expect(result).toBeDate(EXPECTED_INSTANT);
    });

    testSingleCase(chrono, INPUT, { instant: REF_INSTANT }, (result) => {
        expect(result).toBeDate(EXPECTED_INSTANT);
    });

    testSingleCase(chrono, INPUT, { instant: REF_INSTANT, timezone: null }, (result) => {
        expect(result).toBeDate(EXPECTED_INSTANT);
    });

    testSingleCase(chrono, INPUT, { instant: REF_INSTANT, timezone: "" }, (result) => {
        expect(result).toBeDate(EXPECTED_INSTANT);
    });
});

test("Test - Timezone difference on reference date", function () {
    // Sun Jun 06 2021 19:00:00 GMT+0900 (JST)
    // Sun Jun 06 2021 11:00:00 GMT+0100 (BST)
    const refInstant = new Date("Sun Jun 06 2021 19:00:00 GMT+0900 (JST)");

    testSingleCase(chrono, "At 4pm tomorrow", { instant: refInstant, timezone: "BST" }, (result) => {
        const expectedInstant = new Date("Mon Jun 07 2021 16:00:00 GMT+0100 (BST)");
        expect(result).toBeDate(expectedInstant);
    });

    testSingleCase(chrono, "At 4pm tomorrow", { instant: refInstant, timezone: "JST" }, (result) => {
        const expectedInstant = new Date("Mon Jun 07 2021 16:00:00 GMT+0900 (JST)");
        expect(result).toBeDate(expectedInstant);
    });
});

test("Test - Timezone difference on reference date #2", function () {
    const refInstant = new Date("2024-02-21T10:00:00+1300");

    testSingleCase(chrono, "yesterday 18:00", { instant: refInstant, timezone: 780 }, (result) => {
        // expect(result.start.get("year")).toBe(2024);
        // expect(result.start.get("month")).toBe(2);
        // expect(result.start.get("day")).toBe(20);
        // expect(result).toBeDate(new Date("2024-02-20T18:00:00+1300"));
    });
});

test("Test - Timezone difference on written date", function () {
    // Sun Jun 06 2021 19:00:00 GMT+0900 (JST)
    // Sun Jun 06 2021 11:00:00 GMT+0100 (BST)
    const refInstant = new Date("Sun Jun 06 2021 19:00:00 GMT+0900 (JST)");

    testSingleCase(chrono, "Sun Jun 06 2021 19:00:00", { timezone: "JST" }, (result) => {
        expect(result).toBeDate(refInstant);
    });

    testSingleCase(chrono, "Sun Jun 06 2021 11:00:00", { timezone: "BST" }, (result) => {
        expect(result).toBeDate(refInstant);
    });

    testSingleCase(chrono, "Sun Jun 06 2021 11:00:00", { timezone: 60 }, (result) => {
        expect(result).toBeDate(refInstant);
    });
});

test("Test - Precise [now] mentioned", function () {
    const refDate = new Date("Sat Mar 13 2021 14:22:14 GMT+0900 (Japan Standard Time)");

    testSingleCase(chrono, "now", refDate, (result) => {
        expect(result).toBeDate(refDate);
    });

    testSingleCase(chrono, "now", { instant: refDate }, (result) => {
        expect(result).toBeDate(refDate);
    });

    testSingleCase(chrono, "now", { instant: refDate, timezone: 540 }, (result) => {
        expect(result).toBeDate(refDate);
    });

    testSingleCase(chrono, "now", { instant: refDate, timezone: "JST" }, (result) => {
        expect(result).toBeDate(refDate);
    });

    testSingleCase(chrono, "now", { instant: refDate, timezone: -300 }, (result) => {
        expect(result).toBeDate(refDate);
    });
});

test("Test - Precise date/time mentioned", function () {
    const text = "Sat Mar 13 2021 14:22:14 GMT+0900";
    const refDate = new Date();

    testSingleCase(chrono, text, refDate, (result, text) => {
        expect(result).toBeDate(new Date(text));
    });

    testSingleCase(chrono, text, { instant: refDate }, (result) => {
        expect(result).toBeDate(new Date(text));
    });

    testSingleCase(chrono, text, { instant: refDate, timezone: 540 }, (result) => {
        expect(result).toBeDate(new Date(text));
    });

    testSingleCase(chrono, text, { instant: refDate, timezone: "JST" }, (result) => {
        expect(result).toBeDate(new Date(text));
    });

    testSingleCase(chrono, text, { instant: refDate, timezone: -300 }, (result) => {
        expect(result).toBeDate(new Date(text));
    });
});
