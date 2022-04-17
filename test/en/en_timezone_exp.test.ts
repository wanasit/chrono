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

test("Test - Parsing date/time with numeric offset", () => {
    testSingleCase(chrono, "wednesday, september 16, 2020 at 23.00+14", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(14 * 60);
    });

    testSingleCase(chrono, "wednesday, september 16, 2020 at 23.00+1400", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.isCertain("timezoneOffset")).toBe(true);
        expect(result.start.get("timezoneOffset")).toBe(14 * 60);
    });

    testSingleCase(chrono, "wednesday, september 16, 2020 at 23.00+15", (result, text) => {
        expect(result.text).toBe("wednesday, september 16, 2020 at 23.00");
        expect(result.start.isCertain("timezoneOffset")).toBe(false);
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

    testSingleCase(chrono, "published: 10:30 (gmt-2:30).", (result, text) => {
        expect(result.text).toBe("10:30 (gmt-2:30)");

        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("timezoneOffset")).toBe(-(2 * 60 + 30));
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
    {
        const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");
        const expectedInstant = new Date("Sun Nov 29 2020 14:24:13 GMT+0900 (Japan Standard Time)");

        testSingleCase(chrono, "in 1 hour get eggs and milk", refInstant, (result, text) => {
            expect(result.text).toBe("in 1 hour");
            expect(result.start.get("timezoneOffset")).toBe(-refInstant.getTimezoneOffset());
            expect(result.start).toBeDate(expectedInstant);
        });
    }

    {
        const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");
        const expectedInstant = new Date("Sun Nov 29 2020 14:24:13 GMT+0900 (Japan Standard Time)");

        testSingleCase(chrono, "in 1 hour GMT", refInstant, (result, text) => {
            // expect(result.text).toBe("in 1 hour"); known issue when running test in the GMT time
            expect(result.start).toBeDate(expectedInstant);
        });
    }

    {
        const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");
        const expectedInstant = new Date("Sun Nov 29 2020 14:24:13 GMT+0900 (Japan Standard Time)");

        testSingleCase(chrono, "in 1 hour GMT", { instant: refInstant, timezone: "JST" }, (result, text) => {
            // expect(result.text).toBe("in 1 hour");
            expect(result.start).toBeDate(expectedInstant);
        });
    }

    {
        const refInstant = new Date("Sun Nov 29 2020 13:24:13 GMT+0900 (Japan Standard Time)");
        const expectedInstant = new Date("Sun Nov 29 2020 14:24:13 GMT+0900 (Japan Standard Time)");

        testSingleCase(chrono, "in 1 hour GMT", { instant: refInstant, timezone: "BST" }, (result, text) => {
            // expect(result.text).toBe("in 1 hour");
            expect(result.start).toBeDate(expectedInstant);
        });
    }
});

test("Test - Relative time (Now) is not effected by timezone setting", function () {
    const refInstant = new Date(1637674343000);

    testSingleCase(chrono, "now", { instant: refInstant }, (result) => {
        expect(result.text).toBe("now");
        expect(result.start).toBeDate(refInstant);
    });

    testSingleCase(chrono, "now", { instant: refInstant, timezone: null }, (result) => {
        expect(result.text).toBe("now");
        expect(result.start).toBeDate(refInstant);
    });

    testSingleCase(chrono, "now", { instant: refInstant, timezone: "BST" }, (result) => {
        expect(result.text).toBe("now");
        expect(result.start).toBeDate(refInstant);
    });

    testSingleCase(chrono, "now", { instant: refInstant, timezone: "JST" }, (result) => {
        expect(result.text).toBe("now");
        expect(result.start).toBeDate(refInstant);
    });
});

test("Test - Relative time (2 hour later) is not effected by timezone setting", function () {
    const refInstant = new Date(1637674343000);
    const expectedInstant = new Date(1637674343000 + 2 * 60 * 60 * 1000);

    testSingleCase(chrono, "2 hour later", { instant: refInstant }, (result) => {
        expect(result.text).toBe("2 hour later");
        expect(result.start).toBeDate(expectedInstant);
    });

    testSingleCase(chrono, "2 hour later", { instant: refInstant, timezone: null }, (result) => {
        expect(result.text).toBe("2 hour later");
        expect(result.start).toBeDate(expectedInstant);
    });

    testSingleCase(chrono, "2 hour later", { instant: refInstant, timezone: "BST" }, (result) => {
        expect(result.text).toBe("2 hour later");
        expect(result.start).toBeDate(expectedInstant);
    });

    testSingleCase(chrono, "2 hour later", { instant: refInstant, timezone: "JST" }, (result) => {
        expect(result.text).toBe("2 hour later");
        expect(result.start).toBeDate(expectedInstant);
    });
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
