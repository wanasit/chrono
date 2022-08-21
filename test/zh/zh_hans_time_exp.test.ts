import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.zh.hans, "我上午6点13分打游戏", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("上午6点13分");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(13);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 6, 13);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我后天凌晨打游戏", new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("后天凌晨");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 12, 0, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我大前天凌晨打游戏", new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("大前天凌晨");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 7, 0, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "我明天上午8点要打游戏", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("明天上午8点");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(8);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 11, 8);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Range Expression", function () {
    testSingleCase(chrono.zh.hans, "我从今早八点十分至下午11点32分打游戏", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("从今早八点十分至下午11点32分");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(10);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("hour")).toBe(true);
        expect(result.start.isCertain("minute")).toBe(true);
        expect(result.start.isCertain("second")).toBe(false);
        expect(result.start.isCertain("millisecond")).toBe(false);

        let resultDate = result.start.date();
        let expectDate = new Date(2012, 7, 10, 8, 10);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(23);
        expect(result.end.get("minute")).toBe(32);

        expect(result.end.isCertain("day")).toBe(false);
        expect(result.end.isCertain("month")).toBe(false);
        expect(result.end.isCertain("year")).toBe(false);
        expect(result.end.isCertain("hour")).toBe(true);
        expect(result.end.isCertain("minute")).toBe(true);
        expect(result.end.isCertain("second")).toBe(false);
        expect(result.end.isCertain("millisecond")).toBe(false);

        resultDate = result.end.date();
        expectDate = new Date(2012, 7, 10, 23, 32);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hans, "6点30pm-11点pm", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("6点30pm-11点pm");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(1);

        let resultDate = result.start.date();
        let expectDate = new Date(2012, 7, 10, 18, 30);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(23);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);

        resultDate = result.end.date();
        expectDate = new Date(2012, 7, 10, 23, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Date + Time Expression", function () {
    testSingleCase(
        chrono.zh.hans,
        "我二零一八年十一月二十六日下午三点半五十九秒打游戏",
        new Date(2012, 7, 10),
        (result) => {
            expect(result.index).toBe(1);
            expect(result.text).toBe("二零一八年十一月二十六日下午三点半五十九秒");

            expect(result.start.get("year")).toBe(2018);
            expect(result.start.get("month")).toBe(11);
            expect(result.start.get("day")).toBe(26);
            expect(result.start.get("hour")).toBe(15);
            expect(result.start.get("minute")).toBe(30);
            expect(result.start.get("second")).toBe(59);
            expect(result.start.get("millisecond")).toBe(0);
            expect(result.start.isCertain("millisecond")).toBe(false);

            const resultDate = result.start.date();
            const expectDate = new Date(2018, 11 - 1, 26, 15, 30, 59);
            expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
        }
    );
});

test("Test - Time Expression's Meridiem imply", function () {
    testSingleCase(chrono.zh.hans, "1点pm到3点", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1点pm到3点");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("second")).toBe(0);
        expect(result.start.get("millisecond")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);
        expect(result.start.isCertain("meridiem")).toBe(true);

        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(11);
        expect(result.end.get("hour")).toBe(3);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("second")).toBe(0);
        expect(result.end.get("millisecond")).toBe(0);
        expect(result.end.isCertain("meridiem")).toBe(false);
    });
});

test("Test - Random date + time expression", function () {
    testSingleCase(chrono.zh.hans, "2014年, 3月5日早上 6 点至 7 点", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("2014年, 3月5日早上 6 点至 7 点");
    });

    testSingleCase(chrono.zh.hans, "下星期六凌晨1点30分二十九秒", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("下星期六凌晨1点30分二十九秒");
    });

    testSingleCase(chrono.zh.hans, "昨天早上六点正", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("昨天早上六点正");
    });

    testSingleCase(chrono.zh.hans, "六月四日3:00am", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("六月四日3:00am");
    });

    testSingleCase(chrono.zh.hans, "上个礼拜五16时", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("上个礼拜五16时");
    });

    testSingleCase(chrono.zh.hans, "3月17日 20点15", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("3月17日 20点15");
    });

    testSingleCase(chrono.zh.hans, "10点", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("10点");
    });

    testSingleCase(chrono.zh.hans, "中午12点", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(12);
    });
});
