import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - 'sisällä' (within) expression", () => {
    testSingleCase(chrono.fi, "pitää tehdä jotain 5 päivää sisällä", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("5 päivää sisällä");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15));
    });

    testSingleCase(chrono.fi, "5 minuuttia sisällä", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 minuuttia sisällä");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.fi, "1 tuntia sisällä", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1 tuntia sisällä");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 14));
    });

    testSingleCase(chrono.fi, "2 viikkoa sisällä", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.text).toBe("2 viikkoa sisällä");

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12, 14));
    });
});

test("Test - 'kuluessa' (within/during) expression", () => {
    testSingleCase(chrono.fi, "5 päivää kuluessa", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("5 päivää kuluessa");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono.fi, "yksi vuotta kuluessa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.text).toBe("yksi vuotta kuluessa");

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });
});

test("Test - 'päästä' (from now) expression", () => {
    testSingleCase(chrono.fi, "5 minuuttia päästä", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.text).toBe("5 minuuttia päästä");

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.fi, "3 päivää päästä", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.text).toBe("3 päivää päästä");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
    });

    testSingleCase(chrono.fi, "2 viikkoa päästä", new Date(2016, 10 - 1, 1), (result) => {
        expect(result.text).toBe("2 viikkoa päästä");
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(15);
    });
});
