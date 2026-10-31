import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

// Reference: 2012-08-10 (Friday) 12:00. 년 = year, 월 = month, 일 = day.

test("Test - Single Expression", function () {
    // "2012년 8월 15일" = Aug 15, 2012
    testSingleCase(chrono.ko, "2012년 8월 15일", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("2012년 8월 15일");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);
    });

    // "8월 15일 광복절" = "Aug 15, Liberation Day" (year implied from the reference)
    testSingleCase(chrono.ko, "8월 15일 광복절", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("8월 15일");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15, 12));
    });

    // Spaces are often omitted in chats: "8월15일"
    testSingleCase(chrono.ko, "8월15일", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15, 12));
    });

    // "8월 15일 오후 7시" = Aug 15, 7 PM
    testSingleCase(chrono.ko, "8월 15일 오후 7시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("8월 15일 오후 7시");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15, 19));
    });
});

test("Test - Range Expression", function () {
    // "11월 1일부터 11월 3일까지" = "from Nov 1 until Nov 3" (부터 = from, 까지 = until)
    testSingleCase(chrono.ko, "11월 1일부터 11월 3일까지 휴가", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("11월 1일부터 11월 3일");
        expect(result.start).toBeDate(new Date(2012, 11 - 1, 1, 12));
        expect(result.end).toBeDate(new Date(2012, 11 - 1, 3, 12));
    });

    // "월요일~금요일" = Monday–Friday
    testSingleCase(chrono.ko, "월요일~금요일", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 13, 12));
        expect(result.end).toBeDate(new Date(2012, 8 - 1, 17, 12));
    });
});
