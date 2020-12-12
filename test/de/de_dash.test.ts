import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Should handle de dayname dd-mm-yy", () => {
    testSingleCase(chrono.de, "30.12.16", (result) => {
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(30);
    });
});

test("Test - Should handle de weekday dd-mm-yy", () => {
    testSingleCase(chrono.de, "Freitag 30.12.16", (result) => {
        expect(result.text).toBe("Freitag 30.12.16");
    });
});
