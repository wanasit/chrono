import * as chrono from "../../src";
import { testSingleCase } from "../test_util";

test("Test - Single Expression", function () {
    testSingleCase(chrono.casual, "2 weeks after yesterday", new Date(2022, 2 - 1, 2), (result) => {
        expect(result.text).toBe("2 weeks after yesterday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(15);
        expect(result.start.get("weekday")).toBe(2);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(false);
        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("weekday")).toBe(false);

        expect(result.start).toBeDate(new Date(2022, 2 - 1, 15, 0));
    });

    testSingleCase(chrono.casual, "2 months before 02/02", new Date(2022, 2 - 1, 2), (result) => {
        expect(result.text).toBe("2 months before 02/02");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(12);
        expect(result.start.get("day")).toBe(2);

        expect(result.start.isCertain("day")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);

        expect(result.start).toBeDate(new Date(2021, 12 - 1, 2, 12));
    });

    testSingleCase(chrono.casual, "2 days after next Friday", new Date(2022, 2 - 1, 2), (result) => {
        expect(result.text).toBe("2 days after next Friday");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(2);
        expect(result.start.get("day")).toBe(13);

        expect(result.start.isCertain("day")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("year")).toBe(true);

        expect(result.start).toBeDate(new Date(2022, 2 - 1, 13, 12));
    });
});
