import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

// Reference: 2012-08-10 (Friday) 12:00. Korean weeks start on Monday.

test("Test - Weekday", function () {
    // "금요일에 봐요" = "See you on Friday": the coming Friday, including today
    testSingleCase(chrono.ko, "금요일에 봐요", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("금요일");
        expect(result.start.get("weekday")).toBe(5);
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    // 월요일 = Monday
    testSingleCase(chrono.ko, "월요일", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 13, 12));
    });

    // 화욜 = casual form of 화요일 (Tuesday)
    testSingleCase(chrono.ko, "화욜 저녁 어때", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("화욜");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 14, 12));
    });
});

test("Test - Weekday in a relative week", function () {
    // "다음주 월요일" = Monday of next week. On Friday that is 3 days later.
    testSingleCase(chrono.ko, "다음주 월요일", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 13, 12));
    });

    // "다음주 토요일" = Saturday of next week (not tomorrow)
    testSingleCase(chrono.ko, "다음주 토요일", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 18, 12));
    });

    // "지난주 수요일" = Wednesday of last week (not this week's Wednesday two days ago)
    testSingleCase(chrono.ko, "지난주 수요일", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 1, 12));
    });

    // "이번주 일요일" = Sunday of this week (the week ends on Sunday)
    testSingleCase(chrono.ko, "이번주 일요일", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 12));
    });

    // "담주 월" = casual "next week Mon" (a bare weekday character is allowed after a week word)
    testSingleCase(chrono.ko, "담주 월 2시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("담주 월 2시");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 13, 2));
    });

    // "다음주 금에 보자" = "see you on Fri next week" (에 = on)
    testSingleCase(chrono.ko, "다음주 금에 보자", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("다음주 금");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 17, 12));
    });

    // "다음주 수, 목 가능" = "Wed or Thu next week works"
    testSingleCase(chrono.ko, "다음주 수, 목 가능", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("다음주 수");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 15, 12));
    });
});

test("Test - Negative cases", function () {
    // "일정 공유" = "share the schedule" (일 is not Sunday here)
    testUnexpectedResult(chrono.ko, "일정 공유");
    // "월급" = "monthly salary"; a bare 월 means "month", not Monday
    testUnexpectedResult(chrono.ko, "월급");
    // After a week word, a bare weekday character must not start another word:
    // "다음주 일정" = next week's schedule, "이번주 목표" = this week's goal, "지난주 토론" = last week's discussion
    testUnexpectedResult(chrono.ko, "다음주 일정 공유");
    testUnexpectedResult(chrono.ko, "이번주 목표");
    testUnexpectedResult(chrono.ko, "지난주 토론 정리");
    // ... even with a space: "다음주 일 많아" = lots of work next week, "이번주 목 아파" = sore throat this week,
    // "다음주 화 났어" = got angry next week (화 = anger)
    testUnexpectedResult(chrono.ko, "다음주 일 많아");
    testUnexpectedResult(chrono.ko, "이번주 목 아파");
    testUnexpectedResult(chrono.ko, "다음주 화 났어");
});
