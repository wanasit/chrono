import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.ru.casual, "понедельник", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("понедельник");
        expect(result.start).toBeDate(new Date(2012, 7, 6, 12));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн в пятницу...", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("в пятницу");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн в прошлый четверг!", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("в прошлый четверг");
        expect(result.start).toBeDate(new Date(2012, 7, 2, 12));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн в следующий вторник", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("в следующий вторник");
        expect(result.start).toBeDate(new Date(2015, 3, 21, 12));
    });
});

test("Test - Weekday With Casual Time", function () {
    testSingleCase(chrono.ru.casual, "Позвони в среду утром", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("в среду утром");
        expect(result.start).toBeDate(new Date(2015, 3, 15, 6));
    });
});

test("Test - Weekday Overlap", function () {
    testSingleCase(chrono.ru.casual, "воскресенье, 7 декабря 2014", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("воскресенье, 7 декабря 2014");
        expect(result.start).toBeDate(new Date(2014, 12 - 1, 7, 12));
    });
});

test("Test - forward dates only option", () => {
    testSingleCase(chrono.ru.casual, "В понедельник?", new Date(2012, 7, 9), { forwardDate: true }, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("В понедельник");
        expect(result.start).toBeDate(new Date(2012, 7, 13, 12));
    });
});
