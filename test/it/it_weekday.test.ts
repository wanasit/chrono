import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.it, "Lunedì", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Lunedì");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
    });

    testSingleCase(chrono.it, "Lunedì (forward dates only)", new Date(2012, 7, 9), { forwardDate: true }, (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Lunedì");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(13);
    });

    testSingleCase(chrono.it, "giovedì", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("giovedì");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(9);
    });

    testSingleCase(chrono.it, "domenica", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("domenica");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(12);
    });

    testSingleCase(chrono.it, "La scadenza è venerdì prossimo...", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(14);
        expect(result.text).toBe("venerdì prossimo");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(17);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(17);
    });

    testSingleCase(chrono.it, "Andrò questo venerdì", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe("questo venerdì");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);
    });
});

test("Test - Weekday With Casual Time", function () {
    testSingleCase(chrono.it, "Lunedì mattina", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("Lunedì mattina");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);
        expect(result.start.get("hour")).toBe(6);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
    });
});

test("Test - Weekday Overlap", function () {
    testSingleCase(chrono.it, "domenica, 7 dicembre 2014", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("domenica, 7 dicembre 2014");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2014);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("weekday")).toBe(true);

        expect(result.start.get("year")).toBe(2014);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(7);
    });
});

test("Test - forward dates only option", function () {
    testSingleCase(chrono.it, "questo sabato", new Date(2021, 7, 14), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(14);
        expect(result.start.get("weekday")).toBe(6);
    });

    testSingleCase(chrono.it, "questo sabato", new Date(2021, 7, 15), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(21);
        expect(result.start.get("weekday")).toBe(6);
    });

    testSingleCase(chrono.it, "sabato", new Date(2021, 7, 15), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(21);
        expect(result.start.get("weekday")).toBe(6);
    });
});

test("Test - Weekday range expression", function () {
    testSingleCase(chrono.it, "lunedì-venerdì", new Date(2024, 1, 6), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("lunedì-venerdì");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.end).not.toBeNull();
        expect(result.end.get("year")).toBe(2024);
        expect(result.end.get("month")).toBe(2);
        expect(result.end.get("day")).toBe(9);
        expect(result.end.get("weekday")).toBe(5);
    });
});

test("Test - Weekday with prefix and suffix", function () {
    testSingleCase(chrono.it, "lunedì scorso", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("lunedì scorso");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
        expect(result.start.get("weekday")).toBe(1);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(6);
    });

    testSingleCase(chrono.it, "martedì scorso", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("martedì scorso");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(7);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(7);
    });

    testSingleCase(chrono.it, "mercoledì scorso", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("mercoledì scorso");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(8);
        expect(result.start.get("weekday")).toBe(3);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(8);
    });

    testSingleCase(chrono.it, "giovedì scorso", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("giovedì scorso");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(2);
        expect(result.start.get("weekday")).toBe(4);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(2);
    });

    testSingleCase(chrono.it, "venerdì scorso", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("venerdì scorso");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
        expect(result.start.get("weekday")).toBe(5);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(3);
    });

    testSingleCase(chrono.it, "sabato scorso", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("sabato scorso");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(4);
        expect(result.start.get("weekday")).toBe(6);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(4);
    });

    testSingleCase(chrono.it, "domenica scorsa", new Date(2012, 7, 9), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("domenica scorsa");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);
        expect(result.start.get("weekday")).toBe(0);

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(5);
    });
});

test("Test - Negative cases", function () {
    testUnexpectedResult(chrono.it, "informazioni");
});
