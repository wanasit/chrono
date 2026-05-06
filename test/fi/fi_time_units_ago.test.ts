import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.fi, "5 päivää sitten tehtiin jotain", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 päivää sitten");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    testSingleCase(chrono.fi, "10 päivää sitten tehtiin jotain", new Date(2012, 7, 10, 13, 30), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 päivää sitten");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31, 13, 30));
    });

    testSingleCase(chrono.fi, "15 minuuttia sitten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuuttia sitten");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    testSingleCase(chrono.fi, "   12 tuntia sitten", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("12 tuntia sitten");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    testSingleCase(chrono.fi, "12 tuntia sitten tapahtui jotain", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 tuntia sitten");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });
});

test("Test - Single Expression (Casual)", function () {
    testSingleCase(chrono.fi, "5 kuukautta sitten tehtiin jotain", new Date(2012, 10 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 kuukautta sitten");

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 10));
    });

    testSingleCase(chrono.fi, "5 vuotta sitten tehtiin jotain", new Date(2012, 8 - 1, 10, 22, 22), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2007);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 vuotta sitten");

        expect(result.start).toBeDate(new Date(2007, 8 - 1, 10, 22, 22));
    });

    testSingleCase(chrono.fi, "yksi viikkoa sitten tehtiin jotain", new Date(2012, 8 - 1, 3, 8, 34), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe("yksi viikkoa sitten");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 27, 8, 34));
    });
});
