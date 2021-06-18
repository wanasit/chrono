import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Later Expression", function () {
    // 2 days later
    testSingleCase(chrono.nl, "2 dagen later", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2 dagen later");

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 12));
    });

    // 5 minutes later
    testSingleCase(chrono.nl, "5 minuten later", new Date(2012, 7, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 minuten later");

        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 10, 5));
    });

    // 3 week later
    testSingleCase(chrono.nl, "3 weken later", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 weken later");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31, 10, 0));
    });
});

test("Test - From now Expression", () => {
    // 5 days from now, we did something
    testSingleCase(chrono.nl, "5 dagen vanaf nu we hebben iets gedaan", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 dagen vanaf nu");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    // 10 days from now, we did something
    testSingleCase(chrono.nl, "10 dagen vanaf nu we hebben iets gedaan", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 dagen vanaf nu");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    // 15 minute from now
    testSingleCase(chrono.nl, "15 minuten vanaf nu", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuten vanaf nu");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    // 15 minutes earlier
    testSingleCase(chrono.nl, "15 minuten eerder", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuten eerder");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    // 15 minute out
    testSingleCase(chrono.nl, "15 minuten uit", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuten uit");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    //    12 hours from now
    testSingleCase(chrono.nl, "   12 uur vanaf nu", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("12 uur vanaf nu");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 0, 14));
    });

    // half an hour from now
    testSingleCase(chrono.nl, "   half uur vanaf nu", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.text).toBe("half uur vanaf nu");
        expect(result.index).toBe(3);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(44);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    // 12 hours from now I did something
    testSingleCase(chrono.nl, "Over 12 uur heb ik iets gedaan", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Over 12 uur");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 0, 14));
    });

    // 12 seconds from now I did something
    testSingleCase(chrono.nl, "Over 12 seconden heb ik iets gedaan", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Over 12 seconden");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("second")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 12));
    });

    // three seconds from now I did something
    testSingleCase(chrono.nl, "over drie seconden heb ik iets gedaan", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("over drie seconden");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("second")).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 3));
    });

    // 5 Days from now, we did something
    testSingleCase(chrono.nl, "Over 5 dagen hebben we iets gedaan", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("Over 5 dagen");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    // half An hour from now
    testSingleCase(chrono.nl, "   half uur vanaf nu", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("half uur vanaf nu");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(44);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    // A days from now, we did something
    testSingleCase(chrono.nl, "Over een dag hebben we iets gedaan", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.index).toBe(0);
        expect(result.text).toBe("Over een dag");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11));
    });

    // a min out
    testSingleCase(chrono.nl, "een minuutje uit", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("een minuutje uit");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 15));
    });

    // in 1 hour
    testSingleCase(chrono.nl, "in 1 uur", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 1 uur");
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    // in 1.5 hours
    testSingleCase(chrono.nl, "over 1,5 uur", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("over 1,5 uur");
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 10));
    });
});

test("Test - Strict mode", function () {
    // 15 minutes from now
    testSingleCase(chrono.nl.strict, "15 minuten vanaf nu", new Date(2012, 7, 10, 12, 14), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    // 25 minutes later
    testSingleCase(chrono.nl.strict, "25 minuten later", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("25 minuten later");
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 5));
    });
});
