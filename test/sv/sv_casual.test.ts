import * as chrono from "../../src/locales/sv";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono, "idag", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
    });

    testSingleCase(chrono, "imorgon", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
    });

    testSingleCase(chrono, "igår", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
    });

    testSingleCase(chrono, "förrgår", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(8);
    });
});

test("Test - Combined Expression", function () {
    testSingleCase(chrono, "idag på morgonen", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);
    });

    // Denna funktionalitet behöver ytterligare utveckling
    // testSingleCase(chrono, "imorgon kväll", new Date(2012, 7, 10), (result) => {
    //     expect(result.start.get("year")).toBe(2012);
    //     expect(result.start.get("month")).toBe(8);
    //     expect(result.start.get("day")).toBe(11);
    //     expect(result.start.get("hour")).toBe(20);
    // });
});
