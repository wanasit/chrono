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

    testSingleCase(chrono.casual, "Let's have a meeting on Friday next week", new Date("Sat Apr 18 2015"), (result) => {
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

test("Test - Weekday casual `This` guessing", function () {
    testSingleCase(chrono.casual, "This Saturday", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.casual, "This Sunday", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.casual, "This Wednesday", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.casual, "This Saturday", new Date("Sun Aug 7 2022"), (result) => {
        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.casual, "This Sunday", new Date("Sun Aug 7 2022"), (result) => {
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.casual, "This Wednesday", new Date("Sun Aug 7 2022"), (result) => {
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });
});

test("Test - Weekday casual `Last` guessing", function () {
    testSingleCase(chrono.casual, "Last Saturday", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.casual, "Last Sunday", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(31);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2022);
    });

    testSingleCase(chrono.casual, "Last Wednesday", new Date("Tue Aug 2 2022"), (result) => {
        expect(result.start.get("day")).toBe(27);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("year")).toBe(2022);
    });
});

test("Test - Weekday casual `Next` guessing", function () {
    {
        const refDate = new Date("Tue Aug 2 2022");
        testSingleCase(chrono.casual, "Next Saturday", refDate, (result) => {
            expect(result.start.get("day")).toBe(13);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
        testSingleCase(chrono.casual, "Next Sunday", refDate, (result) => {
            expect(result.start.get("day")).toBe(14);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
        testSingleCase(chrono.casual, "Next Wednesday", refDate, (result) => {
            expect(result.start.get("day")).toBe(10);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
    }
    {
        const refDate = new Date("Saturday Aug 6 2022");
        testSingleCase(chrono.casual, "Next Saturday", refDate, (result) => {
            expect(result.start.get("day")).toBe(13);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
        testSingleCase(chrono.casual, "Next Sunday", refDate, (result) => {
            expect(result.start.get("day")).toBe(14);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
        testSingleCase(chrono.casual, "Next Wednesday", refDate, (result) => {
            expect(result.start.get("day")).toBe(10);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
    }
    {
        const refDate = new Date("Sun Aug 7 2022");
        testSingleCase(chrono.casual, "Next Saturday", refDate, (result) => {
            expect(result.start.get("day")).toBe(13);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
        testSingleCase(chrono.casual, "Next Sunday", refDate, (result) => {
            expect(result.start.get("day")).toBe(14);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
        testSingleCase(chrono.casual, "Next Wednesday", refDate, (result) => {
            expect(result.start.get("day")).toBe(10);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("year")).toBe(2022);
        });
    }
});

test("Test - Casual 'weekend' and 'weekday'", () => {
    {
        const refDateOnFriday = new Date(2024, 10 - 1, 18, 12, 0);
        testSingleCase(chrono.casual, "last weekend", refDateOnFriday, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date(2024, 10 - 1, 13, 12)); // Sunday
        });
        testSingleCase(chrono.casual, "this weekend", refDateOnFriday, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date(2024, 10 - 1, 19, 12)); // Saturday
        });
        testSingleCase(chrono.casual, "next weekend", refDateOnFriday, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date(2024, 10 - 1, 26, 12)); // Saturday
        });
    }
});

test("Test - Casual 'weekday' mentioning", () => {
    {
        const refDateOnFriday = new Date(2024, 10 - 1, 18, 12, 0);
        testSingleCase(chrono.casual, "last weekday", refDateOnFriday, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date(2024, 10 - 1, 17, 12)); // Thursday
        });
        testSingleCase(chrono.casual, "next weekday", refDateOnFriday, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date(2024, 10 - 1, 21, 12)); // Monday
        });
    }
    {
        const refDateOnSaturday = new Date(2024, 10 - 1, 19, 12, 0);
        testSingleCase(chrono.casual, "last weekday", refDateOnSaturday, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date(2024, 10 - 1, 18, 12)); // Friday
        });
        testSingleCase(chrono.casual, "next weekday", refDateOnSaturday, (result, text) => {
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date(2024, 10 - 1, 21, 12)); // Monday
        });
    }
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

test("Test - Weekday range", () => {
    testSingleCase(chrono.casual, "Friday to Monday", new Date(2023, 4 - 1, 9) /*Sunday*/, (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.end.get("year")).toBe(2023);
        expect(result.end.get("month")).toBe(4);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("weekday")).toBe(1);
    });

    testSingleCase(chrono.casual, "Monday to Friday", new Date(2023, 4 - 1, 9) /*Sunday*/, (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(4);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.end.get("year")).toBe(2023);
        expect(result.end.get("month")).toBe(4);
        expect(result.end.get("day")).toBe(14);
        expect(result.end.get("weekday")).toBe(5);
    });
});

test("Test - Weekday 'of next/last/this week' connector", function () {
    // Ref date is a Tuesday — the same weekday as most test targets below.
    // Before the fix, 'Tuesday of next week' silently dropped the modifier and
    // resolved to today (0 days forward) instead of +7 days.
    const refDate = new Date("Tue Aug 2 2022");

    // --- of next week ---

    testSingleCase(chrono.casual, "Tuesday of next week", refDate, (result) => {
        expect(result.text).toBe("Tuesday of next week");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9); // Aug 9 — NOT today (Aug 2)
        expect(result.start.get("weekday")).toBe(2);
        expect(result.start).toBeDate(new Date(2022, 7, 9, 12));
    });

    testSingleCase(chrono.casual, "Friday of next week", refDate, (result) => {
        expect(result.text).toBe("Friday of next week");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12); // Aug 12
        expect(result.start.get("weekday")).toBe(5);
        expect(result.start).toBeDate(new Date(2022, 7, 12, 12));
    });

    testSingleCase(chrono.casual, "Monday of next week", refDate, (result) => {
        expect(result.text).toBe("Monday of next week");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(8); // Aug 8
        expect(result.start.get("weekday")).toBe(1);
        expect(result.start).toBeDate(new Date(2022, 7, 8, 12));
    });

    // --- of last week ---

    testSingleCase(chrono.casual, "Tuesday of last week", refDate, (result) => {
        expect(result.text).toBe("Tuesday of last week");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(26); // Jul 26
        expect(result.start.get("weekday")).toBe(2);
        expect(result.start).toBeDate(new Date(2022, 6, 26, 12));
    });

    testSingleCase(chrono.casual, "Friday of last week", refDate, (result) => {
        expect(result.text).toBe("Friday of last week");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(29); // Jul 29
        expect(result.start.get("weekday")).toBe(5);
        expect(result.start).toBeDate(new Date(2022, 6, 29, 12));
    });

    // --- of this week ---

    testSingleCase(chrono.casual, "Wednesday of this week", refDate, (result) => {
        expect(result.text).toBe("Wednesday of this week");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3); // Aug 3
        expect(result.start.get("weekday")).toBe(3);
        expect(result.start).toBeDate(new Date(2022, 7, 3, 12));
    });

    testSingleCase(chrono.casual, "Tuesday of this week", refDate, (result) => {
        expect(result.text).toBe("Tuesday of this week");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(2); // Aug 2 — same day as ref
        expect(result.start.get("weekday")).toBe(2);
        expect(result.start).toBeDate(new Date(2022, 7, 2, 12));
    });

    // --- with time: merges into a single result (the original bug produced two) ---

    testSingleCase(chrono.casual, "Tuesday of next week after 2pm", refDate, (result) => {
        expect(result.text).toBe("Tuesday of next week after 2pm");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9); // Aug 9
        expect(result.start.get("hour")).toBe(14);
        expect(result.start).toBeDate(new Date(2022, 7, 9, 14));
    });

    testSingleCase(chrono.casual, "Friday of next week at 9am", refDate, (result) => {
        expect(result.text).toBe("Friday of next week at 9am");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12); // Aug 12
        expect(result.start.get("hour")).toBe(9);
        expect(result.start).toBeDate(new Date(2022, 7, 12, 9));
    });

    // --- in sentence context ---

    testSingleCase(chrono.casual, "Let's sync on Tuesday of next week", refDate, (result) => {
        expect(result.text).toBe("on Tuesday of next week");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("year")).toBe(2022);
    });
});

test("Test - forward dates only option", () => {
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

    testSingleCase(
        chrono.casual,
        "sunday morning",
        new Date("August 15, 2021, 20:00"),
        { forwardDate: true },
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("sunday morning");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2021);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(22);
            expect(result.start.get("weekday")).toBe(0);

            expect(result.start.isCertain("day")).toBe(false);
            expect(result.start.isCertain("month")).toBe(false);
            expect(result.start.isCertain("year")).toBe(false);
            expect(result.start.isCertain("weekday")).toBe(true);

            expect(result.start).toBeDate(new Date(2021, 8 - 1, 22, 6));
        }
    );

    testSingleCase(
        chrono.casual,
        "vacation monday - friday",
        new Date("thursday 13 June 2019"),
        { forwardDate: true },
        (result) => {
            expect(result.text).toBe("monday - friday");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2019);
            expect(result.start.get("month")).toBe(6);
            expect(result.start.get("day")).toBe(17);

            expect(result.end).not.toBeNull();
            expect(result.end.get("year")).toBe(2019);
            expect(result.end.get("month")).toBe(6);
            expect(result.end.get("day")).toBe(21);
        }
    );

    testSingleCase(
        chrono.casual,
        "timeoff monday 7 to 9am",
        new Date("thursday 13 June 2019"),
        { forwardDate: true },
        (result) => {
            expect(result.text).toBe("monday 7 to 9am");

            expect(result.start.get("year")).toBe(2019);
            expect(result.start.get("month")).toBe(6);
            expect(result.start.get("day")).toBe(17);

            expect(result.end.get("year")).toBe(2019);
            expect(result.end.get("month")).toBe(6);
            expect(result.end.get("day")).toBe(17);
        }
    );
});
