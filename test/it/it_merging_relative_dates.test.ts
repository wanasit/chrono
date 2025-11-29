import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Merging dates with time", function () {
    testSingleCase(chrono.it, "domani alle 13:00", new Date(2012, 7, 10, 8, 9), (result) => {
        expect(result.text).toBe("domani alle 13:00");
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.it, "ieri alle 10:00", new Date(2012, 7, 10, 8, 9), (result) => {
        expect(result.text).toBe("ieri alle 10:00");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.it, "venerdì prossimo alle 18:00", new Date(2012, 7, 9), (result) => {
        expect(result.text).toBe("venerdì prossimo alle 18:00");
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(0);
    });
});
