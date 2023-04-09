import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    function testToday(pattern: string) {
        testSingleCase(chrono.ja, `${pattern}感じたことを忘れずに`, new Date(2012, 8 - 1, 10, 12), (result) => {
            expect(result.text).toBe(pattern);
            expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
        });
    }

    testToday("今日");
    testToday("きょう");

    function testYesterday(pattern: string) {
        testSingleCase(chrono.ja, `${pattern}の全国観測値ランキング`, new Date(2012, 8 - 1, 10, 12), (result) => {
            expect(result.text).toBe(pattern);
            expect(result.start).toBeDate(new Date(2012, 8 - 1, 9, 12));
        });
    }
    testYesterday("昨日");
    testYesterday("きのう");

    function testTomorrow(pattern: string) {
        testSingleCase(chrono.ja, `${pattern}の天気は晴れです`, new Date(2012, 8 - 1, 10, 12), (result) => {
            expect(result.text).toBe(pattern);
            expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 12));
        });
    }

    testTomorrow("明日");
    testTomorrow("あした");

    function testTonight(pattern: string) {
        testSingleCase(chrono.ja, `${pattern}には雨が降るでしょう`, new Date(2012, 8 - 1, 10, 12), (result) => {
            expect(result.text).toBe(pattern);
            expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 22));
        });
    }

    testTonight("今夜");
    testTonight("こんや");
    testTonight("今夕");
    testTonight("こんゆう");
    testTonight("今晩");
    testTonight("こんばん");

    function testMorning(pattern: string) {
        testSingleCase(chrono.ja, `${pattern}食べたパンは美味しかった`, new Date(2012, 8 - 1, 10, 12), (result) => {
            expect(result.text).toBe(pattern);
            expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 6));
        });
    }
    testMorning("今朝");
    testMorning("けさ");
});
