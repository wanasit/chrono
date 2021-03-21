import * as chrono from "../../src";
import { measureMilliSec } from "../test_util";

test("Test - Benchmarking against whitespace backtracking", () => {
    const time = measureMilliSec(() => {
        const str =
            "BGR3                                                                                         " +
            "                                                                                        186          " +
            "                                      days                                                           " +
            "                                                                                                     " +
            "                                                                                                     " +
            "           18                                                hours                                   " +
            "                                                                                                     " +
            "                                                                                                     " +
            "                                   37                                                minutes         " +
            "                                                                                                     " +
            "                                                                                                     " +
            "                                                             01                                      " +
            "          seconds";

        const results = chrono.parse(str);
        expect(results.length).toBe(0);
    });

    expect(time).toBeLessThan(1000);
});
