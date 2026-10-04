import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src";

const REF = new Date(2016, 10 - 1, 1, 8);

test("Test - Time expression", () => {
    testSingleCase(chrono.id, "Rapat pukul 10.30", REF, (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe("pukul 10.30");
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(30);
        expect(result.start).toBeDate(new Date(2016, 9, 1, 10, 30));
    });

    testSingleCase(chrono.id, "pkl. 08.00", REF, (result) => {
        expect(result.text).toBe("pkl. 08.00");
        expect(result.start.get("hour")).toBe(8);
    });

    testSingleCase(chrono.id, "20:32:13", REF, (result) => {
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("minute")).toBe(32);
        expect(result.start.get("second")).toBe(13);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono.id, "pukul 19.00 WIB", REF, (result) => {
        expect(result.text).toBe("pukul 19.00 WIB");
        expect(result.start.get("timezoneOffset")).toBe(420);
    });
});

test("Test - Time expression with day period", () => {
    testSingleCase(chrono.id, "jam 7 pagi", REF, (result) => {
        expect(result.text).toBe("jam 7 pagi");
        expect(result.start.get("hour")).toBe(7);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.id, "jam 1 siang", REF, (result) => {
        expect(result.start.get("hour")).toBe(13);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono.id, "jam 11 siang", REF, (result) => {
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.id, "jam 3 sore", REF, (result) => {
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(chrono.id, "pukul 8 malam", REF, (result) => {
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono.id, "jam 12 malam", REF, (result) => {
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("meridiem")).toBe(Meridiem.AM);
    });

    testSingleCase(chrono.id, "jam 2 malam", REF, (result) => {
        expect(result.start.get("hour")).toBe(2);
    });
});

test("Test - Time range", () => {
    testSingleCase(chrono.id, "pukul 09.00 - 11.00", REF, (result) => {
        expect(result.text).toBe("pukul 09.00 - 11.00");
        expect(result.start.get("hour")).toBe(9);
        expect(result.end.get("hour")).toBe(11);
    });

    testSingleCase(chrono.id, "pukul 13.00 sampai 15.30", REF, (result) => {
        expect(result.text).toBe("pukul 13.00 sampai 15.30");
        expect(result.start.get("hour")).toBe(13);
        expect(result.end.get("hour")).toBe(15);
        expect(result.end.get("minute")).toBe(30);
    });
});

test("Test - Negative cases", () => {
    testUnexpectedResult(chrono.id, "3 jam", REF);
    testUnexpectedResult(chrono.id, "tahun 2020", REF);
});
