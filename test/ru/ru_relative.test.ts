import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - 'This' expressions", () => {
    testSingleCase(chrono.ru, "на этой неделе", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 11 - 1, 19, 12));
    });

    testSingleCase(chrono.ru, "в этом месяце", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 11 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "в этом месяце", new Date(2017, 11 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 11 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "в этом году", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 1 - 1, 1, 12));
    });
});

test("Test - Past relative expressions", () => {
    testSingleCase(chrono.ru, "на прошлой неделе", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 9 - 1, 24, 12));
    });

    testSingleCase(chrono.ru, "в прошлом месяце", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "в прошлом году", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2015, 10 - 1, 1, 12));
    });
});

test("Test - Future relative expressions", () => {
    testSingleCase(chrono.ru, "на следующей неделе", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 8, 12));
    });

    testSingleCase(chrono.ru, "в следующем месяце", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 11 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "в следующем квартале", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.ru, "в следующем году", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 10 - 1, 1, 12));
    });
});
