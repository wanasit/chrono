import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    // 5 days ago, we did something
    testSingleCase(chrono, "5 giorni fa, abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 giorni fa");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    // 10 days ago, we did something
    testSingleCase(chrono, "10 giorni fa, abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("10 giorni fa");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });

    // 15 minute ago
    testSingleCase(chrono, "15 minuti fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuti fa");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
       
        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    // 15 minute earlier
    testSingleCase(chrono, "15 minuti prima", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuti prima");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);
       
        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });
    // 15 minute before
    testSingleCase(chrono, "15 minuti prima delle", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("15 minuti prima delle");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(59);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 59));
    });

    // 12 hours ago
    testSingleCase(chrono, "   12 ore fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("12 ore fa");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
    
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    // 1 hour ago
    testSingleCase(chrono, "1 ora fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1 ora fa");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(14);
    });

    // 1h ago
    testSingleCase(chrono, "1 h fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("1 h fa");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(14);
    });

    // half an hour ago
    testSingleCase(chrono, "   mezz'ora fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("mezz'ora fa");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(44);
 
        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 44));
    });

    // 12 hours ago I did something
    testSingleCase(chrono, "12 ore fa ho fatto qualcosa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 ore fa");
        expect(result.start.get("hour")).toBe(0);
        expect(result.start.get("minute")).toBe(14);
 
        expect(result.start).toBeDate(new Date(2012, 7, 10, 0, 14));
    });

    // 12 seconds ago I did something
    testSingleCase(chrono, "12 secondi fa ho fatto qualcosa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("12 secondi fa");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(48);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 48));
    });

    // three seconds ago I did something
    testSingleCase(chrono, "tre secondi fa ho fatto qualcosa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("tre secondi fa");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);
        expect(result.start.get("second")).toBe(57);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13, 57));
    });

    // 5 Days ago, we did something
    testSingleCase(chrono, "5 Giorni fa, abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 Giorni fa");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 5));
    });

    // half An hour ago
    testSingleCase(chrono, "   mezz'Ora fa", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(3);
        expect(result.text).toBe("mezz'Ora fa");
        expect(result.start.get("hour")).toBe(11);
        expect(result.start.get("minute")).toBe(44);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 11, 44));
    });

    // A days ago, we did something
    testSingleCase(chrono, "Un giorno fa, abbiamo fatto qualcosa", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("A days ago");

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 9));
    });

    // a min before
    testSingleCase(chrono, "un min prima delle", new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("un min prima delle");
        expect(result.start.get("hour")).toBe(12);
        expect(result.start.get("minute")).toBe(13);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 13));
    });
});

test("Test - Single Expression (Casual)", function () {
    // 5 months ago, we did something 
    testSingleCase(chrono, "5 mesi fa, abbiamo fatto qualcosa", new Date(2012, 10 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 mesi fa");

        expect(result.start).toBeDate(new Date(2012, 5 - 1, 10));
    });

    // 5 years ago, we did something
    testSingleCase(chrono, "5 anni fa, abbiamo fatto qualcosa", new Date(2012, 8 - 1, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2007);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.index).toBe(0);
        expect(result.text).toBe("5 anni fa");

        expect(result.start).toBeDate(new Date(2007, 8 - 1, 10));
    });

    // a week ago, we did something
    testSingleCase(chrono, "una settimana fa, abbiamo fatto qualcosa", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(27);

        expect(result.index).toBe(0);
        expect(result.text).toBe("una settimana fa");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 27));
    });

    // a couple of days ago, we did something
    testSingleCase(chrono, "qualche giorno fa, abbiamo fatto qualcosa", new Date(2012, 8 - 1, 3), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(7);
        expect(result.start.get("day")).toBe(31);

        expect(result.index).toBe(0);
        expect(result.text).toBe("qualche giorno");

        expect(result.start).toBeDate(new Date(2012, 7 - 1, 31));
    });
});

test("Test - Nested time ago", function () {
    // 15 hours 29 min ago
    testSingleCase(chrono, "15 ore 29 min fa", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("15 ore 29 min fa");
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(7);
        expect(result.start.get("minute")).toBe(1);
    });
    
    // 1 day 21 hours ago
    testSingleCase(chrono, "1 giorno 21 ore fa ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("1 giorno 21 ore fa");
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(1);
        expect(result.start.get("minute")).toBe(30);
    });

    // 3 min 49 sec ago
    testSingleCase(chrono, "3 min 49 sec fa ", new Date(2012, 7, 10, 22, 30), (result) => {
        expect(result.text).toBe("3 min 49 sec fa");
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("minute")).toBe(26);
        expect(result.start.get("second")).toBe(11);
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono, "15 ore 29 min");
    testUnexpectedResult(chrono, "qualche ora fa");
    testUnexpectedResult(chrono, "5 giorni");
});
