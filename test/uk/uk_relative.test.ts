import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - 'This' expressions", () => {
    testSingleCase(chrono.uk, "на цьому тижні", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 11 - 1, 19, 12));
    });

    testSingleCase(chrono.uk, "у цьому місяці", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 11 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "цього місяця", new Date(2017, 11 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 11 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "у цьому році", new Date(2017, 11 - 1, 19, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 1 - 1, 1, 12));
    });
});

test("Test - Past relative expressions", () => {
    testSingleCase(chrono.uk, "на минулому тижні", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 9 - 1, 24, 12));
    });

    testSingleCase(chrono.uk, "минулого місяця", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "у минулому році", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2015, 10 - 1, 1, 12));
    });
});

test("Test - Future relative expressions", () => {
    testSingleCase(chrono.uk, "на наступному тижні", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 8, 12));
    });

    testSingleCase(chrono.uk, "наступного місяця", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 11 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "в наступному кварталі", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "наступного року", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 10 - 1, 1, 12));
    });
});
