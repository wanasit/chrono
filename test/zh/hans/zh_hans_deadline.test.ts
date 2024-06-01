import * as chrono from "../../../src";
import { testSingleCase } from "../../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.zh.hans, "五日内我要通关游戏", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("五日内");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8 - 1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "5日之内我要通关游戏", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5日之内");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8 - 1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "十日内我要通关游戏", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("十日内");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8 - 1, 20, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "五分钟后", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("五分钟后");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "一个钟之内", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("一个钟之内");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 13, 14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "5分钟之后出门", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5分钟之后");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我要5秒之后出门", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(2);
        expect(result.text).toBe("5秒之后");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 14, 5);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "半小时之内", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("半小时之内");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "两个礼拜内答复我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("两个礼拜内");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 24, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "1个月之内答复我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1个月之内");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "几个月之内答复我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("几个月之内");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 10, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "一年内答复我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("一年内");

        const resultDate = result.start.date();
        const expectDate = new Date(2013, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "1年之内答复我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1年之内");

        const resultDate = result.start.date();
        const expectDate = new Date(2013, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});
