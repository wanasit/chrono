import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";
import { Meridiem } from "../../src/";

test("Test - Later Expression", function () {
    testSingleCase(chrono.de, "2 Tage später", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);

        expect(result.index).toBe(0);
        expect(result.text).toBe("2 Tage später");

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 12));
    });

    testSingleCase(chrono.de, "5 Minuten später", new Date(2012, 7, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 Minuten später");

        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 10, 5));
    });

    testSingleCase(chrono.de, "3 Wochen später", new Date(2012, 7 - 1, 10, 10, 0), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("3 Wochen später");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31, 10, 0));
    });
});

test("Test - From now Expression", () => {
    testSingleCase(chrono.de, "in 5 Tagen, werden wir was tun", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.index).toBe(0);
        expect(result.text).toBe("in 5 Tagen");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.de, "in 10 Tagen, we did something", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        expect(result.index).toBe(0);
        expect(result.text).toBe("in 10 Tagen");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 20));
    });

    testSingleCase(chrono.de, "in 15 Minuten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 15 Minuten");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.de, "nach 15 Minuten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("nach 15 Minuten");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
    });

    testSingleCase(chrono.de, "ab jetzt in drei Sekunden geht es los", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ab jetzt in drei Sekunden");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
        expect(result.start.get("second")).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 3));
    });

    testSingleCase(chrono.de, "eine Minute ab jetzt", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("eine Minute ab jetzt");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 15));
    });

    testSingleCase(chrono.de, "in 1 Stunde", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 1 Stunde");
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono.de, "in 1,5 Stunden", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("in 1,5 Stunden");
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 10));
    });
});

// test("Test - Strict mode", function () {
//     testSingleCase(chrono.de.strict, "15 Minuten ab jetzt", new Date(2012, 7, 10, 12, 14), (result, text) => {
//         expect(result.text).toBe(text);
//         expect(result.start.get("hour")).toBe(12);
//         expect(result.start.get("minute")).toBe(29);
//
//         expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 29));
//     });
//
//     testSingleCase(chrono.de.strict, "25 Minuten später", new Date(2012, 7, 10, 12, 40), (result) => {
//         expect(result.index).toBe(0);
//         expect(result.text).toBe("25 Minuten später");
//         expect(result.start.get("hour")).toBe(13);
//         expect(result.start.get("minute")).toBe(5);
//
//         expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 5));
//     });
// });
