import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

const REF = new Date(2012, 7, 10, 12);

test("Test - X gi\u1edd", () => {
    testSingleCase(chrono.vi, "Cu\u1ed9c h\u1ecdn l\u00fac 7 gi\u1edd.", REF, (r) => {
        expect(r.text).toBe("l\u00fac 7 gi\u1edd");
        expect(r.start.get("hour")).toBe(7);
        expect(r.start.get("minute")).toBe(0);
    });

    testSingleCase(chrono.vi, "7 gi\u1edd s\u00e1ng", REF, (r) => {
        expect(r.start.get("hour")).toBe(7);
        expect(r.start.get("meridiem")).toBe(0); // AM
    });

    testSingleCase(chrono.vi, "7 gi\u1edd t\u1ed1i", REF, (r) => {
        expect(r.start.get("hour")).toBe(19);
    });
});

test("Test - X gi\u1edd Y ph\u00fat", () => {
    testSingleCase(chrono.vi, "l\u00fac 7 gi\u1edd 30 ph\u00fat", REF, (r) => {
        expect(r.start.get("hour")).toBe(7);
        expect(r.start.get("minute")).toBe(30);
    });

    testSingleCase(chrono.vi, "v\u00e0o 15 gi\u1edd 45 ph\u00fat", REF, (r) => {
        expect(r.start.get("hour")).toBe(15);
        expect(r.start.get("minute")).toBe(45);
    });
});

test("Test - colon format HH:MM", () => {
    testSingleCase(chrono.vi, "H\u1ecdn l\u00fac 15:30.", REF, (r) => {
        expect(r.start.get("hour")).toBe(15);
        expect(r.start.get("minute")).toBe(30);
    });
});

test("Test - date + time combined", () => {
    testSingleCase(chrono.vi, "ng\u00e0y 30 th\u00e1ng 4 n\u0103m 1975 l\u00fac 11 gi\u1edd", REF, (r) => {
        expect(r.start.get("day")).toBe(30);
        expect(r.start.get("month")).toBe(4);
        expect(r.start.get("year")).toBe(1975);
        expect(r.start.get("hour")).toBe(11);
    });
});

test("Test - meridiem: s\u00e1ng/chi\u1ec1u/t\u1ed1i/\u0111\u00eam", () => {
    testSingleCase(chrono.vi, "9 gi\u1edd s\u00e1ng", REF, (r) => {
        expect(r.start.get("hour")).toBe(9);
        expect(r.start.get("meridiem")).toBe(0); // AM
    });
    testSingleCase(chrono.vi, "3 gi\u1edd chi\u1ec1u", REF, (r) => {
        expect(r.start.get("hour")).toBe(15);
    });
    testSingleCase(chrono.vi, "10 gi\u1edd \u0111\u00eam", REF, (r) => {
        expect(r.start.get("hour")).toBe(22);
    });
});
