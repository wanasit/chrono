import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Persian Casual Expressions", () => {
    testSingleCase(chrono.fa.casual, "الان", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("الان");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start.get("second")).toBe(10);
        expect(result.start.get("millisecond")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.fa.casual, "امروز", new Date(2012, 7, 10, 14, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("امروز");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 12));
    });

    testSingleCase(chrono.fa.casual, "فردا", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("فردا");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 17, 10));
    });

    testSingleCase(chrono.fa.casual, "دیروز", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("دیروز");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });
});

test("Test - Persian Casual Time", () => {
    testSingleCase(chrono.fa.casual, "صبح", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("صبح");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });

    testSingleCase(chrono.fa.casual, "ظهر", new Date(2012, 7, 10, 8), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("ظهر");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.fa.casual, "عصر", new Date(2012, 7, 10, 8), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("عصر");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(18);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18));
    });
});
