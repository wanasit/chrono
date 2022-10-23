import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", () => {
    testSingleCase(chrono.it, "10 agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 agosto 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.it, "3 febb 82", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1982);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(3);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 febb 82");

        expect(result.start).toBeDate(new Date(1982, 2 - 1, 3, 12));
    });

    testSingleCase(chrono.it, "dom 15 sett", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dom 15 sett");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.it, "DOM 15 SETT", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("DOM 15 SETT");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.it, "La scadenza è per il 10 agosto", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(18);
        expect(result.text).toBe("il 10 agosto");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.it, "La scadenza è martedì, 10 gennaio", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("martedì, 10 gennaio");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.it, "La scadenza è mar, 10 gennaio", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("mar, 10 gennaio");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.it, "31 marzo, 2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("31 marzo, 2016");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(31);

        expect(result.start).toBeDate(new Date(2016, 3 - 1, 31, 12));
    });

    testSingleCase(chrono.it, "23 febbraio, 2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("23 febbraio, 2016");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(23);

        expect(result.start).toBeDate(new Date(2016, 2 - 1, 23, 12));
    });
});

test("Test - Single expression with separators", () => {
    testSingleCase(chrono.it, "10-agosto 2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.it, "10-agosto-2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.it, "10/08/2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

    testSingleCase(chrono.it, "10/agosto/2012", new Date(2012, 7, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
    });

//    testSingleCase(chrono.it, "10/08 2012", new Date(2012, 7, 8), (result, text) => {
//        expect(result.text).toBe(text);
//        expect(result).toBeDate(new Date(2012, 8 - 1, 10, 12, 0));
//    });

});

test("Test - Range expression", () => {
    testSingleCase(chrono.it, "10-22 agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10-22 agosto 2012");

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

    testSingleCase(chrono.it, "dal 10 al 22 agosto 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("dal 10 al 22 agosto 2012");

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

    testSingleCase(chrono.it, "10 agosto - 12 settembre", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 agosto - 12 settembre");

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

    testSingleCase(chrono.it, "10 agosto - 12 settembre 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10 agosto - 12 settembre 2013");

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
    testSingleCase(chrono.it, "il 12 di luglio alle 19:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("il 12 di luglio alle 19:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 12, 19, 0));
    });

    testSingleCase(chrono.it, "5 maggio 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 maggio 12:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 5, 12, 0));
    });

    testSingleCase(chrono.it, "7 maggio 11:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("7 maggio 11:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("hour")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 7, 11, 0));
    });
});

test("Test - Ordinal Words", () => {
    testSingleCase(chrono.it, "il primo di maggio", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("il primo di maggio");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(1);
    });

});

test("Test - little endian date followed by time", () => {
    testSingleCase(chrono.it, "24 ottobre, 9:00", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.text).toBe("24 ottobre, 9:00");
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("hour")).toBe(9);
    });

    testSingleCase(chrono.it, "24 ottobre, 21:00", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.text).toBe("24 ottobre, 21:00");
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("hour")).toBe(21);
    });

    testSingleCase(chrono.it, "24 ottobre, 9 pm", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.text).toBe("24 ottobre, 9 pm");
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("hour")).toBe(21);
    });

    testSingleCase(chrono.it, "24 ottobre, 9 p.m.", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.text).toBe("24 ottobre, 9 p.m.");
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("hour")).toBe(21);
    });

    testSingleCase(chrono.it, "24 ottobre 10 in punto", new Date(2017, 7 - 1, 7, 15), (result) => {
        expect(result.text).toBe("24 ottobre 10 in punto");
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("hour")).toBe(10);
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono.it, "03 ago 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("03 ago 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
    });

    testSingleCase(chrono.it, "3 ago 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("3 ago 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
    });

    testSingleCase(chrono.it, "9 ago 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("9 ago 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
    });
});

test("Test - Forward Option", () => {
    testSingleCase(chrono.it.casual, "22-23 febb alle 7 pm", new Date(2016, 3 - 1, 15), (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(19);

        expect(result.end.get("year")).toBe(2016);
        expect(result.end.get("month")).toBe(2);
        expect(result.end.get("day")).toBe(23);
        expect(result.end.get("hour")).toBe(19);
    });

    testSingleCase(chrono.it.casual, "22-23 febb alle 19:00", new Date(2016, 3 - 1, 15), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(22);
        expect(result.start.get("hour")).toBe(19);

        expect(result.end.get("year")).toBe(2017);
        expect(result.end.get("month")).toBe(2);
        expect(result.end.get("day")).toBe(23);
        expect(result.end.get("hour")).toBe(19);
    });

    testSingleCase(chrono.it, "17 agosto 2013 - 19 agosto 2013", (result) => {
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(17);

        expect(result.end.get("year")).toBe(2013);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(19);
    });
});

test("Test - Impossible Dates (Strict Mode)", function () {
    testUnexpectedResult(chrono.it.strict, "32 agosto 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.it.strict, "29 febbraio 2014", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.it.strict, "32 agosto", new Date(2012, 7, 10));

    testUnexpectedResult(chrono.it.strict, "29 febbraio", new Date(2013, 7, 10));
});
