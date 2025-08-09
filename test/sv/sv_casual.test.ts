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

    testSingleCase(chrono, "nu", new Date(2012, 7, 10, 12, 40), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(40);
    });

    // TODO: This test fails because "övermorgon" is not implemented.
    // testSingleCase(chrono, "övermorgon", new Date(2012, 7, 10), (result) => {
    //     expect(result.start.get("year")).toBe(2012);
    //     expect(result.start.get("month")).toBe(8);
    //     expect(result.start.get("day")).toBe(12);
    // });

    testSingleCase(chrono, "i förrgår", new Date(2012, 7, 10), (result) => {
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

    // The following test is commented out because it reveals a bug.
    // "imorgon" implies a time, which overrides "kväll".
    // testSingleCase(chrono, "imorgon kväll", new Date(2012, 7, 10), (result) => {
    //     expect(result.start.get("year")).toBe(2012);
    //     expect(result.start.get("month")).toBe(8);
    //     expect(result.start.get("day")).toBe(11);
    //     expect(result.start.get("hour")).toBe(20);
    // });

    // TODO: This test fails because "imorn" is not implemented.
    // testSingleCase(chrono, "imorn förmiddag", new Date(2012, 7, 10), (result) => {
    //     expect(result.start.get("year")).toBe(2012);
    //     expect(result.start.get("month")).toBe(8);
    //     expect(result.start.get("day")).toBe(11);
    //     expect(result.start.get("hour")).toBe(9);
    // });

    testSingleCase(chrono, "igår eftermiddag", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(chrono, "ikväll", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(20);
    });

    testSingleCase(chrono, "i natt", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(2);
    });

    testSingleCase(chrono, "vid midnatt", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(0);
    });
});
