import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

// Reference: 2012-08-10 (Friday) 12:00

test("Test - Single Expression", function () {
    // "오늘 만나요" = "Let's meet today"
    testSingleCase(chrono.ko, "오늘 만나요", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("오늘");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    // "내일 회의" = "meeting tomorrow"
    testSingleCase(chrono.ko, "내일 회의", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("내일");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 12));
    });

    // "회의는 내일 오후 3시에 시작합니다" = "The meeting starts tomorrow at 3 PM": the date sits mid-sentence
    testSingleCase(chrono.ko, "회의는 내일 오후 3시에 시작합니다", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.index).toBe(4);
        expect(result.text).toBe("내일 오후 3시");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 15));
    });

    // "다음 미팅은 모레 10시로 잡혔어요" = "The next meeting is set for 10 the day after tomorrow"
    testSingleCase(chrono.ko, "다음 미팅은 모레 10시로 잡혔어요", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.index).toBe(7);
        expect(result.text).toBe("모레 10시");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 10));
    });

    // 모레 = the day after tomorrow
    testSingleCase(chrono.ko, "모레", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 12));
    });

    // 내일모레 reads "tomorrow + the day after tomorrow" but means the day after tomorrow
    testSingleCase(chrono.ko, "내일모레 시간 돼?", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("내일모레");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 12, 12));
    });

    // 글피 = 3 days later
    testSingleCase(chrono.ko, "글피", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 13, 12));
    });

    // 어제 = yesterday
    testSingleCase(chrono.ko, "어제 본 영화", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("어제");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 9, 12));
    });

    // 그저께 = the day before yesterday
    testSingleCase(chrono.ko, "그저께", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 8, 12));
    });
});

test("Test - Casual date with time", function () {
    // "내일 오후 3시에 만나요" = "Let's meet tomorrow at 3 PM"
    testSingleCase(chrono.ko, "내일 오후 3시에 만나요", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("내일 오후 3시");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 15));
    });

    // "내일은 오전 10시" = "tomorrow[topic marker] 10 AM"
    testSingleCase(chrono.ko, "내일은 오전 10시", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("내일은 오전 10시");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 10));
    });
});

test("Test - Negative cases", function () {
    // "내가 낼게" = "I'll pay" (낼 is a verb here, not "tomorrow")
    testUnexpectedResult(chrono.ko, "내가 낼게");
    // "오일 교환" = "oil change"
    testUnexpectedResult(chrono.ko, "오일 교환");
});
