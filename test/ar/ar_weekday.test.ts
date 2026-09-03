import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Weekday Expressions", () => {
    // Reference date: Wednesday, August 9, 2023
    const refDate = new Date(2023, 7, 9, 12, 0);

    testSingleCase(chrono.ar.casual, "الموعد يوم الجمعة", refDate, (result) => {
        expect(result.text).toBe("يوم الجمعة");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("weekday")).toBe(5);
    });

    testSingleCase(chrono.ar.casual, "الجمعة القادم", refDate, (result) => {
        expect(result.text).toBe("الجمعة القادم");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(18);
    });

    testSingleCase(chrono.ar.casual, "الخميس الماضي", refDate, (result) => {
        expect(result.text).toBe("الخميس الماضي");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
    });

    testSingleCase(chrono.ar.casual, "هذا الأحد", refDate, (result) => {
        expect(result.text).toBe("هذا الأحد");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
    });

    testSingleCase(chrono.ar.casual, "يوم الإثنين القادم", refDate, (result) => {
        expect(result.text).toBe("يوم الإثنين القادم");
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(14);
    });
});
