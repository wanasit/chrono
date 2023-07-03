import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Month-Year expression", function () {
    testSingleCase(chrono.uk, "Вересень 2012", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Вересень 2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "верес 2012", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("верес 2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "верес. 2012", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("верес. 2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "верес-2012", (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("верес-2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });
});

test("Test - Month-Only expression", function () {
    testSingleCase(chrono.uk, "в січні", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в січні");
        expect(result.start).toBeDate(new Date(2021, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "в січ", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("в січ");
        expect(result.start).toBeDate(new Date(2021, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "травень", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("травень");
        expect(result.start).toBeDate(new Date(2021, 5 - 1, 1, 12));
    });
});

test("Test - Month expression in context", function () {
    testSingleCase(chrono.uk, "Це було у вересні 2012 перед новим роком", (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("у вересні 2012");
        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono.uk, "сер 96", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("сер 96");
        expect(result.start).toBeDate(new Date(1996, 8 - 1, 1, 12));
    });

    testSingleCase(chrono.uk, "96 сер 96", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("сер 96");
        expect(result.start).toBeDate(new Date(1996, 8 - 1, 1, 12));
    });
});
