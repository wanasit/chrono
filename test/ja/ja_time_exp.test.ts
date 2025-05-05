import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.ja, "私は午前6時13分に起きた", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(2);
        expect(result.text).toBe("午前6時13分");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(13);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 6, 13);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.ja, "私は午前8時に起きる", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(2);
        expect(result.text).toBe("午前8時");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 8);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.ja, "午後8時", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("午後8時");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(20);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 8 - 1, 10, 20);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
    testSingleCase(chrono.ja, "12/9の16:00", new Date(2025, 12 - 1, 10, 12), (result) => {
        expect(result.text).toBe("12/9の16:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(16);

        const resultDate = result.start.date();
        const expectDate = new Date(2025, 12 - 1, 9, 16);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
    testSingleCase(chrono.ja, "１２月９日の１６：３０", new Date(2025, 12 - 1, 10, 12), (result) => {
        expect(result.text).toBe("１２月９日の１６：３０");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2025);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(16);
        expect(result.start.get("minute")).toBe(30);

        const resultDate = result.start.date();
        const expectDate = new Date(2025, 12 - 1, 9, 16, 30);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Range Expression", function () {
    testSingleCase(
        chrono.ja,
        "私は本日午前八時十分から午後11時32分までゲームをした",
        new Date(2012, 7, 10),
        (result) => {
            expect(result.index).toBe(2);
            expect(result.text).toBe("本日午前八時十分から午後11時32分");

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

            expect(result.end.isCertain("day")).toBe(true);
            expect(result.end.isCertain("month")).toBe(true);
            expect(result.end.isCertain("year")).toBe(true);
            expect(result.end.isCertain("hour")).toBe(true);
            expect(result.end.isCertain("minute")).toBe(true);
            expect(result.end.isCertain("second")).toBe(false);
            expect(result.end.isCertain("millisecond")).toBe(false);

            resultDate = result.end.date();
            expectDate = new Date(2012, 7, 10, 23, 32);
            expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
        }
    );

    testSingleCase(chrono.ja, "6時30分PM-11時PM", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("6時30分PM-11時PM");

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
        chrono.ja,
        "僕は2018年11月26日午後三時半五十九秒にゲームを始めた",
        new Date(2012, 7, 10),
        (result) => {
            expect(result.index).toBe(2);
            expect(result.text).toBe("2018年11月26日午後三時半五十九秒");

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
    testSingleCase(chrono.ja, "午後1時から3時", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("午後1時から3時");

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
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("second")).toBe(0);
        expect(result.end.get("millisecond")).toBe(0);
        expect(result.start.get("meridiem")).toBe(1);
    });

    testSingleCase(chrono.ja, "午後６時半－１１時", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("午後６時半－１１時");

        expect(result.start).not.toBeNull();
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start.get("meridiem")).toBe(1);

        const resultDate = result.start.date();
        const expectDate = new Date(2012, 7, 10, 18, 30);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());

        expect(result.end).not.toBeNull();
        expect(result.end.get("hour")).toBe(23);
        expect(result.end.get("minute")).toBe(0);
        expect(result.end.get("meridiem")).toBe(1);
    });
});

test("Test - Random date + time expression", function () {
    testSingleCase(chrono.ja, "2014年3月5日午前 6 時から 7 時", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("2014年3月5日午前 6 時から 7 時");
    });

    testSingleCase(chrono.ja, "次の土曜日1時30分二十九秒", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("次の土曜日1時30分二十九秒");
    });

    testSingleCase(chrono.ja, "昨日午前六時", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("昨日午前六時");
    });

    testSingleCase(chrono.ja, "６月４日3:00am", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("６月４日3:00am");
    });

    testSingleCase(chrono.ja, "前の金曜日16時", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("前の金曜日16時");
    });

    testSingleCase(chrono.ja, "3月17日 20時15", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("3月17日 20時15");
    });

    testSingleCase(chrono.ja, "10時", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("10時");
    });

    testSingleCase(chrono.ja, "12時", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("hour")).toBe(12);
    });
});
