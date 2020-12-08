import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single expression", function () {
    testSingleCase(chrono.de, "10. August 2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 2012");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "10. August 113 v. Chr.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 113 v. Chr.");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(-113);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(-113, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "10. August 85 n. Chr.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 85 n. Chr.");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(85);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        const resultDate = result.start.date();
        const expectDate = new Date(85, 8 - 1, 10, 12);
        expectDate.setFullYear(85);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.de, "So 15.Sep", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("So 15.Sep");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.de, "SO 15.SEPT", new Date(2013, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("SO 15.SEPT");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(15);

        expect(result.start).toBeDate(new Date(2013, 9 - 1, 15, 12));
    });

    testSingleCase(chrono.de, "Die Deadline ist am 10. August", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("am 10. August");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "Die Deadline ist am Dienstag, den 10. Januar", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("am Dienstag, den 10. Januar");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "Die Deadline ist Di, 10. Januar", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("Di, 10. Januar");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start).toBeDate(new Date(2013, 1 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "31. März 2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("31. März 2016");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(31);

        expect(result.start).toBeDate(new Date(2016, 3 - 1, 31, 12));
    });

    testSingleCase(chrono.de, "31.Maerz 2016", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("31.Maerz 2016");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(3);
        expect(result.start.get("day")).toBe(31);

        expect(result.start).toBeDate(new Date(2016, 3 - 1, 31, 12));
    });
});

test("Test - Range expression", function () {
    testSingleCase(chrono.de, "10. - 22. August 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. - 22. August 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 8 - 1, 22, 12));
    });

    testSingleCase(chrono.de, "10. bis 22. Oktober 2012", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. bis 22. Oktober 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 10 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(10);
        expect(result.end.get("day")).toBe(22);

        expect(result.end).toBeDate(new Date(2012, 10 - 1, 22, 12));
    });

    testSingleCase(chrono.de, "10. Oktober - 12. Dezember", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. Oktober - 12. Dezember");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 10 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(12);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 12 - 1, 12, 12));
    });

    testSingleCase(chrono.de, "10. August - 12. Oktober 2013", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August - 12. Oktober 2013");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2013);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2013, 8 - 1, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2013);
        expect(result.end.get("month")).toBe(10);
        expect(result.end.get("day")).toBe(12);

        expect(result.end).toBeDate(new Date(2013, 10 - 1, 12, 12));
    });
});

test("Test - Combined expression", function () {
    testSingleCase(chrono.de, "12. Juli um 19:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12. Juli um 19:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 12, 19, 0));
    });

    testSingleCase(chrono.de, "12. Juli um 19 Uhr", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12. Juli um 19 Uhr");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 12, 19, 0));
    });

    testSingleCase(chrono.de, "12. Juli um 19:53 Uhr", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12. Juli um 19:53 Uhr");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 12, 19, 53));
    });

    testSingleCase(chrono.de, "5. Juni 12:00", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("5. Juni 12:00");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(6);
        expect(result.start.get("day")).toBe(5);

        expect(result.start).toBeDate(new Date(2012, 6 - 1, 5, 12, 0));
    });
});

test("Test - Impossible Dates (Casual Mode)", function () {
    testUnexpectedResult(chrono.de, "32. Oktober 2015");
});
