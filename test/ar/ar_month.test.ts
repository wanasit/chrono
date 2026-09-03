import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Arabic Month Names and Dates", () => {
    testSingleCase(chrono.ar.casual, "15 يناير 2023", (result) => {
        expect(result.text).toBe("15 يناير 2023");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono.ar.casual, "١٥ يناير ٢٠٢٣", (result) => {
        expect(result.text).toBe("١٥ يناير ٢٠٢٣");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono.ar.casual, "15 كانون الثاني 2023", (result) => {
        expect(result.text).toBe("15 كانون الثاني 2023");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono.ar.casual, "25 شباط 2024", (result) => {
        expect(result.text).toBe("25 شباط 2024");
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(25);
    });

    testSingleCase(chrono.ar.casual, "في 15 من مارس 2022", (result) => {
        expect(result.text).toBe("في 15 من مارس 2022");
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(15);
    });

    testSingleCase(chrono.ar.casual, "يناير 2025", (result) => {
        expect(result.text).toBe("يناير 2025");
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(chrono.ar.casual, "كانون الأول 2024", (result) => {
        expect(result.text).toBe("كانون الأول 2024");
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(1);
    });
});

test("Test - Arabic Month Date Ranges", () => {
    testSingleCase(chrono.ar.casual, "من 15 إلى 20 يناير 2023", (result) => {
        expect(result.text).toBe("من 15 إلى 20 يناير 2023");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(15);
        expect(result.end.get("year")).toBe(2023);
        expect(result.end.get("month")).toBe(1);
        expect(result.end.get("day")).toBe(20);
    });
});
