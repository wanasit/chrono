import * as chrono from "../../src";
import { testSingleCase, testWithExpectedDate, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", () => {
    testSingleCase(chrono, "She is getting married soon (July 2017).", (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(29);
        expect(result.text).toBe("July 2017");

        expect(result.start).toBeDate(new Date(2017, 7 - 1, 1, 12));
    });

    testSingleCase(chrono, "She is leaving in August.", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(18);
        expect(result.text).toBe("August");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 1, 12));
    });

    testSingleCase(chrono, "I am arriving sometime in August, 2012, probably.", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(1);

        expect(result.index).toBe(26);
        expect(result.text).toBe("August, 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 1, 12));
    });

    testSingleCase(chrono, "August 10, 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("August 10, 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono, "Nov 12, 2011", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2011);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(12);

        expect(result.index).toBe(0);
        expect(result.text).toBe("Nov 12, 2011");

        expect(result.start).toBeDate(new Date(2011, 11 - 1, 12, 12));
    });

    testSingleCase(chrono, "The Deadline is August 10", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(16);
        expect(result.text).toBe("August 10");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono, "The Deadline is August 10 2555 BE", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("August 10 2555 BE");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono, "The Deadline is August 10, 345 BC", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("August 10, 345 BC");

        expect(result.start).toBeDate(new Date(-345, 8 - 1, 10, 12));
    });

    testSingleCase(chrono, "The Deadline is August 10, 8 AD", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("August 10, 8 AD");

        const expectDate = new Date(8, 8 - 1, 10, 12);
        expectDate.setFullYear(8);
        expect(result.start).toBeDate(expectDate);
    });

    testSingleCase(chrono, "The Deadline is Tuesday, January 10", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Tuesday, January 10");

        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono, "Sun, Mar. 6, 2016", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(6);
    });

    testSingleCase(chrono, "Sun, March 6, 2016", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(6);
    });

    testSingleCase(chrono, "Sun., March 6, 2016", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(6);
    });

    testSingleCase(chrono, "Sunday, March 6, 2016", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(6);
    });

    testSingleCase(chrono, "Sunday, March 6, 2016", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(6);
    });

    testSingleCase(chrono, "Sunday, March, 6th 2016", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Sunday, March, 6th 2016");

        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(6);
    });

    testSingleCase(chrono, "Wed, Jan 20th, 2016             ", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Wed, Jan 20th, 2016");

        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(20);
    });
});

test("Test - Single expression with separators", () => {
    testWithExpectedDate(chrono, "August-10, 2012", new Date(2012, 8 - 1, 10, 12, 0));

    testWithExpectedDate(chrono, "August/10, 2012", new Date(2012, 8 - 1, 10, 12, 0));

    testWithExpectedDate(chrono, "August/10/2012", new Date(2012, 8 - 1, 10, 12, 0));

    testWithExpectedDate(chrono, "August-10-2012", new Date(2012, 8 - 1, 10, 12, 0));
});

test("Test - Range expression", () => {
    testSingleCase(chrono, "August 10 - 22, 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("August 10 - 22, 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono, "August 10 to 22, 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("August 10 to 22, 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono, "August 10 - November 12", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("August 10 - November 12");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(11);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 11 - 1, 12, 12));
    });

    testSingleCase(chrono, "Aug 10 to Nov 12", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Aug 10 to Nov 12");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(11);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 11 - 1, 12, 12));
    });

    testSingleCase(chrono, "Aug 10 - Nov 12, 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Aug 10 - Nov 12, 2013");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2013);
        expect(result.end.get("month")).toBe(11);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2013, 11 - 1, 12, 12));
    });

    testSingleCase(chrono, "Aug 10 - Nov 12, 2011", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Aug 10 - Nov 12, 2011");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2011);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2011, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2011);
        expect(result.end.get("month")).toBe(11);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2011, 11 - 1, 12, 12));
    });
});

test("Test - Ordinal Words", () => {
    testSingleCase(chrono, "May eighth, 2010", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("May eighth, 2010");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2010);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono, "May twenty-fourth", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("May twenty-fourth");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(24);
    });

    testSingleCase(chrono, "May eighth - tenth, 2010", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("May eighth - tenth, 2010");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2010);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(8);

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2010);
        expect(result.end.get("month")).toBe(5);
        expect(result.end.get("day")).toBe(10);
    });
});

test("Test - Forward Option", () => {
    testSingleCase(chrono.casual, "January 1st", new Date(2016, 2 - 1, 15), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(chrono.casual, "January 1st", new Date(2016, 2 - 1, 15), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono, "Aug 9, 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Aug 9, 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
    });

    testSingleCase(chrono, "Aug 9 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Aug 9 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
    });
});

test("Test - Impossible Dates (Strict Mode)", () => {
    testUnexpectedResult(chrono.strict, "August 32, 2014");

    testUnexpectedResult(chrono.strict, "February 29, 2014");

    testUnexpectedResult(chrono.strict, "August 32", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.strict, "February 29", new Date(2014, 7, 10));
});
