import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Positive time units", () => {
    testSingleCase(chrono.ru, "следующие 2 недели", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(15);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ru, "следующие 2 дня", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ru, "следующие два года", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2018);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ru, "следующие 2 недели 3 дня", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(18);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ru, "через пару минут", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(2);
    });

    testSingleCase(chrono.ru, "через полчаса", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(30);
    });

    testSingleCase(chrono.ru, "через 2 часа", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(14);
    });

    testSingleCase(chrono.ru, "спустя 2 часа", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(14);
    });

    testSingleCase(chrono.ru, "через три месяца", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2017);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ru, "через неделю", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(8);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ru, "через месяц", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(
        chrono.ru,
        "через год",
        { instant: new Date("2020-11-22T03:11:02.006"), timezone: "GMT" },
        (result, text) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date("2021-11-22T03:11:02.006"));
        }
    );
    testSingleCase(
        chrono.ru,
        "через год",
        { instant: new Date("2020-11-22T12:11:32.006"), timezone: "GMT" },
        (result, text) => {
            expect(result.index).toBe(0);
            expect(result.text).toBe(text);
            expect(result.start).toBeDate(new Date("2021-11-22T12:11:32.006"));
        }
    );
});

test("Test - Negative time units", () => {
    testSingleCase(chrono.ru, "прошлые 2 недели", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(12);
    });

    testSingleCase(chrono.ru, "прошлые два дня", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(29);
        expect(result.start.get("hour")).toBe(12);
    });
});

test("Test - Plus '+' sign", () => {
    testSingleCase(chrono.ru.casual, "+15 минут", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
    });

    testSingleCase(chrono.ru.casual, "+15мин", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(29);
    });

    testSingleCase(chrono.ru.casual, "+1 день 2 часа", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(14);
    });
});

test("Test - Minus '-' sign", () => {
    testSingleCase(chrono.ru.casual, "-3 года", new Date(2015, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(14);
    });
});
