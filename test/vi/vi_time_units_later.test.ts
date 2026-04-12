import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

test("Test - N ng\u00e0y sau", () => {
    testSingleCase(chrono.vi, "S\u1ef1 ki\u1ec7n 3 ng\u00e0y sau.", new Date(2012, 7, 10, 12), (r) => {
        expect(r.text).toBe("3 ng\u00e0y sau");
        expect(r.start.get("day")).toBe(13);
        expect(r.start.get("month")).toBe(8);
    });
});

test("Test - N tu\u1ea7n n\u1eefa", () => {
    testSingleCase(chrono.vi, "2 tu\u1ea7n n\u1eefa", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("day")).toBe(24);
        expect(r.start.get("month")).toBe(8);
    });
});

test("Test - N th\u00e1ng t\u1edbi", () => {
    testSingleCase(chrono.vi, "3 th\u00e1ng t\u1edbi", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("month")).toBe(11);
        expect(r.start.get("year")).toBe(2012);
    });
});

test("Test - N n\u0103m sau", () => {
    testSingleCase(chrono.vi, "10 n\u0103m sau", new Date(2012, 7, 10, 12), (r) => {
        expect(r.start.get("year")).toBe(2022);
    });
});
