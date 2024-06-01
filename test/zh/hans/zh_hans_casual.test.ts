import * as chrono from "../../../src";
import { testSingleCase } from "../../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.zh.hans, "我今天要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("今天");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我明日要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("明日");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 11, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我明天要打游戏", new Date(2012, 7, 10, 1), (result) => {
        // Say.."Tomorrow" in the late night (1 AM)
        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我后天凌晨要打游戏", new Date(2012, 7, 10, 0, 0), (result) => {
        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 12, 0, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我大前天凌晨要打游戏", new Date(2012, 7, 10, 0, 0), (result) => {
        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 7, 0, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我昨日要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("昨日");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 9, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我昨天晚上要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("昨天晚上");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(22);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 9, 22);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我今天早上要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("今天早上");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 6);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我下午要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("下午");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(15);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 15);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我今晚要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("今晚");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(22);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 22);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Combined Expression", function () {
    testSingleCase(chrono.zh.hans, "我今天下午5点要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("今天下午5点");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(17);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 17);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Casual date range", function () {
    testSingleCase(chrono.zh.hans, "我今天 - 下周五要打游戏", new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("今天 - 下周五");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("hour")).toBe(12);

        const resultStartDate = result.start.date();
        const expectStartDate = new Date(2012, 7, 4, 12);
        expect(resultStartDate.getTime()).toBeCloseTo(expectStartDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(12);

        const resultEndDate = result.end.date();
        const expectEndDate = new Date(2012, 7, 10, 12);
        expect(expectEndDate.getTime()).toBeCloseTo(resultEndDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我今日 - 下周五要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("今日 - 下周五");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);

        const resultStartDate = result.start.date();
        const expectStartDate = new Date(2012, 7, 10, 12);
        expect(expectStartDate.getTime()).toBeCloseTo(resultStartDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(17);
        expect(result.end.get("hour")).toBe(12);

        const resultEndDate = result.end.date();
        const expectEndDate = new Date(2012, 7, 17, 12);
        expect(expectEndDate.getTime()).toBeCloseTo(resultEndDate.getTime());
    });
});

test("Test - Random text", function () {
    testSingleCase(chrono.zh.hans, "今日夜晚", new Date(2012, 1 - 1, 1, 12), (result) => {
        expect(result.text).toBe("今日夜晚");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.zh.hans, "今晚8点正", new Date(2012, 1 - 1, 1, 12), (result) => {
        expect(result.text).toBe("今晚8点正");
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.zh.hans, "晚上8点", new Date(2012, 1 - 1, 1, 12), (result) => {
        expect(result.text).toBe("晚上8点");
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.zh.hans, "星期四", new Date(), (result) => {
        expect(result.text).toBe("星期四");
        expect(result.start.get("weekday")).toBe(4);
    });
});
