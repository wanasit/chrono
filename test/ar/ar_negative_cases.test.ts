import * as chrono from "../../src";
import { testUnexpectedResult } from "../test_util";

const REF = new Date(2023, 5, 15, 12); // 2023-06-15

test("Test - invalid day rejected", () => {
    testUnexpectedResult(chrono.ar, "32 يناير 2023", REF);
});

test("Test - invalid slash date rejected", () => {
    testUnexpectedResult(chrono.ar, "32/13/2020", REF);
});

test("Test - phone numbers not parsed as dates", () => {
    testUnexpectedResult(chrono.ar, "01012345678", REF);
    testUnexpectedResult(chrono.ar, "+966501234567", REF);
});

test("Test - bare numbers and percentages not parsed as dates", () => {
    testUnexpectedResult(chrono.ar, "3", REF);
    testUnexpectedResult(chrono.ar, "11", REF);
    testUnexpectedResult(chrono.ar, "0.5", REF);
    testUnexpectedResult(chrono.ar, "35.49", REF);
    testUnexpectedResult(chrono.ar, "12.53%", REF);
});

test("Test - currency and measurements not parsed as dates", () => {
    testUnexpectedResult(chrono.ar, "1500 جنيه", REF);
    testUnexpectedResult(chrono.ar, "500 ريال", REF);
    testUnexpectedResult(chrono.ar, "$1,194.09", REF);
    testUnexpectedResult(chrono.ar, "6.5 كيلو جرام", REF);
});

test("Test - version numbers not parsed as dates", () => {
    testUnexpectedResult(chrono.ar, "1.1.3", REF);
    testUnexpectedResult(chrono.ar, "1.10.30", REF);
});

test("Test - hyphenated number ranges not parsed as dates", () => {
    testUnexpectedResult(chrono.ar, "1-2", REF);
    testUnexpectedResult(chrono.ar, "1-2-3", REF);
});

test("Test - impossible time rejected", () => {
    testUnexpectedResult(chrono.ar, "الساعة 25:00", REF);
    testUnexpectedResult(chrono.ar, "الساعة 7:65", REF);
});
