import * as chrono from "../../src/";
import { testSingleCase, testUnexpectedResult } from "../test_util";
import { Meridiem } from "../../src/";

test("Test - Single Expression", () => {
    testSingleCase(chrono.nl, "De deadline is nu", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("nu");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(8);
        expect(result.start.get("minute")).toBe(9);
        expect(result.start.get("second")).toBe(10);
        expect(result.start.get("millisecond")).toBe(11);
        expect(result.start.get("timezoneOffset")).toBe(result.refDate.getTimezoneOffset() * -1);

        expect(result.start).toBeDate(result.refDate);
        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });

    testSingleCase(chrono.nl, "De deadline is vandaag", new Date(2012, 7, 10, 14, 12), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("vandaag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14, 12));
    });

    testSingleCase(chrono.nl, "De deadline is morgen", new Date(2012, 7, 10, 17, 10), (result) => {
        expect(result.index).toBe(15);
        expect(result.text).toBe("morgen");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 17, 10));
    });

    testSingleCase(chrono.nl, "De deadline is morgen", new Date(2012, 7, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 11, 1));
    });

    testSingleCase(chrono.nl, "De deadline was gisteren", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe("gisteren");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });

    /* not implemented
    testSingleCase(chrono.casual, "The Deadline was last night ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("last night");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("hour")).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 0));
    });

    testSingleCase(chrono.casual, "The Deadline was this morning ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("this morning");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });

    testSingleCase(chrono.casual, "The Deadline was this afternoon ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("this afternoon");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });

    testSingleCase(chrono.casual, "The Deadline was this evening ", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(17);
        expect(result.text).toBe("this evening");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 20));
    });*/

    testSingleCase(chrono.nl, "De deadline is vanavond", new Date(2012, 7, 10, 12), (result) => {
        expect(result.text).toBe("vanavond");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(20);
    });

    /* not implemented
    // "Midnight" at 0~1AM, assume it's the coming midnight of following day
    // This is similar to "Tomorrow" at 0~1AM
    testSingleCase(chrono.casual, "The Deadline was midnight ", new Date(2012, 7, 10, 1), (result) => {
        expect(result.text).toBe("midnight");
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(0);
    });*/
});

test("Test - Combined Expression", () => {
    testSingleCase(chrono.nl, "De deadline van is vandaag om 17:00", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(19);
        expect(result.text).toBe("vandaag om 17:00");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });

    testSingleCase(chrono.nl, "morgen middag", new Date(2012, 8 - 1, 10, 14), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(11);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 8 - 1, 11, 12));
    });
});

test("Test - Casual date range", () => {
    // TODO support volgende **week** vrijdag
    // TODO provide test for range with "-" dash
    testSingleCase(chrono.nl, "The event is vandaag - volgende vrijdag", new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe("vandaag - volgende vrijdag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 4, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(10);
        expect(result.end.get("hour")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.nl, "The event is vandaag - volgende vrijdag", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(13);
        expect(result.text).toBe("vandaag - volgende vrijdag");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("hour")).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2012);
        expect(result.end.get("month")).toBe(8);
        expect(result.end.get("day")).toBe(17);
        expect(result.end.get("hour")).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 7, 17, 12));
    });
});

// TODO should be "vanochtend" or "deze ochtend" instead of "vandaag ochtend"
test("Test - Casual time implication", () => {
    testSingleCase(
        chrono.nl,
        "annual leave from vandaag ochtend tot morgen",
        new Date(2012, 8 - 1, 4, 12),
        (result) => {
            expect(result.text).toBe("vandaag ochtend tot morgen");

            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(4);
            expect(result.start.get("hour")).toBe(6);
            expect(result.start.isCertain("hour")).toBe(false);

            expect(result.end.get("month")).toBe(8);
            expect(result.end.get("day")).toBe(5);
            expect(result.end.get("hour")).toBe(12);
            expect(result.end.isCertain("hour")).toBe(false);
        }
    );

    testSingleCase(
        chrono.nl,
        "annual leave from vandaag tot morgen namiddag",
        new Date(2012, 8 - 1, 4, 12),
        (result) => {
            expect(result.text).toBe("vandaag tot morgen namiddag");

            expect(result.start.get("month")).toBe(8);
            expect(result.start.get("day")).toBe(4);
            expect(result.start.get("hour")).toBe(12);
            expect(result.start.isCertain("hour")).toBe(false);

            expect(result.end.get("month")).toBe(8);
            expect(result.end.get("day")).toBe(5);
            expect(result.end.get("hour")).toBe(15);
            expect(result.end.isCertain("hour")).toBe(false);
        }
    );
});

test("Test - Random text", () => {
    testSingleCase(chrono, "tonight", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(22);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono, "tonight 8pm", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono, "tonight at 8", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(20);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono, "tomorrow before 4pm", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(16);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono, "tomorrow after 4pm", new Date(2012, 1 - 1, 1, 12), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("hour")).toBe(16);
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("meridiem")).toBe(Meridiem.PM);
    });

    testSingleCase(chrono, "thurs", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(4);
    });

    testSingleCase(chrono, "thurs", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("weekday")).toBe(4);
    });

    testSingleCase(chrono, "this evening", new Date(2016, 10 - 1, 1), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(20);
    });

    testSingleCase(chrono, "yesterday afternoon", new Date(2016, 10 - 1, 1), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(30);
        expect(result.start.get("hour")).toBe(15);
    });

    testSingleCase(chrono, "tomorrow morning", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("hour")).toBe(6);
    });

    testSingleCase(chrono, "this afternoon at 3", new Date(2016, 10 - 1, 1, 8), (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2016);
        expect(result.start.get("month")).toBe(10);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(15);
    });
});

test("Test - Casual time with timezone", () => {
    testSingleCase(chrono, "Jan 1, 2020 Morning UTC", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2020);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start.get("timezoneOffset")).toStrictEqual(0);
        expect(result).toBeDate(new Date("2020-01-01T06:00:00.000Z"));
    });

    testSingleCase(chrono, "Jan 1, 2020 Evening JST", (result, text) => {
        expect(result.text).toBe(text);
        expect(result.start.get("year")).toBe(2020);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);
        expect(result.start.get("hour")).toBe(20);

        expect(result.start.get("timezoneOffset")).toStrictEqual(540);
        expect(result).toBeDate(new Date("Wed Jan 01 2020 20:00:00 GMT+0900 (Japan Standard Time)"));
    });
});

test("Test - Random negative text", () => {
    testUnexpectedResult(chrono.nl, "notoday");

    testUnexpectedResult(chrono.nl, "tdtmr");

    testUnexpectedResult(chrono.nl, "xyesterday");

    testUnexpectedResult(chrono.nl, "nowhere");

    testUnexpectedResult(chrono.nl, "noway");

    testUnexpectedResult(chrono.nl, "knowledge");

    testUnexpectedResult(chrono.nl, "mar");

    testUnexpectedResult(chrono.nl, "jan");
});
