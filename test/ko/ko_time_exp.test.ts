import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

// Reference: 2012-08-10 (Friday) 12:00. 시 = hour, 분 = minute, 반 = half past, 오전 = AM, 오후 = PM.

test("Test - Single Expression", function () {
    // 오후 3시 = 3 PM
    testSingleCase(chrono.ko, "오후 3시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("오후 3시");
        expect(result.start.get("hour")).toBe(15);
        expect(result.start.get("meridiem")).toBe(chrono.Meridiem.PM);
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 15));
    });

    // 오전 10시 30분 = 10:30 AM
    testSingleCase(chrono.ko, "오전 10시 30분", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 10, 30));
    });

    // 3시 반 = half past 3 (no AM/PM given: kept as 3, meridiem implied rather than certain)
    testSingleCase(chrono.ko, "3시 반", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("3시 반");
        expect(result.start.get("hour")).toBe(3);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(chrono.Meridiem.AM);
        expect(result.start.isCertain("meridiem")).toBe(false);
    });

    // 12시 = 12 o'clock with no AM/PM: implied PM (noon), like other locales
    testSingleCase(chrono.ko, "12시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("meridiem")).toBe(chrono.Meridiem.PM);
        expect(result.start.isCertain("meridiem")).toBe(false);
    });

    // 15시 = 15:00 (24-hour): PM is certain
    testSingleCase(chrono.ko, "15시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start.get("hour")).toBe(15);
        expect(result.start.isCertain("meridiem")).toBe(true);
    });

    // 점심 12시 = 12 at lunchtime (noon), 점심 1시 = 1 PM
    testSingleCase(chrono.ko, "점심 12시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("점심 12시");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("meridiem")).toBe(chrono.Meridiem.PM);
    });
    testSingleCase(chrono.ko, "점심 1시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start.get("hour")).toBe(13);
    });

    // 저녁 7시 = 7 in the evening
    testSingleCase(chrono.ko, "저녁 7시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start.get("hour")).toBe(19);
    });

    // 새벽 2시 = 2 in the early morning
    testSingleCase(chrono.ko, "새벽 2시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start.get("hour")).toBe(2);
        expect(result.start.get("meridiem")).toBe(chrono.Meridiem.AM);
    });

    // 밤 12시 = 12 at night (midnight)
    testSingleCase(chrono.ko, "밤 12시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start.get("hour")).toBe(0);
    });

    // 세 시 = 3 o'clock, written with a native Korean number
    testSingleCase(chrono.ko, "세 시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start.get("hour")).toBe(3);
    });

    // 열두시 반 = half past 12 (native number, no space)
    testSingleCase(chrono.ko, "열두시 반", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(30);
    });
});

test("Test - Negative cases", function () {
    // "2시간" = "2 hours" (a duration, not 2 o'clock)
    testUnexpectedResult(chrono.ko, "2시간 걸려요");
});
