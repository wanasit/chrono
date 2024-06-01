import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - International compatible", () => {
    testSingleCase(chrono.zh, "1994-11-05T08:15:30-05:30", new Date(2012, 7, 8), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(1994);
        expect(result.start.get("month")).toBe(11);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(15);
        expect(result.start.get("second")).toBe(30);
        expect(result.start.get("timezoneOffset")).toBe(-330);
        expect(result.text).toBe("1994-11-05T08:15:30-05:30");

        expect(result.start).toBeDate(new Date(784043130000));
    });
});

test("Test - Default Zh setting combine both hans/hant", () => {
    testSingleCase(chrono.zh, "明天早上8点", new Date(2012, 8 - 1, 8, 12), (result) => {
        expect(result.text).toBe("明天早上8点");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(8);
    });

    testSingleCase(chrono.zh, "明天早上8點", new Date(2012, 8 - 1, 8, 12), (result) => {
        expect(result.text).toBe("明天早上8點");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(8);
    });
});
