import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", () => {
    testSingleCase(chrono.id, "Rapatnya sekarang", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("sekarang");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.id, "Batas waktunya hari ini", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("hari ini");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.id, "Batas waktunya besok", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("besok");
        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    testSingleCase(chrono.id, "besok", new Date(2012, 7, 31, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 8, 1, 12));
    });

    testSingleCase(chrono.id, "Batas waktunya kemarin", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("kemarin");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    testSingleCase(chrono.id, "lusa", new Date(2012, 7, 10, 12), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 12, 12));
    });

    testSingleCase(chrono.id, "besok lusa", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("besok lusa");
        expect(result.start).toBeDate(new Date(2012, 7, 12, 12));
    });

    testSingleCase(chrono.id, "kemarin lusa", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("kemarin lusa");
        expect(result.start).toBeDate(new Date(2012, 7, 8, 12));
    });

    testSingleCase(chrono.id, "Kami bertemu tadi malam", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe("tadi malam");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0));
    });

    testSingleCase(chrono.id, "Kita bertemu nanti malam", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe("nanti malam");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 22));
    });

    testSingleCase(chrono.id, "malam ini", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("malam ini");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 22));
    });
});

test("Test - Casual time", () => {
    testSingleCase(chrono.id, "pagi ini", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("pagi ini");
        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });

    testSingleCase(chrono.id, "siang", new Date(2012, 7, 10, 8), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.id, "sore", new Date(2012, 7, 10, 8), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });

    testSingleCase(chrono.id, "Hari ini Pkl. 13:58", new Date(2012, 7, 10, 8), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 13, 58));
    });

    testSingleCase(chrono.id, "sore", new Date(2012, 7, 10, 8), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });
});

test("Test - Combined expression", () => {
    testSingleCase(chrono.id, "Rapatnya besok pagi", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(9);
        expect(result.text).toBe("besok pagi");
        expect(result.start).toBeDate(new Date(2012, 7, 11, 6));
    });

    testSingleCase(chrono.id, "besok pukul 10.30", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("besok pukul 10.30");
        expect(result.start).toBeDate(new Date(2012, 7, 11, 10, 30));
    });

    testSingleCase(chrono.id, "kemarin jam 3 sore", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("kemarin jam 3 sore");
        expect(result.start).toBeDate(new Date(2012, 7, 9, 15));
    });
});

test("Test - Negative cases", () => {
    testUnexpectedResult(chrono.id, "Selamat datang di Jakarta");
    testUnexpectedResult(chrono.id, "Harganya Rp 10.500");
});
