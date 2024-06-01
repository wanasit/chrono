import * as chrono from "../../../src";
import { testSingleCase } from "../../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.zh.hant, "五日內我地有d野做", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("五日內");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8 - 1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "5日之內我地有d野做", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5日之內");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(15);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8 - 1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "十日內我地有d野做", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("十日內");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(20);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8 - 1, 20, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "五分鐘後", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("五分鐘後");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "一個鐘之內", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("一個鐘之內");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 13, 14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "5分鐘之後我就收皮", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5分鐘之後");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "係5秒之後你就會收皮", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("5秒之後");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 14, 5);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "半小時之內", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("半小時之內");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 12, 44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "兩個禮拜內答覆我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("兩個禮拜內");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 24, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "1個月之內答覆我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1個月之內");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "幾個月之內答覆我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("幾個月之內");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 10, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "一年內答覆我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("一年內");

        const resultDate = result.start.date();
        const expectDate = new Date(2013, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "1年之內答覆我", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1年之內");

        const resultDate = result.start.date();
        const expectDate = new Date(2013, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});
