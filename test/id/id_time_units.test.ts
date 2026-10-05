import * as chrono from "../../src/";
import { testSingleCase } from "../test_util";

const REF = new Date(2012, 7, 10, 12, 14);

test("Test - Ago format", () => {
    testSingleCase(chrono.id, "Dia pergi 5 hari yang lalu", REF, (result) => {
        expect(result.index).toBe(10);
        expect(result.text).toBe("5 hari yang lalu");
        expect(result.start).toBeDate(new Date(2012, 7, 5, 12, 14));
    });

    testSingleCase(chrono.id, "2 minggu lalu", REF, (result) => {
        expect(result.start).toBeDate(new Date(2012, 6, 27, 12, 14));
    });

    testSingleCase(chrono.id, "setahun silam", REF, (result) => {
        expect(result.text).toBe("setahun silam");
        expect(result.start).toBeDate(new Date(2011, 7, 10, 12, 14));
    });

    testSingleCase(chrono.id, "1 jam 30 menit yang lalu", REF, (result) => {
        expect(result.text).toBe("1 jam 30 menit yang lalu");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 10, 44));
    });

    testSingleCase(chrono.id, "tiga bulan yang lalu", REF, (result) => {
        expect(result.start).toBeDate(new Date(2012, 4, 10, 12, 14));
    });
});

test("Test - Later format", () => {
    testSingleCase(chrono.id, "Kembali 3 hari lagi", REF, (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("3 hari lagi");
        expect(result.start).toBeDate(new Date(2012, 7, 13, 12, 14));
    });

    testSingleCase(chrono.id, "setengah jam lagi", REF, (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 44));
    });

    testSingleCase(chrono.id, "seminggu kemudian", REF, (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 17, 12, 14));
    });

    testSingleCase(chrono.id, "2 jam dan 15 menit lagi", REF, (result) => {
        expect(result.text).toBe("2 jam dan 15 menit lagi");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 29));
    });
});

test("Test - Within format", () => {
    testSingleCase(chrono.id, "Selesai dalam 5 menit", REF, (result) => {
        expect(result.index).toBe(8);
        expect(result.text).toBe("dalam 5 menit");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 19));
    });

    testSingleCase(chrono.id, "dalam waktu dua minggu", REF, (result) => {
        expect(result.text).toBe("dalam waktu dua minggu");
        expect(result.start).toBeDate(new Date(2012, 7, 24, 12, 14));
    });

    testSingleCase(chrono.id, "dalam sebulan", REF, (result) => {
        expect(result.start).toBeDate(new Date(2012, 8, 10, 12, 14));
    });
});

test("Test - Relative unit", () => {
    testSingleCase(chrono.id, "minggu depan", REF, (result) => {
        expect(result.text).toBe("minggu depan");
        expect(result.start).toBeDate(new Date(2012, 7, 17, 12, 14));
    });

    testSingleCase(chrono.id, "Dia pindah bulan lalu", REF, (result) => {
        expect(result.index).toBe(11);
        expect(result.text).toBe("bulan lalu");
        expect(result.start).toBeDate(new Date(2012, 6, 10, 12, 14));
    });

    testSingleCase(chrono.id, "tahun depan", REF, (result) => {
        expect(result.start).toBeDate(new Date(2013, 7, 10, 12, 14));
    });

    testSingleCase(chrono.id, "bulan ini", REF, (result) => {
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(1);
    });
});
