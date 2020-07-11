import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.casual, "Monday", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Monday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 7, 6, 12));
    });

    testSingleCase(
        chrono.casual,
        "Monday (forward dates only)",
        new Date(2012, 7, 9),
        { forwardDate: true },
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("Monday");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2012);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(13);
            expect(result.start.get("weekday")).toBe(1);

            expect(result.start.isCertain("day")).toBe(false);
            expect(result.start.isCertain("month")).toBe(false);
            expect(result.start.isCertain("year")).toBe(false);
            expect(result.start.isCertain("weekday")).toBe(true);

            expect(result.start).toBeDate(new Date(2012, 7, 13, 12));
        }
    );

    testSingleCase(chrono.casual, "Thursday", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Thursday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    testSingleCase(chrono.casual, "Sunday", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Sunday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 12, 12));
    });

    testSingleCase(chrono.casual, "The Deadline is last Friday...", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("last Friday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 3, 12));
    });

    testSingleCase(chrono.casual, "The Deadline is past Friday...", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("past Friday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 3, 12));
    });

    testSingleCase(chrono.casual, "Let's have a meeting on Friday next week", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(21);
        expect(result.text).toBe("on Friday next week");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2015);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start).toBeDate(new Date(2015, 3, 24, 12));
    });

    testSingleCase(
        chrono.casual,
        "I plan on taking the day off on Tuesday, next week",
        new Date(2015, 3, 18),
        (result) => {
            expect(result.index).toBe(29);
            expect(result.text).toBe("on Tuesday, next week");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2015);
            expect(result.start.get("month")).toBe(4);
            expect(result.start.get("day")).toBe(21);
            expect(result.start.get("weekday")).toBe(2);

            expect(result.start).toBeDate(new Date(2015, 3, 21, 12));
        }
    );
});

test("Test - Weekday With Casual Time", function () {
    testSingleCase(chrono.casual, "Lets meet on Tuesday morning", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("on Tuesday morning");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2015);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(21);
        expect(result.start.get("weekday")).toBe(2);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2015, 3, 21, 6));
    });
});

test("Test - Weekday Overlap", function () {
    testSingleCase(chrono.casual, "Sunday, December 7, 2014", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Sunday, December 7, 2014");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2014);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start).toBeDate(new Date(2014, 12 - 1, 7, 12));
    });

    testSingleCase(chrono.casual, "Sunday 12/7/2014", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Sunday 12/7/2014");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2014);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start).toBeDate(new Date(2014, 12 - 1, 7, 12));
    });
});

test("Test - forward dates only option", function () {
    testSingleCase(
        chrono.casual,
        "this Friday to this Monday",
        new Date(2016, 8 - 1, 4),
        { forwardDate: true },
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("this Friday to this Monday");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2016);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(5);
            expect(result.start.get("weekday")).toBe(5);

            expect(result.start.isCertain("day")).toBe(false);
            expect(result.start.isCertain("month")).toBe(false);
            expect(result.start.isCertain("year")).toBe(false);
            expect(result.start.isCertain("weekday")).toBe(true);

            expect(result.start).toBeDate(new Date(2016, 8 - 1, 5, 12));

            expect(result.end).not.toBeNull();
            expect(result.end.get("year")).toBe(2016);
            expect(result.end.get("month")).toBe(8);
            expect(result.end.get("day")).toBe(8);
            expect(result.end.get("weekday")).toBe(1);

            expect(result.end.isCertain("day")).toBe(false);
            expect(result.end.isCertain("month")).toBe(false);
            expect(result.end.isCertain("year")).toBe(false);
            expect(result.end.isCertain("weekday")).toBe(true);

            expect(result.end).toBeDate(new Date(2016, 8 - 1, 8, 12));
        }
    );
});
