import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

// 2012-08-09 is a Thursday (Kamis)
const REF = new Date(2012, 7, 9, 12);

test("Test - Single weekday", () => {
    testSingleCase(chrono.id, "Senin", REF, (result) => {
        expect(result.start.get("weekday")).toBe(1);
        expect(result.start).toBeDate(new Date(2012, 7, 6, 12));
    });

    testSingleCase(chrono.id, "Kita bertemu hari Jumat", REF, (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe("hari Jumat");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.id, "pada hari Minggu", REF, (result) => {
        expect(result.text).toBe("pada hari Minggu");
        expect(result.start.get("weekday")).toBe(0);
        expect(result.start).toBeDate(new Date(2012, 7, 12, 12));
    });

    testSingleCase(chrono.id, "Ahad", REF, (result) => {
        expect(result.start.get("weekday")).toBe(0);
    });
});

test("Test - Weekday with modifier", () => {
    testSingleCase(chrono.id, "Senin depan", REF, (result) => {
        expect(result.text).toBe("Senin depan");
        expect(result.start).toBeDate(new Date(2012, 7, 13, 12));
    });

    testSingleCase(chrono.id, "Senin minggu depan", REF, (result) => {
        expect(result.text).toBe("Senin minggu depan");
        expect(result.start).toBeDate(new Date(2012, 7, 13, 12));
    });

    testSingleCase(chrono.id, "Senin mendatang", REF, (result) => {
        expect(result.text).toBe("Senin mendatang");
        expect(result.start).toBeDate(new Date(2012, 7, 13, 12));
    });

    testSingleCase(chrono.id, "Rabu lalu", REF, (result) => {
        expect(result.text).toBe("Rabu lalu");
        expect(result.start).toBeDate(new Date(2012, 7, 8, 12));
    });

    testSingleCase(chrono.id, "Selasa kemarin", REF, (result) => {
        expect(result.text).toBe("Selasa kemarin");
        expect(result.start).toBeDate(new Date(2012, 7, 7, 12));
    });

    testSingleCase(chrono.id, "Sabtu ini", REF, (result) => {
        expect(result.text).toBe("Sabtu ini");
        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });
});

test("Test - Weekday with time", () => {
    testSingleCase(chrono.id, "Jumat jam 7 malam", REF, (result) => {
        expect(result.text).toBe("Jumat jam 7 malam");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 19));
    });

    testSingleCase(chrono.id, "Senin - Rabu", REF, (result) => {
        expect(result.text).toBe("Senin - Rabu");
        expect(result.start.get("weekday")).toBe(1);
        expect(result.end.get("weekday")).toBe(3);
    });
});

test("Test - 'minggu' as week is not Sunday", () => {
    testUnexpectedResult(chrono.id, "selama 2 minggu", REF);
    testUnexpectedResult(chrono.id, "setiap minggu", REF);
});
