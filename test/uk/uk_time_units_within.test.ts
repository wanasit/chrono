import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

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

test("Test - Within expression respects the word boundary", () => {
    // The forwardDate branch builds a bare time-unit pattern whose right boundary uses the
    // \p{L}\p{N} escapes, so a unit glued to a following letter must not match. "годин" (hours)
    // is a prefix of "годинників" (watches), so this sentence must not parse as "5 hours".
    testUnexpectedResult(chrono.uk, "купив 5 годинників", new Date(2012, 7, 10), { forwardDate: true });
});
