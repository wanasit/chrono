import * as chrono from "../../../src";
import { testSingleCase } from "../../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.zh.hans, "星期四", new Date(2016, 9 - 1, 2), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("星期四");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(true);

        const resultDate = result.start.date();
        const expectDate = new Date(2016, 9 - 1, 1, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(
        chrono.zh.hans,
        "礼拜四 (forward dates only)",
        new Date(2016, 9 - 1, 2),
        { forwardDate: true },
        (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe("礼拜四");

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2016);
            expect(result.start.get("month")).toBe(9);
            expect(result.start.get("day")).toBe(8);
            expect(result.start.get("weekday")).toBe(4);

            expect(result.start.isCertain("day")).toBe(false);
            expect(result.start.isCertain("month")).toBe(false);
            expect(result.start.isCertain("year")).toBe(false);
            expect(result.start.isCertain("weekday")).toBe(true);

            const resultDate = result.start.date();
            const expectDate = new Date(2016, 9 - 1, 8, 12);
            expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
        }
    );

    testSingleCase(chrono.zh.hans, "礼拜日", new Date(2016, 9 - 1, 2), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("礼拜日");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("weekday")).toBe(0);

        const resultDate = result.start.date();
        const expectDate = new Date(2016, 9 - 1, 4, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我上个礼拜三在打游戏", new Date(2016, 9 - 1, 2), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("上个礼拜三");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(24);
        expect(result.start.get("weekday")).toBe(3);

        const resultDate = result.start.date();
        const expectDate = new Date(2016, 8 - 1, 24, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我下星期天打游戏", new Date(2016, 9 - 1, 2), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("下星期天");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("weekday")).toBe(0);

        const resultDate = result.start.date();
        const expectDate = new Date(2016, 9 - 1, 4, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - forward dates only option", function () {
    testSingleCase(chrono.zh.hans, "星期六-星期一", new Date(2016, 9 - 1, 2), { forwardDate: true }, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("星期六-星期一");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("weekday")).toBe(6);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(true);

        let resultDate = result.start.date();
        let expectDate = new Date(2016, 9 - 1, 3, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2016);
        expect(result.end.get("month")).toBe(9);
        expect(result.end.get("day")).toBe(5);
        expect(result.end.get("weekday")).toBe(1);

        expect(result.end.isCertain("day")).toBe(false);
        expect(result.end.isCertain("month")).toBe(false);
        expect(result.end.isCertain("year")).toBe(false);
        expect(result.end.isCertain("weekday")).toBe(true);

        resultDate = result.end.date();
        expectDate = new Date(2016, 9 - 1, 5, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});
