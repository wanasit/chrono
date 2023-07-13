import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", () => {
    testSingleCase(chrono.uk.casual, "Дедлайн сьогодні", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("сьогодні");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 10));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн завтра", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("завтра");
        expect(result.start).toBeDate(new Date(2012, 7, 11, 17, 10));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн післязавтра", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("післязавтра");
        expect(result.start).toBeDate(new Date(2012, 7, 12, 17, 10));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн післяпіслязавтра", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("післяпіслязавтра");
        expect(result.start).toBeDate(new Date(2012, 7, 13, 17, 10));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн вчора", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("вчора");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 17, 10));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн позавчора", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("позавчора");
        expect(result.start).toBeDate(new Date(2012, 7, 8, 17, 10));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн позапозавчора", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("позапозавчора");
        expect(result.start).toBeDate(new Date(2012, 7, 7, 17, 10));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн зараз", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("зараз");
        expect(result.start).toBeDate(result.refDate);
        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн вранці", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("вранці");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн цього ранку", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("цього ранку");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн опівдні", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("опівдні");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн минулого вечора", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("минулого вечора");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 20, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн ввечері", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("ввечері");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 20, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн минулої ночі", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("минулої ночі");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн сьогодні вночі", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("сьогодні вночі");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн цієї ночі", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("цієї ночі");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн вночі", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("вночі");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн опівночі", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("опівночі");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });
});

test("Test - Combined Expression", () => {
    testSingleCase(chrono.uk.casual, "Дедлайн вчора ввечері", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("вчора ввечері");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 20));
    });

    testSingleCase(chrono.uk.casual, "Дедлайн завтра вранці", new Date(2012, 8, 10, 14), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("завтра вранці");
        expect(result.start).toBeDate(new Date(2012, 8, 11, 6));
    });
});

test("Test - Casual date range", () => {
    testSingleCase(chrono.uk.casual, "Подія від сьогодні і до післязавтра", new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe("від сьогодні і до післязавтра");
        expect(result.start).toBeDate(new Date(2012, 7, 4, 12));
        expect(result.end).toBeDate(new Date(2012, 7, 6, 12));
    });

    testSingleCase(chrono.uk.casual, "Подія сьогодні-завтра", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe("сьогодні-завтра");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
        expect(result.end).toBeDate(new Date(2012, 7, 11, 12));
    });
});

test("Test - Random negative text", () => {
    testUnexpectedResult(chrono.uk, "несьогодні");

    testUnexpectedResult(chrono.uk, "звтра");

    testUnexpectedResult(chrono.uk, "ввчора");

    testUnexpectedResult(chrono.uk, "січен");
});
