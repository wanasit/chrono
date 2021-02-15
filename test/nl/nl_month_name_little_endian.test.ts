import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single expression", () => {
    testSingleCase(chrono.nl, "10 augustus 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 augustus 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.nl, "3 februari 82", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1982);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(3);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 februari 82");

        expect(result.start).toBeDate(new Date(1982, 2 - 1, 3, 12));
    });

    testSingleCase(chrono.nl, "10 augustus 234 voor Christus", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 augustus 234 voor Christus");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(-234);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(-234, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.nl, "10 augustus 88 na Christus", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 augustus 88 na Christus");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.nl, "Zon 15 Sept", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Zon 15 Sept");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.nl, "ZON 15 SEPT", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ZON 15 SEPT");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.nl, "De deadline is 10 augustus", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("10 augustus");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.nl, "De deadline is dinsdag, 10 januari", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("dinsdag, 10 januari");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.nl, "De deadline is di, 10 januari", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("di, 10 januari");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.nl, "31ste maart 2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("31ste maart 2016");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(31);

        expect(result.start).toBeDate(new Date(2016, 3 - 1, 31, 12));
    });

    testSingleCase(chrono.nl, "23ste februari 2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("23ste februari 2016");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(23);

        expect(result.start).toBeDate(new Date(2016, 2 - 1, 23, 12));
    });
});

test("Test - Range expression", () => {
    testSingleCase(chrono.nl, "10 - 22 augustus 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 - 22 augustus 2012");

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

    testSingleCase(chrono.nl, "10 tot 22 augustus 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 tot 22 augustus 2012");

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

    testSingleCase(chrono.nl, "10 augustus - 12 september", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 augustus - 12 september");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 9 - 1, 12, 12));
    });

    testSingleCase(chrono.nl, "10 augustus - 12 september 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 augustus - 12 september 2013");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2013);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2013, 9 - 1, 12, 12));
    });
});

test("Test - Combined expression", () => {
    testSingleCase(chrono.nl, "12de juli om 19:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12de juli om 19:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 12, 19, 0));
    });

    testSingleCase(chrono.nl, "5 mei 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 mei 12:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 5, 12, 0));
    });

    testSingleCase(chrono.nl, "7 mei 11:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("7 mei 11:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("hour")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 7, 11, 0));
    });
});

test("Test - Ordinal Words", () => {
    testSingleCase(chrono.nl, "vierentwintigste mei", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("vierentwintigste mei");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(24);
    });

    testSingleCase(chrono.nl, "achtste tot elfde mei 2010", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("achtste tot elfde mei 2010");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2010);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(8);

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2010);
        expect(result.end.get("month")).toBe(5);
        expect(result.end.get("day")).toBe(11);
    });
});

test("Test - little endian date followed by time", () => {
    testSingleCase(chrono.nl, "24ste oktober, 9:00", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.text).toBe("24ste oktober, 9:00");
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("hour")).toBe(9);
    });

    testSingleCase(chrono.nl, "24ste oktober, 21:00", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.text).toBe("24ste oktober, 21:00");
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("hour")).toBe(21);
    });

    testSingleCase(chrono.nl, "24 oktober, 21:00", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.text).toBe("24 oktober, 21:00");
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("hour")).toBe(21);
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono.nl, "03 aug 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("03 aug 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
    });

    testSingleCase(chrono.nl, "3 aug 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("3 aug 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
    });

    testSingleCase(chrono.nl, "9 aug 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("9 aug 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
    });
});

test("Test - Forward Option", () => {
    testSingleCase(chrono.nl, "22-23 februari om 19:00", new Date(2016, 3 - 1, 15), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(19);

        expect(result.end.get("year")).toBe(2016);
        expect(result.end.get("month")).toBe(2);
        expect(result.end.get("day")).toBe(23);
        expect(result.end.get("hour")).toBe(19);
    });

    testSingleCase(chrono.nl, "22-23 februari om 19:00", new Date(2016, 3 - 1, 15), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(19);

        expect(result.end.get("year")).toBe(2017);
        expect(result.end.get("month")).toBe(2);
        expect(result.end.get("day")).toBe(23);
        expect(result.end.get("hour")).toBe(19);
    });
});
