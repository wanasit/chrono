import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.uk.casual, "понеділок", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("понеділок");
        expect(result.start).toBeDate(new Date(2012, 7, 6, 12));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн у п'ятницю...", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("у п'ятницю");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн в минулий четвер!", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("в минулий четвер");
        expect(result.start).toBeDate(new Date(2012, 7, 2, 12));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн в наступний вівторок!", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("в наступний вівторок");
        expect(result.start).toBeDate(new Date(2015, 3, 21, 12));
    });
});

test("Test - Weekday With Casual Time", function () {
    testSingleCase(chrono.uk.casual, "Подзвони в середу вранці", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("в середу вранці");
        expect(result.start).toBeDate(new Date(2015, 3, 15, 6));
    });
});

test("Test - Weekday Overlap", function () {
    testSingleCase(chrono.uk.casual, "неділя, 7 грудня 2014", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("неділя, 7 грудня 2014");
        expect(result.start).toBeDate(new Date(2014, 12 - 1, 7, 12));
    });
});

test("Test - forward dates only option", () => {
    testSingleCase(chrono.uk.casual, "У понеділок?", new Date(2012, 7, 9), { forwardDate: true }, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("У понеділок");
        expect(result.start).toBeDate(new Date(2012, 7, 13, 12));
    });
});
