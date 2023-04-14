import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.ja, "今日感じたことを忘れずに", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("今日");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });
    testSingleCase(chrono.ja, "きょう感じたことを忘れずに", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("きょう");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.ja, "昨日の全国観測値ランキング", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("昨日");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 9, 12));
    });
    testSingleCase(chrono.ja, "きのうの全国観測値ランキング", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("きのう");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 9, 12));
    });

    testSingleCase(chrono.ja, "明日の天気は晴れです", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("明日");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 12));
    });
    testSingleCase(chrono.ja, "あしたの天気は晴れです", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("あした");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 12));
    });

    testSingleCase(chrono.ja, "今夜には雨が降るでしょう", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("今夜");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 22));
    });
    testSingleCase(chrono.ja, "こんやには雨が降るでしょう", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("こんや");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 22));
    });
    testSingleCase(chrono.ja, "今夕には雨が降るでしょう", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("今夕");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 22));
    });
    testSingleCase(chrono.ja, "こんゆうには雨が降るでしょう", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("こんゆう");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 22));
    });
    testSingleCase(chrono.ja, "今晩には雨が降るでしょう", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("今晩");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 22));
    });
    testSingleCase(chrono.ja, "こんばんには雨が降るでしょう", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("こんばん");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 22));
    });

    testSingleCase(chrono.ja, "今朝食べたパンは美味しかった", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("今朝");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 6));
    });
    testSingleCase(chrono.ja, "けさ食べたパンは美味しかった", new Date(2012, 8 - 1, 10, 12), (result) => {
        expect(result.text).toBe("けさ");
        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 6));
    });
});
