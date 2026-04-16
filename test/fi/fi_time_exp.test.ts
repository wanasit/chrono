import * as chrono from "../../src/locales/fi";
import { testSingleCase } from "../test_util";

test("Test - Time expression", function () {
    testSingleCase(chrono, "klo 15:00", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(15);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono, "kello 8:30", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(30);
    });

    testSingleCase(chrono, "klo 13.00", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
    });
});

test("Test - Time range expression", function () {
    testSingleCase(chrono, "klo 10:00-12:00", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);

        expect(result.end.get("hour")).toBe(12);
        expect(result.end.get("minute")).toBe(0);
    });
});

test("Test - Date and time expression", function () {
    testSingleCase(chrono, "15 elokuuta 2012 klo 14:00", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(0);
    });
});
