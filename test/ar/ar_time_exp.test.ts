import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Arabic Time Expressions", () => {
    testSingleCase(chrono.ar.casual, "الساعة 5:30 مساءً", (result) => {
        expect(result.text).toBe("الساعة 5:30 مساءً");
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(30);
    });

    testSingleCase(chrono.ar.casual, "8:15 صباحاً", (result) => {
        expect(result.text).toBe("8:15 صباحاً");
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(15);
    });

    testSingleCase(chrono.ar.casual, "الساعة ٨:٣٠ مساءً", (result) => {
        expect(result.text).toBe("الساعة ٨:٣٠ مساءً");
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(30);
    });

    testSingleCase(chrono.ar.casual, "5:30 م", (result) => {
        expect(result.text).toBe("5:30 م");
        expect(result.start.get("hour")).toBe(17);
        expect(result.start.get("minute")).toBe(30);
    });

    testSingleCase(chrono.ar.casual, "8:00 ص", (result) => {
        expect(result.text).toBe("8:00 ص");
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.ar.casual, "في تمام 6:00", (result) => {
        expect(result.text).toBe("في تمام 6:00");
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);
    });
});

test("Test - Arabic Time Range", () => {
    testSingleCase(chrono.ar.casual, "من 2:00 إلى 4:00 مساءً", (result) => {
        expect(result.text).toBe("من 2:00 إلى 4:00 مساءً");
        expect(result.start.get("hour")).toBe(14);
        expect(result.start.get("minute")).toBe(0);
        expect(result.end.get("hour")).toBe(16);
        expect(result.end.get("minute")).toBe(0);
    });
});
