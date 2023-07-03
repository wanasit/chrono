import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.uk, "5 днів тому щось відбулось", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 днів тому");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 5));
    });

    testSingleCase(chrono.uk, "5 хвилин тому щось відбулось", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 хвилин тому");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 9, 23, 55));
    });

    testSingleCase(chrono.uk, "півгодини тому щось відбулось", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("півгодини тому");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 9, 23, 30));
    });
});

test("Test - Nested time ago", function () {
    testSingleCase(chrono.uk, "5 днів 2 години тому щось відбулось", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 днів 2 години тому");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 4, 22));
    });

    testSingleCase(chrono.uk, "5 хвилин 20 секунд тому щось сталось", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5 хвилин 20 секунд тому");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 9, 23, 54, 40));
    });

    testSingleCase(chrono.uk, "2 години 5 хвилин тому щось сталось", new Date(2012, 7 - 1, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("2 години 5 хвилин тому");
        expect(result.start).toBeDate(new Date(2012, 7 - 1, 9, 21, 55));
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.uk, "15 годин 29 хв.");
    testUnexpectedResult(chrono.uk, "декілька годин");
    testUnexpectedResult(chrono.uk, "5 днів");
});
