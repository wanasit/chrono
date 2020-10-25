import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src";

test("Test - Parsing date with UTC offset", function () {
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

test("Test - Parsing date with GMT offset", function () {
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
