import * as chrono from "../../../src";
import { testSingleCase } from "../../test_util";

test("Test - Traditional Chinese Ago Expression", function () {
    testSingleCase(chrono.zh.hant, "1小時前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1小時前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 11, 14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "1小時之前出門了", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1小時之前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 11, 14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "五分鐘前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("五分鐘前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 9);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "3天前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("3天前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 7, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "2禮拜前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2禮拜前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 6, 27, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "半小時前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("半小時前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 11, 44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Ago expression at the beginning of the text", function () {
    // The leading Chinese numeral must not be consumed as a word boundary.
    testSingleCase(chrono.zh.hant, "十五天前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("十五天前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 6, 26, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "二十天前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("二十天前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 6, 21, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "三十分鐘前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("三十分鐘前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 11, 44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "十天前", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("十天前");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 6, 31, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});
