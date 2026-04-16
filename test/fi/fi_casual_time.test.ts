import * as chrono from "../../src/locales/fi";
import { testSingleCase } from "../test_util";

test("Test - Standalone casual time expressions", function () {
    testSingleCase(chrono, "aamulla", new Date(2012, 7, 10, 14, 0), (result) => {
        expect(result.text).toBe("aamulla");
        expect(result.start.get("hour")).toBe(6);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono, "aamupäivällä", new Date(2012, 7, 10, 14, 0), (result) => {
        expect(result.text).toBe("aamupäivällä");
        expect(result.start.get("hour")).toBe(9);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono, "päivällä", new Date(2012, 7, 10, 14, 0), (result) => {
        expect(result.text).toBe("päivällä");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono, "iltapäivällä", new Date(2012, 7, 10, 14, 0), (result) => {
        expect(result.text).toBe("iltapäivällä");
        expect(result.start.get("hour")).toBe(15);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono, "illalla", new Date(2012, 7, 10, 14, 0), (result) => {
        expect(result.text).toBe("illalla");
        expect(result.start.get("hour")).toBe(18);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono, "yöllä", new Date(2012, 7, 10, 14, 0), (result) => {
        expect(result.text).toBe("yöllä");
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono, "keskiyöllä", new Date(2012, 7, 10, 14, 0), (result) => {
        expect(result.text).toBe("keskiyöllä");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(0);
    });
});

test("Test - 'viime yönä' (last night)", function () {
    testSingleCase(chrono, "viime yönä", new Date(2012, 7, 10, 14, 0), (result) => {
        expect(result.text).toBe("viime yönä");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(0);
    });
});
