import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.ja, "木曜日", new Date(2016, 9 - 1, 2), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("木曜日");

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

    testSingleCase(chrono.ja, "前の水曜日", new Date(2016, 9 - 1, 2), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("前の水曜日");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(31);
        expect(result.start.get("weekday")).toBe(3);

        const resultDate = result.start.date();
        const expectDate = new Date(2016, 8 - 1, 31, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Single Expression - weekday with parentheses", function () {
    testSingleCase(chrono.ja, "(木)", new Date(2016, 9 - 1, 2), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("(木)");

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
    testSingleCase(chrono.ja, "（木）", new Date(2016, 9 - 1, 2), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("（木）");

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
});

test("Test - forward dates only option", function () {
    testSingleCase(chrono.ja, "土曜日～月曜日", new Date(2016, 9 - 1, 2), { forwardDate: true }, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("土曜日～月曜日");

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

test("Test - merge date and weekday", function () {
    testSingleCase(chrono.ja, "8月27日水曜日", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8月27日水曜日");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(27);
        expect(result.start.get("weekday")).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 27, 12));
    });
    testSingleCase(chrono.ja, "8月27日（水）", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("8月27日（水）");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(27);
        expect(result.start.get("weekday")).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 27, 12));
    });
    testSingleCase(chrono.ja, "2012/8/27（水）", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2012/8/27（水）");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(27);
        expect(result.start.get("weekday")).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 27, 12));
    });
    testSingleCase(chrono.ja, "１／３０（木）", new Date(2025, 1, 10), (result) => {
        expect(result.text).toBe("１／３０（木）");
    });
    testSingleCase(chrono.ja, "1/30の木曜日", new Date(2025, 1, 10), (result) => {
        expect(result.text).toBe("1/30の木曜日");
    });
    testSingleCase(chrono.ja, "1/30(木)", new Date(2025, 1, 10), (result) => {
        expect(result.text).toBe("1/30(木)");
    });
    testSingleCase(chrono.ja, "１月３０日（木）１４：００", new Date(2025, 1, 10), (result) => {
        expect(result.text).toBe("１月３０日（木）１４：００");
    });
    testSingleCase(chrono.ja, "１月３１日（金）１２：００－１６：００", new Date(2025, 1, 10), (result) => {
        expect(result.text).toBe("１月３１日（金）１２：００－１６：００");
    });
    testSingleCase(
        chrono.ja,
        "１月３０日（木）１２：００－１月３１日（金）１６：００",
        new Date(2025, 1, 10),
        (result) => {
            expect(result.text).toBe("１月３０日（木）１２：００－１月３１日（金）１６：００");
            expect(result.start).toBeDate(new Date(2025, 1 - 1, 30, 12));
            expect(result.start.get("weekday")).toBe(4);
            expect(result.end).toBeDate(new Date(2025, 1 - 1, 31, 16));
            expect(result.end.get("weekday")).toBe(5);
        }
    );
});
