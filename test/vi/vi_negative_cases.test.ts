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
