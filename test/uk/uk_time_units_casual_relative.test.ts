import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Positive time units", () => {
    testSingleCase(chrono.uk, "наступні 2 тижні", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 15, 12));
    });

    testSingleCase(chrono.uk, "наступні 2 дні", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 3, 12));
    });

    testSingleCase(chrono.uk, "наступні два роки", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2018, 10 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "наступні 2 тижні 3 дні", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 18, 12));
    });

    testSingleCase(chrono.uk, "через декілька хвилин", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 12, 2));
    });

    testSingleCase(chrono.uk, "через півгодини", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 12, 30));
    });

    testSingleCase(chrono.uk, "через 2 години", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 1, 14));
    });

    testSingleCase(chrono.uk, "через три місяці", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2017, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "через тиждень", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 10 - 1, 8, 12));
    });

    testSingleCase(chrono.uk, "через місяць", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 11 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "через рік", new Date(2020, 11 - 1, 22, 12, 11, 32, 6), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2021, 11 - 1, 22, 12, 11, 32, 6));
    });
});

test("Test - Negative time units", () => {
    testSingleCase(chrono.uk, "минулі 2 тижні", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 9 - 1, 17, 12));
    });

    testSingleCase(chrono.uk, "минулі два дні", new Date(2016, 10 - 1, 1, 12), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2016, 9 - 1, 29, 12));
    });
});

test("Test - Plus '+' sign", () => {
    testSingleCase(chrono.uk.casual, "+15 хвилин", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 29));
    });

    testSingleCase(chrono.uk.casual, "+15хв", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 29));
    });

    testSingleCase(chrono.uk.casual, "+1 день 2 години", new Date(2012, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 11, 14, 14));
    });
});

test("Test - Minus '-' sign", () => {
    testSingleCase(chrono.uk.casual, "-3 роки", new Date(2015, 7 - 1, 10, 12, 14), (result, text) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe(text);
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 10, 12, 14));
    });
});
