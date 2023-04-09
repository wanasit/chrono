import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src";

test("Test - The normal within expression", () => {
    testSingleCase(chrono, "we have to make something in 5 days.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("in 5 days");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono, "we have to make something in five days.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("in five days");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono, "we have to make something within 10 day", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(26);
        expect(result.text).toBe("within 10 day");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    testSingleCase(chrono, "in 5 minutes", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 5 minutes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono, "wait for 5 minutes", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe("for 5 minutes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono, "within 1 hour", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("within 1 hour");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono, "In 5 minutes I will go home", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 minutes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono, "In 5 minutes A car need to move", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 minutes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono, "In 5 seconds A car need to move", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 seconds");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });

    testSingleCase(chrono, "within half an hour", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("within half an hour");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    testSingleCase(chrono, "within two weeks", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("within two weeks");

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12, 14));
    });

    testSingleCase(chrono, "within a month", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("within a month");

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12, 14));
    });

    testSingleCase(chrono, "within a few months", new Date(2012, 6, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("within a few months");

        expect(result.start).toBeDate(new Date(2012, 9, 10, 12, 14));
    });

    testSingleCase(chrono, "within one year", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("within one year");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono, "within one Year", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("within one Year");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono, "within One year", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("within One year");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono, "In 5 Minutes A car need to move", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 Minutes");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono, "In 5 mins a car need to move", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("In 5 mins");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono, "in a week", new Date(2016, 10 - 1, 1), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono, "In around 5 hours", new Date(2016, 10 - 1, 1, 13), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(18);
    });

    testSingleCase(chrono, "In about ~5 hours", new Date(2016, 10 - 1, 1, 13), (result, text) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(18);
    });
});

test("Test - The within expression with certain keywords", () => {
    testSingleCase(chrono, "In  about 5 hours", new Date(2012, 8 - 1, 10, 12, 49), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(49);
    });

    testSingleCase(chrono, "within around 3 hours", new Date(2012, 8 - 1, 10, 12, 49), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(15);
        expect(result.start.get("minute")).toBe(49);
    });

    testSingleCase(chrono, "In several hours", new Date(2012, 8 - 1, 10, 12, 49), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(19);
        expect(result.start.get("minute")).toBe(49);
    });

    testSingleCase(chrono, "In a couple of days", new Date(2012, 8 - 1, 10, 12, 49), (result, text) => {
        expect(result.text).toBe(text);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(49);
    });
});

test("Test - Single Expression (Implied)", () => {
    testSingleCase(chrono, "within 30 days", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(!result.start.isCertain("year")).not.toBeNull();
        expect(!result.start.isCertain("month")).not.toBeNull();
        expect(!result.start.isCertain("day")).not.toBeNull();
        expect(!result.start.isCertain("hour")).not.toBeNull();
        expect(!result.start.isCertain("minute")).not.toBeNull();
        expect(!result.start.isCertain("second")).not.toBeNull();
    });
});

test("Test - Implied time values", () => {
    testSingleCase(chrono, "in 24 hours", new Date(2020, 7 - 1, 10, 12, 14), (result) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2020);
    });

    testSingleCase(chrono, "in one day", new Date(2020, 7 - 1, 10, 12, 14), (result) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2020);
    });
});

test("Test - Time units' certainty", () => {
    testSingleCase(chrono, "in 2 minute", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(54);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeTruthy();
        expect(result.start.isCertain("hour")).toBeTruthy();
        expect(result.start.isCertain("minute")).toBeTruthy();
    });

    testSingleCase(chrono, "in 2hour", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(16);
        expect(result.start.get("minute")).toBe(52);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeTruthy();
        expect(result.start.isCertain("hour")).toBeTruthy();
        expect(result.start.isCertain("minute")).toBeTruthy();
    });

    testSingleCase(chrono, "in a few year", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2019);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(52);

        expect(result.start.isCertain("month")).toBeFalsy();
        expect(result.start.isCertain("day")).toBeFalsy();
        expect(result.start.isCertain("hour")).toBeFalsy();
        expect(result.start.isCertain("minute")).toBeFalsy();
    });

    testSingleCase(chrono, "within 12 month", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(52);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeFalsy();
        expect(result.start.isCertain("hour")).toBeFalsy();
        expect(result.start.isCertain("minute")).toBeFalsy();
    });

    testSingleCase(chrono, "within 3 days", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(52);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeTruthy();
        expect(result.start.isCertain("hour")).toBeFalsy();
        expect(result.start.isCertain("minute")).toBeFalsy();
    });

    testSingleCase(chrono, "give it 2 months", new Date(2016, 10 - 1, 1, 14, 52), { forwardDate: true }, (result) => {
        expect(result.text).toBe("2 months");
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(52);

        expect(result.start.isCertain("year")).toBeTruthy();
        expect(result.start.isCertain("month")).toBeTruthy();
        expect(result.start.isCertain("day")).toBeFalsy();
        expect(result.start.isCertain("hour")).toBeFalsy();
        expect(result.start.isCertain("minute")).toBeFalsy();
    });
});

test("Test - Strict mode", function () {
    testSingleCase(chrono, "in 2hour", new Date(2016, 10 - 1, 1, 14, 52), (result, text) => {
        expect(result.start.get("hour")).toBe(16);
        expect(result.start.get("minute")).toBe(52);
    });

    testUnexpectedResult(chrono.strict, "in 15m");
    testUnexpectedResult(chrono.strict, "within 5hr");
});
