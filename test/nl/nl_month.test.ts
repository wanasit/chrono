import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Month-Year expression", function () {
    testSingleCase(chrono.nl, "september 2012", (result) => {
        expect(result.text).toBe("september 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "sept 2012", (result) => {
        expect(result.text).toBe("sept 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "sep 2012", (result) => {
        expect(result.text).toBe("sep 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "sep. 2012", (result) => {
        expect(result.text).toBe("sep. 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "sep-2012", (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("sep-2012");

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });
});

test("Test - Month-Only expression", function () {
    testSingleCase(chrono.nl, "In januari", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.text).toContain("januari");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2021, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "in jan", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.text).toContain("jan");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2021, 1 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "mei", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.text).toContain("mei");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2021, 5 - 1, 1, 12));
    });
});

test("Test - Month expression in context", function () {
    testSingleCase(chrono.nl, "The date is sep 2012 is the date", (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("sep 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "By Angie ja november 2019", (result) => {
        expect(result.text).toBe("november 2019");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2019);
        expect(result.start.get("month")).toBe(11);

        expect(result.start).toBeDate(new Date(2019, 11 - 1, 1, 12));
    });
});

test("Test - Month slash expression", function () {
    testSingleCase(chrono.nl, "9/2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("9/2012");

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono.nl, "09/2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("09/2012");

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono.nl, "aug 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("aug 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
    });

    testSingleCase(chrono.nl, "96 aug 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("aug 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
    });
});
