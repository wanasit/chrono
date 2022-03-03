import * as chrono from "../../src";
import { testSingleCase } from "../test_util";
//import DETimeExpressionParser from "../../src/locales/de/parsers/DETimeExpressionParser";

test("Test - Year numbers with v/nuZ Era label", () => {
    testSingleCase(chrono.de, "10. August 234 v.u.Z.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 234 v.u.Z."); // fails since text is `10 August 234`

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(-234);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //expect(result.start).toBeDate(new Date(-234, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "10. August 88 nuZ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 88 nuZ");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        //expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.de, "10. August 88 uZ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 88 uZ");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        //expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.de, "10. August 88 d.g.Z.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 88 d.g.Z.");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        //expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Year numbers with v/nChr Era label", () => {
    testSingleCase(chrono.de, "10. August 234 v.Chr.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 234 v.Chr.");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(-234);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //expect(result.start).toBeDate(new Date(-234, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "10. August 88 nC", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 88 nC");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        //expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});

test("Test - Year numbers with v/ndgZ Era label", () => {
    testSingleCase(chrono.de, "10. August 234 v.d.Z.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 234 v.d.Z.");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(-234);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //expect(result.start).toBeDate(new Date(-234, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "10. August 88 ndZ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 88 ndZ");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        //expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });

    testSingleCase(chrono.de, "10. August 234 v.d.g.Z.", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 234 v.d.g.Z.");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(-234);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //expect(result.start).toBeDate(new Date(-234, 8 - 1, 10, 12));
    });

    testSingleCase(chrono.de, "10. August 88 ndgZ", new Date(2012, 7, 10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe("10. August 88 ndgZ");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(88);
        expect(result.start.get("month")).toBe(8);
        expect(result.start.get("day")).toBe(10);

        //const resultDate = result.start.date();
        const expectDate = new Date(88, 8 - 1, 10, 12);
        expectDate.setFullYear(88);
        //expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime());
    });
});
