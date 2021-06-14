import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Parsing date/time with UTC offset", function () {
    testSingleCase(chrono, "wednesday, september 16, 2020 at 11 am utc+02:45 ", (result, text) => {
        expect(result.text).toBe("wednesday, september 16, 2020 at 11 am utc+02:45");

        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(2 * 60 + 45);
    });

    testSingleCase(chrono, "wednesday, september 16, 2020 at 11 am utc+0245 ", (result, text) => {
        expect(result.text).toBe("wednesday, september 16, 2020 at 11 am utc+0245");

        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(2 * 60 + 45);
    });

    testSingleCase(chrono, "wednesday, september 16, 2020 at 11 am utc+02 ", (result, text) => {
        expect(result.text).toBe("wednesday, september 16, 2020 at 11 am utc+02");

        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(2 * 60);
    });
});

test("Test - Parsing date/time with GMT offset", function () {
    testSingleCase(chrono, "wednesday, september 16, 2020 at 11 am GMT -08:45 ", (result, text) => {
        expect(result.text).toBe("wednesday, september 16, 2020 at 11 am GMT -08:45");

        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(-(8 * 60 + 45));
    });

    testSingleCase(chrono, "wednesday, september 16, 2020 at 11 am gmt+02 ", (result, text) => {
        expect(result.text).toBe("wednesday, september 16, 2020 at 11 am gmt+02");

        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(2 * 60);
    });
});

test("Test - Parsing date/time with timezone abbreviation", function () {
    testSingleCase(chrono, "wednesday, september 16, 2020 at 11 am", (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(null);
    });

    testSingleCase(chrono, "wednesday, september 16, 2020 at 11 am JST", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);

        // JST GMT+9:00
        expect(result.start.get("timezoneOffset")).toBe(9 * 60);
    });

    testSingleCase(chrono, "wednesday, september 16, 2020 at 11 am GMT+0900 (JST)", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(0);

        // JST GMT+9:00
        expect(result.start.get("timezoneOffset")).toBe(9 * 60);
    });
});

test("Test - Parsing date with timezone abbreviation", function () {
    testSingleCase(chrono, "Wednesday, September 16, 2020, EST", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("timezoneOffset")).toBe(-300);
    });
});

test("Test - Not parsing timezone from relative time", function () {
    const refDate = new Date(2020, 11 - 1, 14, 13, 48, 22);

    testSingleCase(chrono, "in 1 hour get eggs and milk", refDate, (result, text) => {
        expect(result.text).toBe("in 1 hour");
        expect(result.start.get("timezoneOffset")).toBe(-refDate.getTimezoneOffset());
    });

    // This test fail when the system/assume timezone is exactly similar to the mentioned timezone
    // Temporary disable this test

    // testSingleCase(chrono, "in 3 hours GMT", refDate, (result, text) => {
    //     expect(result.text).toBe("in 3 hours");
    //     expect(result.start.get("timezoneOffset")).toBe(-refDate.getTimezoneOffset());
    // });
});

test("Test - Parsing timezone from relative date when valid", function () {
    const refDate = new Date(2020, 11 - 1, 14, 13, 48, 22);

    testSingleCase(chrono, "in 1 day get eggs and milk", refDate, (result, text) => {
        expect(result.text).toBe("in 1 day");
        expect(result.start.get("timezoneOffset")).toBe(-refDate.getTimezoneOffset());
    });

    testSingleCase(chrono, "in 1 day GET", refDate, (result, text) => {
        expect(result.text).toBe("in 1 day GET");
        expect(result.start.get("timezoneOffset")).toBe(240);
    });

    testSingleCase(chrono, "today EST", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("timezoneOffset")).toBe(-300);
    });

    testSingleCase(chrono, "next week EST", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("timezoneOffset")).toBe(-300);
    });
});
