import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - The normal within expression", () => {
    testSingleCase(chrono.uk, "буде зроблено протягом хвилини", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("протягом хвилини");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 1));
    });

    testSingleCase(chrono.uk, "буде виконано на протязі 2 годин.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("на протязі 2 годин");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 2));
    });
});
