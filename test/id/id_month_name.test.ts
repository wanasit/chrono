import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Day and month name", () => {
    testSingleCase(chrono.id, "17 Agustus 1945", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("17 Agustus 1945");
        expect(result.start.get("year")).toBe(1945);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(17);
        expect(result.start).toBeDate(new Date(1945, 7, 17, 12));
    });

    testSingleCase(chrono.id, "Proklamasi pada tanggal 17 Agustus 1945.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(11);
        expect(result.text).toBe("pada tanggal 17 Agustus 1945");
        expect(result.start).toBeDate(new Date(1945, 7, 17, 12));
    });

    testSingleCase(chrono.id, "tgl. 5 Des 2023", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("tgl. 5 Des 2023");
        expect(result.start).toBeDate(new Date(2023, 11, 5, 12));
    });

    testSingleCase(chrono.id, "Acaranya 10 Nopember", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("10 Nopember");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start).toBeDate(new Date(2012, 10, 10, 12));
    });

    testSingleCase(chrono.id, "1 Mei 500 SM", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("1 Mei 500 SM");
        expect(result.start.get("year")).toBe(-500);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(1);
    });

    testSingleCase(chrono.id, "Senin, 5 Februari 2024", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Senin, 5 Februari 2024");
        expect(result.start.get("weekday")).toBe(1);
        expect(result.start).toBeDate(new Date(2024, 1, 5, 12));
    });
});

test("Test - Day and month name range", () => {
    testSingleCase(chrono.id, "5-7 Januari 2024", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("5-7 Januari 2024");
        expect(result.start).toBeDate(new Date(2024, 0, 5, 12));
        expect(result.end).toBeDate(new Date(2024, 0, 7, 12));
    });

    testSingleCase(chrono.id, "5 s.d. 7 Jan 2024", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("5 s.d. 7 Jan 2024");
        expect(result.start).toBeDate(new Date(2024, 0, 5, 12));
        expect(result.end).toBeDate(new Date(2024, 0, 7, 12));
    });

    testSingleCase(chrono.id, "1 Maret sampai 3 April 2024", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("1 Maret sampai 3 April 2024");
        expect(result.start).toBeDate(new Date(2024, 2, 1, 12));
        expect(result.end).toBeDate(new Date(2024, 3, 3, 12));
    });
});

test("Test - Month name and day", () => {
    testSingleCase(chrono.id, "September 23, 2026", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("September 23, 2026");
        expect(result.start.get("year")).toBe(2026);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(23);
        expect(result.start).toBeDate(new Date(2026, 8, 23, 12));
    });

    testSingleCase(chrono.id, "Rapatnya Januari 5 2024 di kantor", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("Januari 5 2024");
        expect(result.start).toBeDate(new Date(2024, 0, 5, 12));
    });

    testSingleCase(chrono.id, "Acaranya Nov 10", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("Nov 10");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start).toBeDate(new Date(2012, 10, 10, 12));
    });
});

test("Test - Month name and day range", () => {
    testSingleCase(chrono.id, "Januari 5 - 7, 2024", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Januari 5 - 7, 2024");
        expect(result.start).toBeDate(new Date(2024, 0, 5, 12));
        expect(result.end).toBeDate(new Date(2024, 0, 7, 12));
    });

    testSingleCase(chrono.id, "Maret 1 sampai 3", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Maret 1 sampai 3");
        expect(result.start).toBeDate(new Date(2012, 2, 1, 12));
        expect(result.end).toBeDate(new Date(2012, 2, 3, 12));
    });
});

test("Test - Month name and year", () => {
    testSingleCase(chrono.id, "Januari 2024", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Januari 2024");
        expect(result.start).toBeDate(new Date(2024, 0, 1, 12));
    });

    testSingleCase(chrono.id, "Libur pada bulan Desember", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe("pada bulan Desember");
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("year")).toBe(2012);
    });

    testSingleCase(chrono.id, "Agustus tahun 1945", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Agustus tahun 1945");
        expect(result.start.get("year")).toBe(1945);
        expect(result.start.get("month")).toBe(8);
    });
});

test("Test - Date with time", () => {
    testSingleCase(chrono.id, "17 Agustus 1945 pukul 10.00 WIB", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("17 Agustus 1945 pukul 10.00 WIB");
        expect(result.start.get("hour")).toBe(10);
        expect(result.start.get("minute")).toBe(0);
        expect(result.start.get("timezoneOffset")).toBe(420);
    });
});

test("Test - Slash format", () => {
    testSingleCase(chrono.id, "17/08/1945", new Date(2012, 7, 10), (result) => {
        expect(result.start).toBeDate(new Date(1945, 7, 17, 12));
    });
});

test("Test - Negative cases", () => {
    testUnexpectedResult(chrono.id, "Jan pergi ke pasar");
});

test("Test - Month name followed by a time is not taken as a day", () => {
    for (const text of ["Januari 12:00", "Januari 12.30"]) {
        const results = chrono.id.parse(text, new Date(2012, 7, 10));
        for (const result of results) {
            expect(result.start.isCertain("day")).toBe(false);
        }
    }
});

test("Test - Out of range day is not taken as a day", () => {
    testSingleCase(chrono.id, "96 Agustus 2024", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Agustus 2024");
        expect(result.start.isCertain("day")).toBe(false);
    });
});
