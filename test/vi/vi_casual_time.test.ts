import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

const REF = new Date(2012, 7, 10, 12); // 2012-08-10 noon

test("Test - sáng (morning, AM)", () => {
    // "buổi sáng" is a time-of-day modifier; test it with an explicit time expression
    testSingleCase(chrono.vi, "7 giờ sáng", REF, (r) => {
        expect(r.start.get("hour")).toBe(7);
        expect(r.start.get("meridiem")).toBe(0); // AM
    });
    // standalone "sáng" sets implied hour=9, AM
    testSingleCase(chrono.vi, "hôm nay buổi sáng", new Date(2012, 7, 10, 6), (r) => {
        expect(r.start.get("hour")).toBe(9);
        expect(r.start.get("meridiem")).toBe(0); // AM
    });
});

test("Test - trưa (noon, PM)", () => {
    testSingleCase(chrono.vi, "buổi trưa", REF, (r) => {
        expect(r.start.get("hour")).toBe(12);
        expect(r.start.get("meridiem")).toBe(1); // PM — noon is 12:00 PM
    });
});

test("Test - chiều (afternoon, PM)", () => {
    testSingleCase(chrono.vi, "buổi chiều", REF, (r) => {
        expect(r.start.get("hour")).toBe(15);
        expect(r.start.get("meridiem")).toBe(1); // PM
    });
});

test("Test - tối (evening, PM)", () => {
    testSingleCase(chrono.vi, "buổi tối", REF, (r) => {
        expect(r.start.get("hour")).toBe(19);
        expect(r.start.get("meridiem")).toBe(1); // PM
    });
});

test("Test - đêm (late night, PM)", () => {
    // "đêm" requires buổi prefix or punctuation following — Vietnamese chars are not
    // \w in JS regex, so bare \b lookahead behaves unexpectedly without a prefix.
    testSingleCase(chrono.vi, "buổi đêm", REF, (r) => {
        expect(r.start.get("hour")).toBe(22);
        expect(r.start.get("meridiem")).toBe(1); // PM
    });
});

test("Test - nửa đêm (midnight, AM)", () => {
    testSingleCase(chrono.vi, "nửa đêm", REF, (r) => {
        expect(r.start.get("hour")).toBe(0);
        expect(r.start.get("meridiem")).toBe(0); // AM
    });
});

test("Test - bình minh / sáng sớm (dawn)", () => {
    testSingleCase(chrono.vi, "bình minh", REF, (r) => {
        expect(r.start.get("hour")).toBe(6);
        expect(r.start.get("meridiem")).toBe(0); // AM
    });

    testSingleCase(chrono.vi, "sáng sớm", REF, (r) => {
        expect(r.start.get("hour")).toBe(6);
        expect(r.start.get("meridiem")).toBe(0); // AM
    });
});

test("Test - time keyword merges with date", () => {
    testSingleCase(chrono.vi, "hôm nay buổi chiều", REF, (r) => {
        expect(r.start.get("day")).toBe(10);
        expect(r.start.get("hour")).toBe(15);
    });
});
