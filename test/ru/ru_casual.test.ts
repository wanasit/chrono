import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", () => {
    testSingleCase(chrono.ru.casual, "Дедлайн сегодня", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("сегодня");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 17, 10));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн завтра", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("завтра");
        expect(result.start).toBeDate(new Date(2012, 7, 11, 17, 10));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн послезавтра", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("послезавтра");
        expect(result.start).toBeDate(new Date(2012, 7, 12, 17, 10));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн послепослезавтра", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("послепослезавтра");
        expect(result.start).toBeDate(new Date(2012, 7, 13, 17, 10));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн вчера", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("вчера");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 17, 10));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн позавчера", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("позавчера");
        expect(result.start).toBeDate(new Date(2012, 7, 8, 17, 10));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн позапозавчера", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("позапозавчера");
        expect(result.start).toBeDate(new Date(2012, 7, 7, 17, 10));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн сейчас", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("сейчас");
        expect(result.start).toBeDate(result.refDate);
        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн утром", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("утром");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн этим утром", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("этим утром");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн в полдень", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("в полдень");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн прошлым вечером", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("прошлым вечером");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 20, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн вечером", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("вечером");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 20, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн прошлой ночью", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("прошлой ночью");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн прошлой ночью", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("прошлой ночью");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 0, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн сегодня ночью", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("сегодня ночью");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн этой ночью", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("этой ночью");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн ночью", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("ночью");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн в полночь", new Date(2012, 7, 10, 2, 9, 10, 11), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("в полночь");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 0, 0, 0));
    });
});

test("Test - Combined Expression", () => {
    testSingleCase(chrono.ru.casual, "Дедлайн вчера вечером", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("вчера вечером");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 20));
    });

    testSingleCase(chrono.ru.casual, "Дедлайн завтра утром", new Date(2012, 8, 10, 14), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("завтра утром");
        expect(result.start).toBeDate(new Date(2012, 8, 11, 6));
    });
});

test("Test - Casual date range", () => {
    testSingleCase(chrono.ru.casual, "Событие с сегодня и до послезавтра", new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("с сегодня и до послезавтра");
        expect(result.start).toBeDate(new Date(2012, 7, 4, 12));
        expect(result.end).toBeDate(new Date(2012, 7, 6, 12));
    });

    testSingleCase(chrono.ru.casual, "Событие сегодня-завтра", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("сегодня-завтра");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
        expect(result.end).toBeDate(new Date(2012, 7, 11, 12));
    });
});

test("Test - Random negative text", () => {
    testUnexpectedResult(chrono.ru, "несегодня");

    testUnexpectedResult(chrono.ru, "зявтра");

    testUnexpectedResult(chrono.ru, "вчеера");

    testUnexpectedResult(chrono.ru, "январ");
});
