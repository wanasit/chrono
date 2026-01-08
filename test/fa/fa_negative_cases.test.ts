import * as chrono from "../../src";
import { testUnexpectedResult } from "../test_util";

test("Test - Persian Negative Cases - Random Text", () => {
    testUnexpectedResult(chrono.fa, "این یک متن تصادفی است");
    testUnexpectedResult(chrono.fa, "random text in english");
    testUnexpectedResult(chrono.fa, "بدون تاریخ");
    testUnexpectedResult(chrono.fa, "فقط کلمات معمولی");
});

test("Test - Persian Negative Cases - Incomplete Expressions", () => {
    testUnexpectedResult(chrono.fa, "روز");
    testUnexpectedResult(chrono.fa, "ساعت");
    testUnexpectedResult(chrono.fa, "ماه");
    testUnexpectedResult(chrono.fa, "سال");
});

test("Test - Persian Negative Cases - Ambiguous Patterns", () => {
    testUnexpectedResult(chrono.fa, "در");
    testUnexpectedResult(chrono.fa, "تا");
    testUnexpectedResult(chrono.fa, "از");
    testUnexpectedResult(chrono.fa, "به");
});

test("Test - Persian Negative Cases - Non-temporal Words", () => {
    testUnexpectedResult(chrono.fa, "خانه");
    testUnexpectedResult(chrono.fa, "کتاب");
    testUnexpectedResult(chrono.fa, "دانشگاه");
    testUnexpectedResult(chrono.fa, "مدرسه");
});

test("Test - Persian Negative Cases - Numbers Only", () => {
    testUnexpectedResult(chrono.fa, "5");
    testUnexpectedResult(chrono.fa, "10");
    testUnexpectedResult(chrono.fa, "100");
    testUnexpectedResult(chrono.fa, "2024");
});

test("Test - Persian Negative Cases - Partial Matches", () => {
    testUnexpectedResult(chrono.fa, "پیش از");
    testUnexpectedResult(chrono.fa, "بعد از");
    testUnexpectedResult(chrono.fa, "دیگر");
});
