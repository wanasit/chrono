import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

const REF = new Date(2012, 7, 10, 12);

test("Test - DD/MM/YYYY (little-endian)", () => {
    testSingleCase(chrono.vi, "Ng\u00e0y 30/04/1975.", REF, (r) => {
        expect(r.start.get("day")).toBe(30);
        expect(r.start.get("month")).toBe(4);
        expect(r.start.get("year")).toBe(1975);
    });

    testSingleCase(chrono.vi, "H\u1ed9i ngh\u1ecb 01/01/1954", REF, (r) => {
        expect(r.start.get("day")).toBe(1);
        expect(r.start.get("month")).toBe(1);
        expect(r.start.get("year")).toBe(1954);
    });
});

test("Test - D/M/YYYY (no zero padding)", () => {
    testSingleCase(chrono.vi, "3/5/1968", REF, (r) => {
        expect(r.start.get("day")).toBe(3);
        expect(r.start.get("month")).toBe(5);
        expect(r.start.get("year")).toBe(1968);
    });
});

test("Test - ISO 2024-03-15 also parses", () => {
    testSingleCase(chrono.vi, "Ng\u00e0y 2024-03-15 l\u00e0 quan tr\u1ecdng.", REF, (r) => {
        expect(r.start.get("year")).toBe(2024);
        expect(r.start.get("month")).toBe(3);
        expect(r.start.get("day")).toBe(15);
    });
});
