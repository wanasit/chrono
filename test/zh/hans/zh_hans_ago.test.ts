import * as chrono from "../../../src";
import { testSingleCase } from "../../test_util";

test("Test - Simplified Chinese Ago Expression", function () {
    testSingleCase(chrono.zh.hans, "1小时前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1小时前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 11, 14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "1小时之前出门了", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1小时之前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 11, 14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "五分钟前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("五分钟前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 9);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "3天前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("3天前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 7, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "2星期前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2星期前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 6, 27, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "半小时前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("半小时前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 11, 44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Ago expression at the beginning of the text", function () {
    // The leading Chinese numeral must not be consumed as a word boundary.
    testSingleCase(chrono.zh.hans, "十五天前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("十五天前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 6, 26, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "二十天前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("二十天前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 6, 21, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "三十分钟前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("三十分钟前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 11, 44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "十天前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("十天前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 6, 31, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});
