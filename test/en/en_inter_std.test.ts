import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

describe.each([
    ["casual", chrono.casual],
    ["strict", chrono.strict],
    ["ja", chrono.ja.casual],
    ["zh.hans", chrono.zh.hans.casual],
    ["zh.hant", chrono.zh.hant.casual],
])("ISO fractional seconds (%s)", (_, parser) => {
    test.each([
        ["0", 0],
        ["001", 1],
        ["123", 123],
        ["999", 999],
        ["1", 100],
        ["01", 10],
        ["57", 570],
        ["1234", 123],
        ["9999", 999],
        ["0001", 0],
    ])("converts .%s to %i milliseconds", (fraction, millisecond) => {
        for (const timezone of ["Z", "+05:30", "-05:30", ""]) {
            const timestamp = `2024-08-07T12:34:56.${fraction}${timezone}`;
            const prefix = "Recorded at ";
            const refDate = new Date(2024, 7, 1);
            testSingleCase(parser, `${prefix}${timestamp}.`, refDate, (result) => {
                expect(result.index).toBe(prefix.length);
                expect(result.text).toBe(timestamp);
                expect(result.start.get("second")).toBe(56);
                expect(result.start.get("millisecond")).toBe(millisecond);
                expect(result.start.isCertain("millisecond")).toBe(true);
                expect(result.start.isCertain("timezoneOffset")).toBe(timezone !== "");
                expect(result.start.date().getTime()).toBe(new Date(timestamp).getTime());
            });
        }
    });
});

test("Test - Single Expression", function () {
    testSingleCase(chrono, "Let's finish this before this 2013-2-7.", new Date(2012, 7, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(7);

        const resultDate = result.start.date();
        const expectDate = new Date(2013, 1, 7, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono, "1994-11-05T08:15:30-05:30", new Date(2012, 7, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1994);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(15);
        expect(result.start.get("second")).toBe(30);
        expect(result.start.get("timezoneOffset")).toBe(-330);
        expect(result.text).toBe("1994-11-05T08:15:30-05:30");

        expect(result.start).toBeDate(new Date(784043130000));
    });

    testSingleCase(chrono, "1994-11-05T13:15:30Z", new Date(2012, 7, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1994);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(15);
        expect(result.start.get("second")).toBe(30);
        expect(result.start.get("timezoneOffset")).toBe(0);
        expect(result.text).toBe("1994-11-05T13:15:30Z");

        expect(result.start).toBeDate(new Date(784041330000));
    });

    testSingleCase(chrono, "1994-11-05T13:15:30Z", new Date(2012, 7, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1994);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(15);
        expect(result.start.get("second")).toBe(30);
        expect(result.start.get("timezoneOffset")).toBe(0);
        expect(result.text).toBe("1994-11-05T13:15:30Z");

        expect(result.start).toBeDate(new Date(784041330000));
    });

    testSingleCase(chrono, "- 1994-11-05T13:15:30Z", new Date(2012, 7, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1994);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(15);
        expect(result.start.get("second")).toBe(30);
        expect(result.start.get("timezoneOffset")).toBe(0);

        expect(result.index).toBe(2);
        expect(result.text).toBe("1994-11-05T13:15:30Z");

        expect(result.start).toBeDate(new Date(784041330000));
    });

    testSingleCase(chrono.strict, "2016-05-07T23:45:00.487+01:00", new Date(2012, 7, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("hour")).toBe(23);
        expect(result.start.get("minute")).toBe(45);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(60);

        expect(result.text).toBe("2016-05-07T23:45:00.487+01:00");

        expect(result.start).toBeDate(new Date(1462661100487));
    });
});

test("Test - Single Expression with local timezeon", function () {
    testSingleCase(chrono, "1994-11-05T13:15:30", new Date(2012, 7, 8), (result) => {
        expect(result.text).toBe("1994-11-05T13:15:30");
        expect(result.start.get("year")).toBe(1994);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(15);
        expect(result.start.get("second")).toBe(30);
        expect(result.start.get("millisecond")).toBe(0);

        expect(result.start.isCertain("timezoneOffset")).toBe(false);
        expect(result.start).toBeDate(new Date("1994-11-05T13:15:30"));
    });

    testSingleCase(chrono, "2015-07-31T12:00:00", new Date(2012, 7, 8), (result) => {
        expect(result.text).toBe("2015-07-31T12:00:00");
        expect(result.start.get("year")).toBe(2015);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("millisecond")).toBe(0);

        expect(result.start.isCertain("timezoneOffset")).toBe(false);
        expect(result.start).toBeDate(new Date("2015-07-31T12:00:00"));
    });
});
