import { testSingleCase, testUnexpectedResult } from "../test_util";
import * as chrono from "../../src";

test("Test - Skip random non-date patterns", function () {
    testUnexpectedResult(chrono, " 3");

    testUnexpectedResult(chrono, "       1");

    testUnexpectedResult(chrono, "  11 ");

    testUnexpectedResult(chrono, " 0.5 ");

    testUnexpectedResult(chrono, " 35.49 ");

    testUnexpectedResult(chrono, "12.53%");

    testUnexpectedResult(chrono, "6358fe2310> *5.0* / 5 Outstanding");

    testUnexpectedResult(chrono, "6358fe2310> *1.5* / 5 Outstanding");

    testUnexpectedResult(chrono, "Total: $1,194.09 [image: View Reservation");

    testUnexpectedResult(chrono, "at 6.5 kilograms");

    testUnexpectedResult(chrono, "ah that is unusual", null, { forwardDate: true });
});

test("Test - URLs % encoded", function () {
    testUnexpectedResult(chrono, "%e7%b7%8a");

    testUnexpectedResult(
        chrono,
        "https://tenor.com/view/%e3%83%89%e3%82%ad%e3%83%89%e3%82%ad-" +
            "%e7%b7%8a%e5%bc%b5-%e5%a5%bd%e3%81%8d-%e3%83%8f%e3%83%bc%e3%83%88" +
            "-%e5%8f%af%e6%84%9b%e3%81%84-gif-15876325"
    );
});

test("Test - Skip hyphenated numbers pattern", () => {
    testUnexpectedResult(chrono, "1-2");

    testUnexpectedResult(chrono, "1-2-3");

    testUnexpectedResult(chrono, "4-5-6");

    testUnexpectedResult(chrono, "20-30-12");

    testUnexpectedResult(chrono, "2012");

    testUnexpectedResult(chrono, "2012-14");

    testUnexpectedResult(chrono, "2012-1400");

    testUnexpectedResult(chrono, "2200-25");
});

test("Test - Skip impossible dates/times", () => {
    testUnexpectedResult(chrono, "February 29, 2022");
    testUnexpectedResult(chrono, "02/29/2022");

    testUnexpectedResult(chrono, "June 31, 2022");
    testUnexpectedResult(chrono, "06/31/2022");

    testUnexpectedResult(chrono, "14PM");
    testUnexpectedResult(chrono, "25:12");

    testUnexpectedResult(chrono, "An appointment on 13/31/2018");
});

test("Test - Skip version number pattern", () => {
    testUnexpectedResult(chrono, "Version: 1.1.3");

    testUnexpectedResult(chrono, "Version: 1.1.30");

    testUnexpectedResult(chrono, "Version: 1.10.30");
});

test("Test - Date with version number pattern", () => {
    testSingleCase(chrono.en, "1.5.3 - 2015-09-24", (result) => {
        expect(result.text).toBe("2015-09-24");
    });

    testSingleCase(chrono.en, "1.5.30 - 2015-09-24", (result) => {
        expect(result.text).toBe("2015-09-24");
    });

    testSingleCase(chrono.en, "1.50.30 - 2015-09-24", (result) => {
        expect(result.text).toBe("2015-09-24");
    });
});
