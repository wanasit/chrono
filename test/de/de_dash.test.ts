import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Single date expression with dash notation", () => {
    testSingleCase(chrono.de, "30-12-16", (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(30);
    });

    testSingleCase(chrono.de, "Freitag 30-12-16", (result) => {
        expect(result.text).toBe("Freitag 30-12-16");
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(30);
    });
});

test("Test - Single date expression with dot notation", () => {
    testSingleCase(chrono.de, "30.12.16", (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(30);
    });

    testSingleCase(chrono.de, "Freitag 30.12.16", (result) => {
        expect(result.text).toBe("Freitag 30.12.16");
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(30);
    });
});
