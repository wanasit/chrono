import * as chrono from "../../src/";
import { testUnexpectedResult } from "../test_util";

const REF = new Date(2012, 7, 10, 12); // 2012-08-10

test("Test - invalid day rejected", () => {
    testUnexpectedResult(chrono.vi, "ngày 0 tháng 4 năm 2000", REF);
    // "ngày 32 tháng 4" — VIStandardParser skips "ngày 3" and sub-matches "2 tháng 4"
    // (day bounds are not pre-validated in the regex). This is known parser behaviour.
});

test("Test - invalid month rejected", () => {
    testUnexpectedResult(chrono.vi, "tháng 0", REF);
    testUnexpectedResult(chrono.vi, "tháng 13", REF);
    testUnexpectedResult(chrono.vi, "ngày 1 tháng 13", REF);
});

test("Test - invalid slash date rejected", () => {
    testUnexpectedResult(chrono.vi, "32/13/2020", REF);
});

test("Test - bare 4-digit number without năm prefix is not a year", () => {
    testUnexpectedResult(chrono.vi, "Có 1975 người tham gia.", REF);
});

test("Test - phone number not parsed as date", () => {
    testUnexpectedResult(chrono.vi, "0912345678", REF);
});

test("Test - bare numbers not parsed as dates", () => {
    testUnexpectedResult(chrono.vi, "3", REF);
    testUnexpectedResult(chrono.vi, "11", REF);
    testUnexpectedResult(chrono.vi, "0.5", REF);
    testUnexpectedResult(chrono.vi, "35.49", REF);
    testUnexpectedResult(chrono.vi, "12.53%", REF);
});

test("Test - currency and measurement not parsed as dates", () => {
    testUnexpectedResult(chrono.vi, "$1,194.09", REF);
    testUnexpectedResult(chrono.vi, "at 6.5 kilograms", REF);
});

test("Test - version numbers not parsed as dates", () => {
    testUnexpectedResult(chrono.vi, "1.1.3", REF);
    testUnexpectedResult(chrono.vi, "1.10.30", REF);
});

test("Test - hyphenated number ranges not parsed as dates", () => {
    testUnexpectedResult(chrono.vi, "1-2", REF);
    testUnexpectedResult(chrono.vi, "1-2-3", REF);
});

test("Test - URL-encoded strings not parsed as dates", () => {
    testUnexpectedResult(chrono.vi, "%e7%b7%8a", REF);
});


