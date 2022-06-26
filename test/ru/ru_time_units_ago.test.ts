import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.ru, "5 дней назад что-то было", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 дней назад");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 5));
    });

    testSingleCase(chrono.ru, "5 минут назад что-то было", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 минут назад");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 9, 23, 55));
    });

    testSingleCase(chrono.ru, "полчаса назад что-то было", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("полчаса назад");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 9, 23, 30));
    });
});

test("Test - Nested time ago", function () {
    testSingleCase(chrono.ru, "5 дней 2 часа назад что-то было", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 дней 2 часа назад");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 4, 22));
    });

    testSingleCase(chrono.ru, "5 минут 20 секунд назад что-то было", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 минут 20 секунд назад");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 9, 23, 54, 40));
    });

    testSingleCase(chrono.ru, "2 часа 5 минут назад что-то было", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2 часа 5 минут назад");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 9, 21, 55));
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.ru, "15 часов 29 мин");
    testUnexpectedResult(chrono.ru, "несколько часов");
    testUnexpectedResult(chrono.ru, "5 дней");
});
