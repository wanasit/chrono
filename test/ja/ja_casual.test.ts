import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    function testToday(pattern: string) {
        testSingleCase(chrono.ja, `${pattern}感じたことを忘れずに`, new Date(2012, 8 - 1, 10, 12), (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe(pattern);
            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2012);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(10);
            expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
        });
    }

    testToday("今日");
    testToday("きょう");

    function testYesterday(pattern: string) {
        testSingleCase(chrono.ja, `${pattern}の全国観測値ランキング`, new Date(2012, 8 - 1, 10, 12), (result) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe(pattern);

            expect(result.start).not.toBeNull();
            expect(result.start.get("year")).toBe(2012);
            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(9);

            expect(result.start).toBeDate(new Date(2012, 8 - 1, 9, 12));
        });
    }
    testYesterday("昨日");
    testYesterday("きのう");
});
