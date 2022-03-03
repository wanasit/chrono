import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    // 5 days ago, we did something
    testSingleCase(chrono.nl, "5 dagen geleden, hebben we wat gedaan", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 dagen geleden");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    // 10 days ago, we did something
    testSingleCase(chrono.nl, "10 dagen geleden, hebben we wat gedaan", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 dagen geleden");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });

    // 15 minute ago
    testSingleCase(chrono.nl, "15 minuten geleden", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuten geleden");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    // 15 minute earlier
    testSingleCase(chrono.nl, "15 minuten eerder", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuten eerder");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    // 15 minute before
    testSingleCase(chrono.nl, "15 minuten voor", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuten voor");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    // 12 hours ago
    testSingleCase(chrono.nl, "   12 uur geleden", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("12 uur geleden");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    // 1h ago
    testSingleCase(chrono.nl, "1u geleden", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1u geleden");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(14);
    });

    // half an hour ago
    testSingleCase(chrono.nl, "   half uur geleden", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("half uur geleden");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(44);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 44));
    });

    // 12 hours ago I did something
    testSingleCase(chrono.nl, "12 uur geleden deed ik iets", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 uur geleden");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    // 12 seconds ago I did something
    testSingleCase(chrono.nl, "12 seconden geleden deed ik iets", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 seconden geleden");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(48);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 48));
    });

    // three seconds ago I did something
    testSingleCase(chrono.nl, "drie seconden geleden deed ik iets", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("drie seconden geleden");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(57);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 57));
    });

    // 5 Days ago, we did something
    testSingleCase(chrono.nl, "5 dagen geleden, hebben we iets gedaan", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 dagen geleden");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    // A days ago, we did something
    testSingleCase(chrono.nl, "Een dag geleden, hebben we wat gedaan", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("Een dag geleden");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 9));
    });

    // a min before
    testSingleCase(chrono.nl, "een minuut geleden", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("een minuut geleden");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13));
    });
});

test("Test - Single Expression (Casual)", function () {
    // 5 months ago, we did something
    testSingleCase(chrono.nl, "5 maanden geleden, hebben we iets gedaan", new Date(2012, 10 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 maanden geleden");

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 10));
    });

    // 5 years ago, we did something
    testSingleCase(chrono.nl, "5 jaar geleden,  hebben we iets gedaan", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2007);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 jaar geleden");

        expect(result.start).toBeDate(new Date(2007, 8 - 1, 10));
    });

    // a week ago, we did something
    testSingleCase(chrono.nl, "een week geleden, hebben we iets gedaan", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe("een week geleden");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 27));
    });

    // a couple of days ago, we did something
    testSingleCase(chrono.nl, "paar dagen geleden, hebben we iets gedaan", new Date(2012, 8 - 1, 2), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("paar dagen geleden");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });
});

test("Test - Nested time ago", function () {
    // 15 hours 29 min ago
    testSingleCase(chrono.nl, "15 uur 29 minuten geleden", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("15 uur 29 minuten geleden");
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(7);
        expect(result.start.get("minute")).toBe(1);
    });

    // 1 day 21 hours ago
    testSingleCase(chrono.nl, "1 dag 21 uur geleden ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("1 dag 21 uur geleden");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(1);
        expect(result.start.get("minute")).toBe(30);
    });

    // 3 min 49 sec ago
    testSingleCase(chrono.nl, "3 min 49 sec geleden ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("3 min 49 sec geleden");
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("minute")).toBe(26);
        expect(result.start.get("second")).toBe(11);
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono, "15 uur 29 min");
    testUnexpectedResult(chrono, "een paar uur");
    testUnexpectedResult(chrono, "5 dagen");
});
