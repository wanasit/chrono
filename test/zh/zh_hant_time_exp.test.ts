import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.zh.hant, "雞上午6點13分全部都係雞", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("上午6點13分");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(13);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 6, 13);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "雞後天凌晨全部都係雞", new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("後天凌晨");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 12, 0, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "雞大前天凌晨全部都係雞", new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("大前天凌晨");

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 7, 0, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "我明天上午8點要打遊戲", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("明天上午8點");
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
    testSingleCase(chrono.zh.hant, "雞由今朝八點十分至下午11點32分全部都係雞", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe("由今朝八點十分至下午11點32分");

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

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 8, 10);
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

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 23, 32);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.zh.hant, "6點30pm-11點pm", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("6點30pm-11點pm");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(1);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 18, 30);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(23);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);

        var resultDate = result.end.date();
        var expectDate = new Date(2012, 7, 10, 23, 0);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Date + Time Expression", function () {
    testSingleCase(
        chrono.zh.hant,
        "雞二零一八年十一月廿六日下午三時半五十九秒全部都係雞",
        new Date(2012, 7, 10),
        (result) => {
            expect(result.index).toBe(1);
            expect(result.text).toBe("二零一八年十一月廿六日下午三時半五十九秒");

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
    testSingleCase(chrono.zh.hant, "1點pm到3點", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1點pm到3點");

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
    testSingleCase(chrono.zh.hant, "2014年, 3月5日晏晝 6 點至 7 點", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("2014年, 3月5日晏晝 6 點至 7 點");
    });

    testSingleCase(chrono.zh.hant, "下星期六凌晨1點30分廿九秒", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("下星期六凌晨1點30分廿九秒");
    });

    testSingleCase(chrono.zh.hant, "尋日朝早六點正", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("尋日朝早六點正");
    });

    testSingleCase(chrono.zh.hant, "六月四日3:00am", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("六月四日3:00am");
    });

    testSingleCase(chrono.zh.hant, "上個禮拜五16時", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("上個禮拜五16時");
    });

    testSingleCase(chrono.zh.hant, "3月17日 20點15", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("3月17日 20點15");
    });

    testSingleCase(chrono.zh.hant, "10點", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("10點");
    });

    testSingleCase(chrono.zh.hant, "中午12點", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(12);
    });
});
