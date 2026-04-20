import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - h\u00f4m nay (today)", () => {
    testSingleCase(chrono.vi, "Cu\u1ed9c h\u1ecdn h\u00f4m nay.", new Date(2012, 7, 10, 12), (r) => {
        expect(r.index).toBe(9);
        expect(r.text).toBe("h\u00f4m nay");
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("day")).toBe(10);
    });
});

test("Test - h\u00f4m qua (yesterday)", () => {
    testSingleCase(chrono.vi, "H\u1ed9i ngh\u1ecb h\u00f4m qua.", new Date(2012, 7, 10, 12), (r) => {
        expect(r.index).toBe(9);
        expect(r.text).toBe("h\u00f4m qua");
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("day")).toBe(9);
    });

    testSingleCase(chrono.vi, "h\u00f4m qua", new Date(2012, 7, 1, 12), (r) => {
        expect(r.start.get("month")).toBe(7); // July — crosses month boundary
        expect(r.start.get("day")).toBe(31);
    });
});

test("Test - ng\u00e0y mai (tomorrow)", () => {
    testSingleCase(chrono.vi, "L\u1ecbch ng\u00e0y mai.", new Date(2012, 7, 10, 12), (r) => {
        expect(r.index).toBe(5);
        expect(r.text).toBe("ng\u00e0y mai");
        expect(r.start.get("day")).toBe(11);
        expect(r.start.get("month")).toBe(8);
    });

    testSingleCase(chrono.vi, "ng\u00e0y mai", new Date(2012, 7, 31, 12), (r) => {
        expect(r.start.get("month")).toBe(9); // Sept — crosses month boundary
        expect(r.start.get("day")).toBe(1);
    });
});

test("Test - ng\u00e0y kia (day after tomorrow)", () => {
    testSingleCase(chrono.vi, "ng\u00e0y kia", new Date(2012, 7, 10, 12), (r) => {
        expect(r.text).toBe("ng\u00e0y kia");
        expect(r.start.get("day")).toBe(12);
    });
});

test("Test - b\u00e2y gi\u1edd / l\u00fac n\u00e0y (now)", () => {
    testSingleCase(chrono.vi, "b\u00e2y gi\u1edd", new Date(2012, 7, 10, 8, 9, 10, 11), (r) => {
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("day")).toBe(10);
        expect(r.start.get("hour")).toBe(8);
        expect(r.start.get("minute")).toBe(9);
        expect(r.start.get("second")).toBe(10);
    });

    testSingleCase(chrono.vi, "l\u00fac n\u00e0y", new Date(2012, 7, 10, 8, 9, 10, 11), (r) => {
        expect(r.start.get("hour")).toBe(8);
    });
});

test("Test - hôm kia (day before yesterday, -2)", () => {
    testSingleCase(chrono.vi, "hôm kia", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("year")).toBe(2012);
        expect(r.start.get("month")).toBe(8);
        expect(r.start.get("day")).toBe(8); // 10 - 2
    });
});

test("Test - isCertain: casual date sets day/month/year certain, hour not", () => {
    testSingleCase(chrono.vi, "hôm nay", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.isCertain("day")).toBe(true);
        expect(r.start.isCertain("month")).toBe(true);
        expect(r.start.isCertain("year")).toBe(true);
        expect(r.start.isCertain("hour")).toBe(false);
    });
});
