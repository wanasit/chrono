import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - The normal within expression", () => {
    testSingleCase(chrono.ru, "будет сделано в течение минуты", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("в течение минуты");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 1));
    });

    testSingleCase(chrono.ru, "будет сделано в течение 2 часов.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("в течение 2 часов");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 2));
    });
});
